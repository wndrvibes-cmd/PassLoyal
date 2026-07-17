"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface QA {
  question: string;
  answer: string;
}

const faqs: QA[] = [
  {
    question: "Ai-je besoin d'une application pour utiliser PassLoyal ?",
    answer:
      "Non. Vos clients utilisent Apple Wallet ou Google Wallet, déjà présents sur leur téléphone. Aucune installation n'est nécessaire de leur côté.",
  },
  {
    question: "Comment mes clients rejoignent-ils mon programme ?",
    answer:
      "Ils scannent simplement un QR Code affiché en caisse ou en vitrine. La carte de fidélité s'ajoute alors directement à leur wallet.",
  },
  {
    question: "PassLoyal fonctionne-t-il sans matériel spécifique ?",
    answer:
      "Oui. Un simple smartphone ou une tablette suffit pour scanner les cartes de vos clients, aucun terminal dédié n'est requis.",
  },
  {
    question: "Puis-je personnaliser le design de ma carte ?",
    answer:
      "Oui, vous pouvez adapter les couleurs, le logo et les informations affichées pour refléter l'identité de votre commerce.",
  },
  {
    question: "Les points sont-ils mis à jour en temps réel ?",
    answer:
      "Dès qu'une visite est enregistrée, les points se mettent à jour instantanément dans le wallet du client et sur votre dashboard.",
  },
  {
    question: "Puis-je gérer plusieurs établissements ?",
    answer:
      "Oui, les formules Pro et Premium permettent de gérer plusieurs programmes et plusieurs points de vente depuis un seul compte.",
  },
  {
    question: "Que se passe-t-il si je change d'offre en cours de route ?",
    answer:
      "Vous pouvez changer de formule à tout moment depuis votre dashboard, sans interruption de service et sans engagement.",
  },
  {
    question: "Comment mes données clients sont-elles protégées ?",
    answer:
      "Toutes les données sont hébergées de façon sécurisée et ne sont jamais partagées avec des tiers sans votre consentement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-[#FAFAF7] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#1B8A5A]">
            Questions fréquentes
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Tout ce que vous devez savoir
          </h2>
        </motion.div>

        <div className="mt-14 divide-y divide-[#E4E1D6] rounded-2xl border border-[#E4E1D6] bg-white">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="px-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-[#0F1729] sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FAFAF7]"
                  >
                    <Plus className="h-4 w-4 text-[#1B8A5A]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-[#3D4759]/70">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
