import Link from "next/link";
import { UserButton, useUser } from '@clerk/nextjs'

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
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ active, onSelect, isOpen, onClose }: SidebarProps) {
  const { user } = useUser()
  return (
    <>
      {/* Backdrop overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 flex flex-col
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:translate-x-0 md:min-h-screen border-r border-blue-900
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ background: "#0F2854" }}
      >
        <div className="px-6 py-6 border-b border-blue-700 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">ESI</span>
            <span className="text-2xl font-bold" style={{ color: "#BDE8F5" }}>Together</span>
          </Link>
          {/* Close button — mobile only */}
          <button
            className="md:hidden text-white text-2xl leading-none p-1"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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

        <div className="px-6 py-4 border-t flex items-center border-blue-700">
          <UserButton afterSignOutUrl="/" />
          <span className="block ml-2 text-md text-blue-300">
            <strong>{user?.firstName || user?.username}</strong>
          </span>
        </div>
      </aside>
    </>
  );
}
