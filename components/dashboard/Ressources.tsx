import { useState } from "react";
import contentData from "../../public/content/content.json";

const ressources = contentData.sections["ressources-academiques"];
const { resources, autoformation } = ressources.subsections;

type Tab = "resources" | "autoformation";

export default function Ressources() {
  const [tab, setTab] = useState<Tab>("resources");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {ressources.icon} {ressources.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Cours, documents et ressources d&apos;autoformation
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([["resources", resources.title], ["autoformation", autoformation.title]] as [Tab, string][]).map(
          ([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white"
              style={tab === id ? { background: "#1C4D8D" } : { background: "#122E63", border: "1px solid #1C4D8D" }}
            >
              {label}
            </button>
          )
        )}
      </div>

      {tab === "resources" && (
        <div className="space-y-4">
          {resources.content.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.filiere}</h3>
                  <p className="text-sm" style={{ color: "#BDE8F5" }}>{item.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.semestres.map((s) => (
                  <a
                    key={s.semestre}
                    href={s.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
                    style={{ background: "#1C4D8D" }}
                  >
                    📁 {s.semestre}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "autoformation" && (
        <div className="grid gap-5 md:grid-cols-2">
          {autoformation.content.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
            >
              <h3 className="text-lg font-bold text-white mb-1">{item.domaine}</h3>
              <p className="text-sm mb-3" style={{ color: "#BDE8F5" }}>{item.description}</p>

              <div className="flex gap-4 text-xs mb-3 flex-wrap">
                <span style={{ color: "#7FAFD4" }}>📅 {item.duree}</span>
                <span style={{ color: "#7FAFD4" }}>📊 {item.niveau}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: "#0F2854", border: "1px solid #4988C4", color: "#BDE8F5" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={item.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                style={{ background: "#1C4D8D" }}
              >
                📥 Télécharger la Roadmap
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
