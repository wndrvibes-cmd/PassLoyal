import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/ui/badge";

export function Story() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
        <RevealOnScroll className="lg:sticky lg:top-28">
          <Badge>Notre histoire</Badge>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Née d'un constat simple dans les commerces de quartier
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
          <RevealOnScroll delay={0.05}>
            <p>
              PassLoyal est née d'une observation partagée par des dizaines de commerçants : les
              cartes de fidélité en papier se perdent, les applications dédiées ne sont jamais
              téléchargées, et les programmes de fidélité finissent oubliés dans un tiroir — ou
              désinstallés au bout d'une semaine.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p>
              Pourtant, un objet accompagne déjà chaque client dans sa poche : son téléphone, et
              plus précisément son Wallet. Apple Wallet et Google Wallet sont conçus pour ranger
              les cartes d'embarquement, les billets de concert, les cartes bancaires — pourquoi
              pas la carte de fidélité de votre commerce ?
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p>
              C'est ce pari que nous avons fait : construire la fidélité la plus simple possible,
              sans application à télécharger, sans compte à créer, avec la même exigence de
              finition que les meilleurs produits numériques.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-foreground">
              Aujourd'hui, PassLoyal accompagne des commerces indépendants comme des enseignes
              multi-boutiques, avec une conviction inchangée : la fidélité ne devrait jamais être
              une contrainte, ni pour le commerçant, ni pour son client.
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
