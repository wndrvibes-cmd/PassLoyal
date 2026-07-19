import { site } from "@/lib/content/site";

export function MapEmbed() {
  const query = encodeURIComponent(
    `${site.address.line1}, ${site.address.postalCode} ${site.address.city}, ${site.address.country}`
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
      <iframe
        title={`${site.name} sur Google Maps`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full grayscale-[15%]"
      />
    </div>
  );
}
