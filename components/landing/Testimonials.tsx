"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Camille Dubreuil",
    role: "Propriétaire, Café des Lices",
    quote:
      "En trois mois, le nombre de clients réguliers a nettement augmenté. Le scan du QR Code en caisse est devenu un réflexe pour tout le monde.",
    rating: 5,
    initials: "CD",
    color: "#1B8A5A",
  },
  {
    name: "Yanis Kaddour",
    role: "Gérant, Salon Yanis Coiffure",
    quote:
      "Fini les carnets de tampons perdus. Mes clientes adorent voir leurs points directement dans leur wallet, et moi j'ai enfin des vraies statistiques.",
    rating: 5,
    initials: "YK",
    color: "#D4A62A",
  },
  {
    name: "Léa Fontaine",
    role: "Fondatrice, Fleurs de Léa",
    quote:
      "L'installation a pris moins d'un après-midi. Le tableau de bord me montre exactement qui sont mes meilleures clientes et quand elles reviennent.",
    rating: 4,
    initials: "LF",
    color: "#3D4759",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FAFAF7] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#1B8A5A]">
            Témoignages
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Ils ont fidélisé leurs clients avec PassLoyal
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col rounded-2xl border border-[#E4E1D6] bg-white p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < t.rating
                        ? "fill-[#D4A62A] text-[#D4A62A]"
                        : "fill-transparent text-[#E4E1D6]"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#3D4759]">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#E4E1D6] pt-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F1729]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#3D4759]/60">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
