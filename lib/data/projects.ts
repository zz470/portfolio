export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  category: string;
  roles: string[];
  imdb_url?: string;
  production_company?: string;
  media_platform?: string;
  release_date?: number;
  hero_url?: string;
  design_version?: string;
}

export const projects: Project[] = [
  // 2024 releases (sorted descending by release_date)
  {
    id: 1,
    title: "El Caso Asunta",
    slug: "el-caso-asunta",
    description:
      "True crime mini-series revisiting the high-profile murder case that shocked Spain in 2013. Lorenzo served as re-recording mixer, shaping the series' tense and emotionally charged soundscape.",
    thumbnail_url: "/images/projects/el-caso-asunta-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt27917480/",
    production_company: "Bambú Producciones",
    media_platform: "Netflix",
    release_date: 2024,
    hero_url: "/images/projects/el-caso-asunta-hero.svg",
    design_version: "primary",
  },
  {
    id: 2,
    title: "Respira",
    slug: "respira",
    description:
      "A Spanish thriller series following a detective investigating a series of mysterious deaths. Lorenzo contributed as dialogue editor and re-recording mixer, ensuring crisp and intelligible dialogue throughout.",
    thumbnail_url: "/images/projects/respira-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Dialogue Editor", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt28581842/",
    production_company: "Suma Latina",
    media_platform: "Netflix",
    release_date: 2024,
    hero_url: "/images/projects/respira-hero.svg",
    design_version: "secondary",
  },
  {
    id: 3,
    title: "La Infiltrada",
    slug: "la-infiltrada",
    description:
      "A dramatic film about an undercover police officer infiltrating a terrorist organization. Lorenzo handled sound design and re-recording mixing for this intense Spanish thriller.",
    thumbnail_url: "/images/projects/la-infiltrada-thumb.svg",
    video_url: "",
    category: "Film",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt27534150/",
    production_company: "Morena Films",
    release_date: 2024,
    hero_url: "/images/projects/la-infiltrada-hero.svg",
    design_version: "tertiary",
  },
  {
    id: 4,
    title: "Querer",
    slug: "querer",
    description:
      "A Spanish drama series exploring the complexities of a family dealing with domestic abuse. Lorenzo worked as boom operator and sound mixer on this emotionally resonant production.",
    thumbnail_url: "/images/projects/querer-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Boom Operator", "Production Sound Mixer"],
    imdb_url: "https://www.imdb.com/title/tt27672938/",
    production_company: "Mediapro",
    media_platform: "Movistar+",
    release_date: 2024,
    hero_url: "/images/projects/querer-hero.svg",
    design_version: "primary",
  },
  // 2023 releases
  {
    id: 5,
    title: "La Mesías",
    slug: "la-mesias",
    description:
      "A dark comedy series about two brothers searching for their mother, a cult leader who abandoned them. Lorenzo provided sound design services, crafting an unsettling and atmospheric sonic world.",
    thumbnail_url: "/images/projects/la-mesias-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Sound Designer"],
    imdb_url: "https://www.imdb.com/title/tt22804100/",
    production_company: "El Deseo",
    media_platform: "Movistar+",
    release_date: 2023,
    hero_url: "/images/projects/la-mesias-hero.svg",
    design_version: "secondary",
  },
  {
    id: 6,
    title: "El Cuerpo en Llamas",
    slug: "el-cuerpo-en-llamas",
    description:
      "The true story of a woman convicted of murdering her lover. Lorenzo worked as re-recording mixer on this gripping true crime series, blending music and effects for maximum dramatic impact.",
    thumbnail_url: "/images/projects/el-cuerpo-en-llamas-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt26503063/",
    production_company: "Bambú Producciones",
    media_platform: "Netflix",
    release_date: 2023,
    hero_url: "/images/projects/el-cuerpo-en-llamas-hero.svg",
    design_version: "tertiary",
  },
  {
    id: 7,
    title: "Nowhere",
    slug: "nowhere",
    description:
      "A survival thriller about a pregnant woman trapped in a shipping container adrift at sea. Lorenzo served as boom operator during principal photography on this intense, isolated production.",
    thumbnail_url: "/images/projects/nowhere-thumb.svg",
    video_url: "",
    category: "Film",
    roles: ["Boom Operator"],
    imdb_url: "https://www.imdb.com/title/tt16426418/",
    production_company: "Nostromo Pictures",
    media_platform: "Netflix",
    release_date: 2023,
    hero_url: "/images/projects/nowhere-hero.svg",
    design_version: "primary",
  },
  {
    id: 8,
    title: "Soy Georgina",
    slug: "soy-georgina",
    description:
      "Documentary series following Georgina Rodríguez, partner of Cristiano Ronaldo. Lorenzo contributed as dialogue editor for Season 2, ensuring clear and natural speech across multiple episodes.",
    thumbnail_url: "/images/projects/soy-georgina-thumb.svg",
    video_url: "",
    category: "Documentary",
    roles: ["Dialogue Editor"],
    imdb_url: "https://www.imdb.com/title/tt15477042/",
    production_company: "Kosmos Studios",
    media_platform: "Netflix",
    release_date: 2023,
    hero_url: "/images/projects/soy-georgina-hero.svg",
    design_version: "primary",
  },
  // 2022 releases
  {
    id: 9,
    title: "1920: Cárcel de Mujeres",
    slug: "1920-carcel-de-mujeres",
    description:
      "A period drama series set in a Spanish women's prison in the 1920s. Lorenzo performed dialogue editing on this richly atmospheric historical production.",
    thumbnail_url: "/images/projects/1920-carcel-de-mujeres-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Dialogue Editor"],
    imdb_url: "https://www.imdb.com/title/tt14796392/",
    production_company: "Suma Latina",
    media_platform: "Movistar+",
    release_date: 2022,
    hero_url: "/images/projects/1920-carcel-de-mujeres-hero.svg",
    design_version: "secondary",
  },
  {
    id: 10,
    title: "Intimidad",
    slug: "intimidad",
    description:
      "A political thriller about a female politician whose privacy is violated online. Lorenzo provided sound design and mixing, building tension and emotional depth throughout this compelling drama.",
    thumbnail_url: "/images/projects/intimidad-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt15490448/",
    production_company: "Plano a Plano",
    media_platform: "Netflix",
    release_date: 2022,
    hero_url: "/images/projects/intimidad-hero.svg",
    design_version: "tertiary",
  },
  {
    id: 11,
    title: "La Unidad Kabul",
    slug: "la-unidad-kabul",
    description:
      "A continuation of the acclaimed counter-terrorism series, this time set in Afghanistan. Lorenzo handled boom operation and production sound mixing on location.",
    thumbnail_url: "/images/projects/la-unidad-kabul-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Boom Operator", "Production Sound Mixer"],
    imdb_url: "https://www.imdb.com/title/tt21107786/",
    production_company: "Mediapro",
    media_platform: "Movistar+",
    release_date: 2022,
    hero_url: "/images/projects/la-unidad-kabul-hero.svg",
    design_version: "primary",
  },
  // 2021 releases
  {
    id: 12,
    title: "El Inconveniente",
    slug: "el-inconveniente",
    description:
      "A comedic film about a real estate agent who discovers unexpected neighbors. Lorenzo worked on sound design and post-production mixing for this lighthearted Spanish comedy.",
    thumbnail_url: "/images/projects/el-inconveniente-thumb.svg",
    video_url: "",
    category: "Film",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt11481994/",
    production_company: "A Contracorriente Films",
    release_date: 2021,
    hero_url: "/images/projects/el-inconveniente-hero.svg",
    design_version: "secondary",
  },
  {
    id: 13,
    title: "Vida Perfecta",
    slug: "vida-perfecta",
    description:
      "A series following a woman in her late thirties navigating unconventional life choices. Lorenzo served as dialogue editor, bringing clarity and nuance to the performance-driven dialogue.",
    thumbnail_url: "/images/projects/vida-perfecta-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Dialogue Editor"],
    imdb_url: "https://www.imdb.com/title/tt9670850/",
    production_company: "Mediapro",
    media_platform: "Movistar+",
    release_date: 2021,
    hero_url: "/images/projects/vida-perfecta-hero.svg",
    design_version: "primary",
  },
  {
    id: 14,
    title: "Apagón",
    slug: "apagon",
    description:
      "A docu-series exploring what would happen if the electrical grid failed across Spain. Lorenzo contributed sound design and mixing, crafting an immersive sonic portrait of societal collapse.",
    thumbnail_url: "/images/projects/apagon-thumb.svg",
    video_url: "",
    category: "Documentary",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt17244368/",
    production_company: "Buendía Estudios",
    media_platform: "HBO Max",
    release_date: 2021,
    hero_url: "/images/projects/apagon-hero.svg",
    design_version: "tertiary",
  },
  // 2020 releases
  {
    id: 15,
    title: "Dime Quién Soy",
    slug: "dime-quien-soy",
    description:
      "A historical series following a woman who lived through the Spanish Civil War and World War II. Lorenzo performed dialogue editing on this sweeping multi-generational drama.",
    thumbnail_url: "/images/projects/dime-quien-soy-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Dialogue Editor"],
    imdb_url: "https://www.imdb.com/title/tt11056742/",
    production_company: "Diagonal TV",
    media_platform: "Movistar+",
    release_date: 2020,
    hero_url: "/images/projects/dime-quien-soy-hero.svg",
    design_version: "primary",
  },
  {
    id: 16,
    title: "La Valla",
    slug: "la-valla",
    description:
      "A dystopian thriller set in Spain 2045, divided into two zones after a civil war. Lorenzo contributed as boom operator and production sound mixer on this ambitious science fiction series.",
    thumbnail_url: "/images/projects/la-valla-thumb.svg",
    video_url: "",
    category: "TV Series",
    roles: ["Boom Operator", "Production Sound Mixer"],
    imdb_url: "https://www.imdb.com/title/tt9834534/",
    production_company: "Alea Media",
    media_platform: "Antena 3",
    release_date: 2020,
    hero_url: "/images/projects/la-valla-hero.svg",
    design_version: "secondary",
  },
  // Undated or unknown release year (sorted to end)
  {
    id: 17,
    title: "Sonido en Construcción",
    slug: "sonido-en-construccion",
    description:
      "A short documentary exploring the world of location sound recording on Spanish film sets. Lorenzo appears as both subject and sound recordist in this behind-the-scenes piece.",
    thumbnail_url: "/images/projects/sonido-en-construccion-thumb.svg",
    video_url: "",
    category: "Short Film",
    roles: ["Production Sound Mixer", "Sound Designer"],
    production_company: "Escuela de Cine de Madrid",
    hero_url: "/images/projects/sonido-en-construccion-hero.svg",
    design_version: "tertiary",
  },
  {
    id: 18,
    title: "Campaña Cruzcampo",
    slug: "campana-cruzcampo",
    description:
      "A branded advertisement for Cruzcampo beer featuring innovative sound design and immersive mixing. Lorenzo crafted the sonic identity for this high-profile Spanish commercial campaign.",
    thumbnail_url: "/images/projects/campana-cruzcampo-thumb.svg",
    video_url: "",
    category: "Advertisement",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    production_company: "Leo Burnett Madrid",
    hero_url: "/images/projects/campana-cruzcampo-hero.svg",
    design_version: "primary",
  },
  {
    id: 19,
    title: "Entre Sombras",
    slug: "entre-sombras",
    description:
      "A short film exploring loss and memory through the journey of a grieving father. Lorenzo served as sound designer and re-recording mixer on this intimate, award-winning short.",
    thumbnail_url: "/images/projects/entre-sombras-thumb.svg",
    video_url: "",
    category: "Short Film",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    production_company: "Escuela de Cine de Madrid",
    hero_url: "/images/projects/entre-sombras-hero.svg",
    design_version: "primary",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(count: number = 3): Project[] {
  return projects.slice(0, count);
}
