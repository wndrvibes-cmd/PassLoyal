import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { site } from "@/lib/content/site";

const items = [
  {
    icon: Mail,
    label: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: `${site.address.line1}, ${site.address.postalCode} ${site.address.city}`,
    href: undefined,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Du lundi au vendredi, 9h – 18h",
    href: undefined,
  },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        );

        return item.href ? (
          <a key={item.label} href={item.href} className="transition-opacity hover:opacity-80">
            {content}
          </a>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
  );
}
