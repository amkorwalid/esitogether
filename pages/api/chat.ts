import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const INDEX_NAME = "esitogether";
const NAMESPACE = "intern_reglement";

const embeddingsClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] }: { message: string; history: ChatMessage[] } =
    req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message requis." });
  }

  try {
    // 1. Embed the user query
    const embeddingResponse = await embeddingsClient.embeddings.create({
      input: message,
      model: "text-embedding-3-small",
      dimensions: 1536,
    });

    const queryVector = embeddingResponse.data[0].embedding;

    // 2. Retrieve relevant chunks from Pinecone
    const index = pc.Index(INDEX_NAME);
    const retrieved = await index.namespace(NAMESPACE).query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    });

    const context = retrieved.matches
      .map((match) => match.metadata?.text as string | undefined)
      .filter(Boolean)
      .join("\n\n");

    // 3. Build messages array for DeepSeek
    const systemMessage: ChatMessage = {
      role: "system",
      content:
        "You are a helpful assistant for ESITogether platform answering questions about the intern regulations of an engineering school named ESI. You always answer in French. If you don't know the answer based on the provided context, say so politely.",
    };

    const messagesPayload: ChatMessage[] = [
      systemMessage,
      ...history,
      {
        role: "user",
        content: `Contexte:\n${context}\n\nQuestion: ${message}`,
      },
    ];

    // 4. Call DeepSeek
    const chatResponse = await chatClient.chat.completions.create({
      model: "deepseek-chat",
      messages: messagesPayload,
    });

    const answer = chatResponse.choices[0].message.content ?? "";

    return res.status(200).json({
      answer,
      history: [
        ...history,
        { role: "user", content: message },
        { role: "assistant", content: answer },
      ],
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Erreur interne. Veuillez réessayer." });
  }
}