import { type Project } from "@/lib/data/projects";
import { socialLinks } from "@/lib/social-links";
import { contactInfo } from "@/lib/contact-info";

const address = {
  "@type": "PostalAddress",
  addressLocality: "São Paulo",
  addressRegion: "SP",
  addressCountry: "BR",
};

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lorenzo Pardell",
    url: "https://lorenzopardell.com",
    jobTitle: "Re-Recording Mixer and Sound Designer",
    description:
      "Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries. Based in Sao Paulo, available worldwide.",
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address,
    sameAs: socialLinks.filter((l) => l.visible).map((l) => l.href),
    knowsAbout: [
      "Sound Design",
      "Re-Recording Mix",
      "Dialogue Editing",
      "ADR Supervision",
      "Foley",
      "Dolby Atmos",
      "Film Audio Post-Production",
    ],
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Lorenzo Pardell",
    url: "https://lorenzopardell.com",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address,
    areaServed: ["BR", "ES", "PT", "US"],
    serviceType: [
      "Re-Recording Mix",
      "Sound Design",
      "Dialogue Editing",
      "Audio Post-Production",
    ],
    founder: {
      "@type": "Person",
      name: "Lorenzo Pardell",
    },
  };
}

export function buildCreativeWorkSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    ...(project.release_date && { dateCreated: project.release_date.toString() }),
    ...(project.production_company && {
      productionCompany: {
        "@type": "Organization",
        name: project.production_company,
      },
    }),
    contributor: {
      "@type": "Role",
      contributor: {
        "@type": "Person",
        name: "Lorenzo Pardell",
        url: "https://lorenzopardell.com",
      },
      roleName: project.roles,
    },
    ...(project.imdb_url && { url: project.imdb_url }),
    ...(project.hero_url && {
      image: `https://lorenzopardell.com${project.hero_url}`,
    }),
  };
}
