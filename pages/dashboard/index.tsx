import { useState } from "react";
import Head from "next/head";
import Sidebar, { Section } from "../../components/Sidebar";
import Chatbot from "../../components/dashboard/Chatbot";
import Logement from "../../components/dashboard/Logement";
import Transport from "../../components/dashboard/Transport";
import Ressources from "../../components/dashboard/Ressources";
import VieEtudiante from "../../components/dashboard/VieEtudiante";
import FAQ from "../../components/dashboard/FAQ";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("chatbot");

  const renderSection = () => {
    switch (activeSection) {
      case "chatbot":
        return <Chatbot />;
      case "logement":
        return <Logement />;
      case "transport":
        return <Transport />;
      case "ressources":
        return <Ressources />;
      case "vie-etudiante":
        return <VieEtudiante />;
      case "faq":
        return <FAQ />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard – ESI Together</title>
      </Head>
      <div className="flex min-h-screen" style={{ background: "#0F2854" }}>
        <Sidebar active={activeSection} onSelect={setActiveSection} />
        <main className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </main>
      </div>
    </>
  );
}
