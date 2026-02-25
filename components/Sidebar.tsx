import Link from "next/link";

export type Section =
  | "chatbot"
  | "logement"
  | "transport"
  | "ressources"
  | "vie-etudiante"
  | "faq";

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "chatbot", label: "Chatbot", icon: "🤖" },
  { id: "logement", label: "Logement & Résidences", icon: "🏠" },
  { id: "transport", label: "Transport & Mobilité", icon: "🚌" },
  { id: "ressources", label: "Ressources Académiques", icon: "📚" },
  { id: "vie-etudiante", label: "Vie Étudiante", icon: "🎉" },
  { id: "faq", label: "FAQ & Aide", icon: "❓" },
];

interface SidebarProps {
  active: Section;
  onSelect: (section: Section) => void;
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: "#0F2854" }}>
      <div className="px-6 py-6 border-b border-blue-700">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">ESI</span>
          <span className="text-2xl font-bold" style={{ color: "#BDE8F5" }}>Together</span>
        </Link>
        <p className="text-xs mt-1" style={{ color: "#7FAFD4" }}>Base de connaissances</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
              active === item.id
                ? "text-white"
                : "text-blue-200 hover:text-white"
            }`}
            style={
              active === item.id
                ? { background: "#1C4D8D" }
                : undefined
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-blue-700">
        <p className="text-xs" style={{ color: "#7FAFD4" }}>© 2025 ESI Together</p>
      </div>
    </aside>
  );
}
