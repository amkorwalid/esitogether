import { useState } from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Sidebar, { Section } from "../../components/Sidebar";
import Chatbot from "../../components/dashboard/Chatbot";
import Logement from "../../components/dashboard/Logement";
import Transport from "../../components/dashboard/Transport";
import Ressources from "../../components/dashboard/Ressources";
import VieEtudiante from "../../components/dashboard/VieEtudiante";
import FAQ from "../../components/dashboard/FAQ";

const sectionLabels: Record<Section, string> = {
  chatbot: "Chatbot",
  logement: "Logement & Résidences",
  transport: "Transport & Mobilité",
  ressources: "Ressources Académiques",
  "vie-etudiante": "Vie Étudiante",
  faq: "FAQ & Aide",
};

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const [activeSection, setActiveSection] = useState<Section>("chatbot");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSelect(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

  if (!user && isLoaded) {
    router.push('/sign-in')
    return null
  }

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

      {/* Mobile sticky header */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-20"
        style={{ background: "#0F2854", borderBottom: "1px solid #1C4D8D" }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white p-1"
          aria-label="Ouvrir le menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-white">ESI</span>
          <span className="text-lg font-bold" style={{ color: "#BDE8F5" }}>Together</span>
        </div>
        <div className="w-8" aria-hidden="true" />
      </header>

      <div className="flex min-h-screen" style={{ background: "#0F2854" }}>
        <Sidebar
          active={activeSection}
          onSelect={handleSelect}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 h-screen overflow-y-scroll p-4 pt- md:p-8">
          {/* Mobile section title */}
          <p className="md:hidden text-xs mb-4" style={{ color: "#7FAFD4" }}>
            {sectionLabels[activeSection]}
          </p>
          {renderSection()}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({ props: {} });
