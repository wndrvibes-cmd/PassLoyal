import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/layout/Logo";
import { site, footerNav } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = site.social.linkedin || site.social.instagram || site.social.twitter;

  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-4 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            {hasSocial ? (
              <div className="flex items-center gap-3 pt-1">
                {site.social.linkedin ? (
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                ) : null}
                {site.social.instagram ? (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                ) : null}
                {site.social.twitter ? (
                  <a
                    href={site.social.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Twitter / X"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Produit
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {footerNav.produit.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Entreprise
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {footerNav.entreprise.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.address ? (
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {site.address.line1}, {site.address.postalCode} {site.address.city}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
