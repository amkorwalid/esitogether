import { useState } from "react";
import contentData from "../../public/content/content.json";

const vieEtudiante = contentData.sections["vie-etudiante"];
const { Associations, evenements } = vieEtudiante.subsections;

type Tab = "associations" | "evenements";

export default function VieEtudiante() {
  const [tab, setTab] = useState<Tab>("associations");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {vieEtudiante.icon} {vieEtudiante.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Clubs, associations et événements de l&apos;ESI
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {([["associations", Associations.title], ["evenements", evenements.title]] as [Tab, string][]).map(
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

      {tab === "associations" && (
        <div className="grid gap-5 md:grid-cols-2">
          {Associations.content.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
            >
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm mb-3" style={{ color: "#BDE8F5" }}>{item.description}</p>

              {item.details && (
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7FAFD4" }}>
                    Activités
                  </p>
                  <ul className="space-y-1">
                    {item.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#7FAFD4" }}>
                        <span className="text-xs mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray((item as Record<string, unknown>).Cellules) && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7FAFD4" }}>
                    Cellules
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {((item as Record<string, unknown>).Cellules as string[]).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ background: "#0F2854", border: "1px solid #4988C4", color: "#BDE8F5" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {typeof (item as Record<string, unknown>).instagram === "string" && (
                  <a
                    href={(item as Record<string, unknown>).instagram as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                    style={{ background: "#1C4D8D" }}
                  >
                    📸 Instagram
                  </a>
                )}
                {typeof (item as Record<string, unknown>).official_website === "string" && (
                  <a
                    href={(item as Record<string, unknown>).official_website as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg font-medium"
                    style={{ background: "#0F2854", border: "1px solid #4988C4", color: "#BDE8F5" }}
                  >
                    🌐 Site web
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "evenements" && (
        <div className="space-y-4">
          {evenements.content.map((item, i) => {
            const title = (item as Record<string, unknown>).title as string | undefined
              ?? (item as Record<string, unknown>).titre as string;
            const details = (item as Record<string, unknown>).details as string[] | undefined
              ?? (item as Record<string, unknown>).programme as string[] | undefined;

            return (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  {item.date && (
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: "#0F2854", color: "#BDE8F5", border: "1px solid #1C4D8D" }}
                    >
                      📅 {item.date}
                    </span>
                  )}
                </div>

                <p className="text-sm mb-3" style={{ color: "#BDE8F5" }}>{item.description}</p>

                {details && (
                  <ul className="space-y-1 mb-3">
                    {details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#7FAFD4" }}>
                        <span className="text-xs mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-4 text-sm flex-wrap">
                  {item.lieu && (
                    <span style={{ color: "#7FAFD4" }}>📍 {item.lieu}</span>
                  )}
                  {item.lien && item.lien.trim() && (
                    <a
                      href={item.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                      style={{ background: "#1C4D8D" }}
                    >
                      En savoir plus →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
