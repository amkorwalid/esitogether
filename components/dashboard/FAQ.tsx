import { useState } from "react";
import contentData from "../../public/content/content.json";

const faq = contentData.sections.faq;
const questions = faq.subsections["questions-frequentes"].content;

const categories = Array.from(new Set(questions.map((q) => q.categorie)));

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const allCategories = ["Tous", ...categories];
  const filtered =
    activeCategory === "Tous"
      ? questions
      : questions.filter((q) => q.categorie === activeCategory);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {faq.icon} {faq.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Questions fréquentes sur la plateforme ESI Together
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-white"
            style={
              activeCategory === cat
                ? { background: "#1C4D8D" }
                : { background: "#122E63", border: "1px solid #1C4D8D" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #1C4D8D" }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              style={{ background: openIndex === i ? "#1C4D8D" : "#122E63" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium text-white pr-4">{item.question}</span>
              <span className="text-white text-lg flex-shrink-0">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div
                className="px-5 py-4 text-sm leading-relaxed"
                style={{ background: "#0F2854", color: "#BDE8F5" }}
              >
                {item.reponse}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
