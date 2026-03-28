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
  featured?: boolean;
  filmfreeway_url?: string;
}

export const projects: Project[] = [
  // 2026 releases
  {
    id: 1,
    title: "Escravos da Fé - Arautos do Evangelho",
    slug: "escravos-da-fe",
    description: "A série investiga denúncias de abusos e manipulação psicológica de ex-membros do grupo católico Arautos do Evangelho.",
    thumbnail_url: "/images/projects/escravos_da_fe_arautos_do_evangelho/escravos_da_fe_arautos_do_evangelho_thumb_01.jpg",
    video_url:
      "https://www.youtube.com/watch?v=Va4Zkp0dtiY&t",
    category: "Documentary",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt40621741/",
    production_company: "Endemol",
    media_platform: "HBO",
    release_date: 2026,
    hero_url: "/images/projects/escravos_da_fe_arautos_do_evangelho/escravos_da_fe_arautos_do_evangelho_hero_01.jpg",
    design_version: "primary",
    featured: true,
  },
  // 2025 releases
  {
    id: 2,
    title: "Operação Transplante - Season 1",
    slug: "operacao-transplante",
    description:
      "Operação Transplante documenta com exclusividade a jornada de equipes médicas e pacientes envolvidos com transplantes de órgãos em São Paulo.",
    thumbnail_url: "/images/projects/operacao_transplante_s01/operacao_transplante_thumb_1.avif",
    video_url:
      "https://www.youtube.com/watch?v=ogksrORk3TE&ab_channel=MaxBrasil",
    category: "Series",
    roles: ["Sound Effects Editor"],
    imdb_url:
      "https://www.imdb.com/pt/title/tt36334618/",
    production_company: "Mixer Films",
    media_platform: "Discovery H&H - HBO Max",
    release_date: 2025,
    hero_url: "/images/projects/operacao_transplante_s01/operacao_transplante_hero_1.webp",
    design_version: "primary",
    featured: false,
  },
  {
    id: 3,
    title: "Minha Mãe Com Seu Pai - Season 1",
    slug: "minha-mae-com-seu-pai",
    description:
      "Pais e mães solteiros participam de dinâmicas e dates em busca de um novo amor. O que eles não suspeitam é que estão sendo observados e controlados por seus próprios filhos.",
    thumbnail_url: "/images/projects/minha_mae_com_seu_pai_s01/mmsp_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=fgvSE1eWZNI&ab_channel=FilmesAtorClodoaldoGomes",
    category: "Reality",
    roles: ["Sound Designer", "Re-Recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt36751856/",
    production_company: "Formata",
    media_platform: "Globoplay",
    release_date: 2025,
    hero_url: "/images/projects/minha_mae_com_seu_pai_s01/mmsp_hero.jpg",
    design_version: "primary",
    featured: false,
  },
  {
    id: 4,
    title: "LOL: SE RIR JÁ ERA! - Season 4",
    slug: "lol-brasil-s4",
    description:
      "A quarta temporada de 'LOL: SE RIR, JÁ ERA!' traz o Porta dos Fundos, o grupo de comédia mais famoso do Brasil, em uma batalha insana. As regras: um riso, cartão amarelo. Se rir de novo, eliminação. Em jogo, o prêmio de R$ 350 mil.",
    thumbnail_url: "/images/projects/lol_porta_dos_fundos_s04/lol_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=VplAhJe6dHc&ab_channel=PrimeVideoBrasil",
    category: "Reality",
    roles: ["Re-recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt15573636/",
    production_company: "Formata",
    media_platform: "Prime Video",
    release_date: 2025,
    hero_url: "/images/projects/lol_porta_dos_fundos_s04/lol_hero.jpg",
    design_version: "primary",
    featured: false,
  },
  {
    id: 5,
    title: "Mundo da Lua",
    slug: "mundo-da-lua",
    description:
      "Passados 34 anos após a série original, a história acompanha a família do protagonista Lucas Silva e Silva — antes com dez anos, agora piloto de avião, casado com Isabela e pai de Vitória, que prefere ser chamada de Emília. Estudante apaixonada por robótica, Emília assim como o pai na infância gosta de se imaginar vivendo grandes aventuras.",
    thumbnail_url: "/images/projects/mundo_da_lua/mundo_da_lua_thumb_01.webp",
    video_url:
      "https://www.youtube.com/watch?v=WU2brN_Fetw",
    category: "Series",
    roles: ["Dialogue Editor", "Re-recording Mixer"],
    imdb_url: "https://www.imdb.com/title/tt37812983/",
    production_company: "Mixer Films",
    media_platform: "TV Cultura",
    release_date: 2025,
    hero_url: "/images/projects/mundo_da_lua/mundo_da_lua_hero_01.png",
    design_version: "primary",
  },
  {
    id: 6,
    title: "Por Trás do Prato",
    slug: "por-tras-do-prato",
    description:
      "Uma série documental em 8 episódios que explora as semelhanças culturais e gastronômicas entre o Brasil e a França. Apresentada pela chef Ana Luiza Trajano, a série realiza um mergulho antropológico nas histórias, sabores e tradições de ambos os países.",
    thumbnail_url: "/images/projects/por_tras_do_prato/por_tras_do_prato_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=TpOtdjGBLT0",
    category: "Series",
    roles: ["Re-recording Mixer"],
    production_company: "Instituto Brasil a Gosto",
    media_platform: "GNT - Globoplay",
    release_date: 2025,
    hero_url: "/images/projects/por_tras_do_prato/por_tras_do_prato_hero_1.avif",
    design_version: "primary",
  },
  {
    id: 7,
    title: "Primavera nos Dentes",
    slug: "primavera-nos-dentes",
    description:
      "A série conta a trajetória do Secos & Molhados, banda que marcou a música e o comportamento no Brasil, fez shows históricos e bateu recordes de vendas nos anos 1970. Entre imagens de arquivo, registros raros e depoimentos inéditos, a série mostra a curta e intensa jornada da banda.",
    thumbnail_url: "/images/projects/primavera_nos_dentes/primavera_nos_dentes_thumb_01.jpg",
    video_url:
      "https://www.youtube.com/watch?v=gBinGAvleX8",
    category: "Documentary",
    roles: ["Re-recording Mixer"],
    production_company: "Santa Rita Filmes",
    media_platform: "Canal Brasil - Globoplay",
    release_date: 2025,
    hero_url: "/images/projects/primavera_nos_dentes/primavera_nos_dentes_hero_01.jpg",
    design_version: "primary",
    featured: true,
  },
  {
    id: 8,
    title: "Werk It",
    slug: "werk-it",
    description:
      "Reality show de moda e beleza que reúne 21 participantes divididos em sete houses, cada trio composto por um stylist, um maquiador e um cabeleireiro. A cada episódio, os grupos enfrentam desafios que exigem talento técnico, sensibilidade artística e trabalho em equipe.",
    thumbnail_url: "/images/projects/werk_it/werk_it_thumb.jpg",
    video_url:
      "https://www.youtube.com/watch?v=A1WHuaLln9c",
    category: "Reality",
    roles: ["Sound Designer"],
    imdb_url: "https://www.imdb.com/title/tt36834057/",
    production_company: "Monster Movie n' Mgmt",
    media_platform: "E! Entertainment",
    release_date: 2025,
    hero_url: "/images/projects/werk_it/werk_it_hero.jpg",
    design_version: "primary",
  },
  // 2024 releases
  {
    id: 9,
    title: "No Corre - Season 2",
    slug: "no-corre",
    description:
      "No Corre é uma série humorística que acompanha a rotina e as situações hilárias de um grupo de motoboys no bairro da Mooca, com destaque para Jackson Faive (Marco Luque), um entregador excêntrico que se faz de durão.",
    thumbnail_url: "/images/projects/no_corre_s02/mmsp_thumb_1.webp",
    video_url:
      "https://www.youtube.com/watch?v=WT0iPADc7AY&ab_channel=Multishow",
    category: "Series",
    roles: ["Dialogue Editor", "Re-recording mixer"],
    imdb_url: "https://www.imdb.com/title/tt29871813/",
    production_company: "Formata",
    media_platform: "Globoplay - Multishow",
    release_date: 2024,
    hero_url: "/images/projects/no_corre_s02/no_corre_hero.jpg",
    design_version: "primary",
  },
  {
    id: 10,
    title: "Maniaco Do Parque - A História Nunca Contada",
    slug: "maniaco-do-parque",
    description:
      "Os crimes de Francisco de Assis Pereira são revisitados pela perspectiva das vítimas, novos relatos de investigadores e áudios inéditos do assassino em série conhecido nacionalmente como Maníaco do Parque.",
    thumbnail_url: "/images/projects/maniaco_do_parque/maniaco_do_parque_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=T_7CA8tdL1I&ab_channel=PrimeVideoBrasil",
    category: "Documentary",
    roles: ["Sound Designer", "Re-recording Mixer"],
    imdb_url: "https://www.imdb.com/pt/title/tt33394662/",
    production_company: "Santa Rita Filmes",
    media_platform: "Prime Video",
    release_date: 2024,
    hero_url: "/images/projects/maniaco_do_parque/maniaco_do_parque_hero.avif",
    design_version: "primary",
    featured: true,
  },
  {
    id: 11,
    title: "Helipa - Um Autorretrato",
    slug: "helipa",
    description:
      "Cinco artistas independentes se reúnem para um projeto inédito: a Cypher Helipa. Com o objetivo de falar sobre as suas histórias de vida atreladas à favela de Heliópolis, os MCs contam suas vivências através da música e do auto registro.",
    thumbnail_url: "/images/projects/helipa/helipa_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=MSGQEy2Bhww&ab_channel=MTVBrasil",
    category: "Documentary",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "MTV",
    media_platform: "Paramount+",
    release_date: 2024,
    hero_url: "/images/projects/helipa/helipa_hero_1.jpg",
    design_version: "primary",
    featured: true,
  },
  {
    id: 12,
    title: "Luva de Pedreiro - O Rei Da Jogada",
    slug: "luva-de-pedreiro",
    description:
      "Uma docssérie que retrata a impactante transformação do brasileiro Iran Ferreira, um adolescente de uma cidade do interior que se tornou um popular influencer. Cada episódio acompanha os triunfos e desafios desse jovem que atreveu sonhar grande.",
    thumbnail_url: "/images/projects/luva_de_pedreiro/luva_de_pedreiro_thumb_1.avif",
    video_url:
      "https://www.youtube.com/watch?v=TDi4yirmR00&ab_channel=MaxBrasil",
    category: "Documentary",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    imdb_url: "https://www.imdb.com/pt/title/tt34530164/",
    production_company: "Beyond Films",
    media_platform: "HBO Max",
    release_date: 2024,
    hero_url: "/images/projects/luva_de_pedreiro/luva_de_pedreiro_hero.jpg",
    design_version: "primary",
    featured: true,
  },
  {
    id: 13,
    title: "Dra. Darci - Season 4",
    slug: "dra-darci-4",
    description:
      "Dra. Darci agora tem um podcast, atende em um coworking e lida com as figuras de lá com a ajuda de Grazi, sua empresária. Já o Darci quer atuar, ele mesmo, como terapeuta.",
    thumbnail_url: "/images/projects/dra_darci_s04_s05/daric_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=d046UU2ZeuM&ab_channel=Multishow",
    category: "Series",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "Formata",
    media_platform: "Globoplay - Multishow",
    release_date: 2024,
    hero_url: "/images/projects/dra_darci_s04_s05/daric_hero_1.jpg",
    design_version: "primary",
  },
  {
    id: 14,
    title: "Quem Não Pode Se Sacode",
    slug: "quem-nao-pode-se-sacode",
    description:
      "Quem Não Pode, Se Sacode é um programa onde as pessoas vão se sacudir, se mexer e se divertir. Giovanna Ewbank e Fê Paes Leme fazem dinâmicas divertidas com convidados e plateia.",
    thumbnail_url: "/images/projects/quem_nao_pode_se_sacode/quem_nao_pode_se_sacode_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=ovX3u1IzcDE&ab_channel=CanalGNT",
    category: "Podcast",
    roles: ["Dialogue Editor", "Re-recording Mixer"],
    production_company: "Formata",
    media_platform: "Globoplay - GNT",
    release_date: 2024,
    hero_url: "/images/projects/quem_nao_pode_se_sacode/quem_nao_pode_se_sacode_hero_1.avif",
    design_version: "primary",
  },
  {
    id: 15,
    title: "Surreal Portugal",
    slug: "surreal-portugal",
    description:
      "Portugal's guide to the absurd. A comedy sketch show that oscillates between Nonsense and Satire. A kind of journey to parallel realities dominated by Absurdity and Surrealism, which, however, are not so far from the world we live in, more specifically, from the country we are from, a Surreal Portugal.",
    thumbnail_url: "/images/projects/portugal_surreal/pt_surreal_thumb_1.png",
    video_url:
      "https://www.youtube.com/watch?v=-pbqcE1EfL0&ab_channel=FredFabrik",
    category: "Series",
    roles: ["Boom Operator", "Sound Mixer"],
    imdb_url: "https://www.imdb.com/title/tt33015035/",
    production_company: "Fabrik",
    release_date: 2024,
    hero_url: "/images/projects/portugal_surreal/pt_surreal_hero.jpg",
    design_version: "primary",
  },
  {
    id: 16,
    title: "Papo Cruzado",
    slug: "papo-cruzado",
    description:
      "Talk-show com 20 episódios semanais apresentado pelo ídolo do MMA Fabrício Werdum e pela atriz e influenciadora digital Kéfera. O programa trata de temas do cotidiano e do universo das artes marciais sob a perspectiva de atletas e convidados famosos.",
    thumbnail_url: "/images/projects/papo_cruzado/papo_cruzado_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/shorts/NY6A_bazp4Y",
    category: "Podcast",
    roles: ["Re-recording Mixer"],
    production_company: "Mixer Films",
    media_platform: "Combate - Globoplay",
    release_date: 2024,
    hero_url: "/images/projects/papo_cruzado/papo_cruzado_hero_1.jpg",
    design_version: "primary",
  },
  // 2023 releases
  {
    id: 17,
    title: "Run For Europe",
    slug: "run-for-europe",
    description:
      "\"Run for Europe\" tells the inspiring story of Raphael's remarkable journey to run a marathon in every European Union country. This documentary project is a poignant reminder of the significance of preserving and celebrating the unique qualities that unite Europe while emphasizing the profound power of connecting people through a shared experience.",
    thumbnail_url: "/images/projects/run_for_europe/thumb_run-for-europe.jpg",
    video_url: "https://www.youtube.com/watch?v=l29u7kFAhDM&t",
    category: "Advertisement",
    roles: ["Recording Engineer"],
    media_platform: "Youtube",
    release_date: 2023,
    hero_url: "/images/projects/run_for_europe/hero_run-for-europe.jpg",
    design_version: "secondary",
  },
  // 2022 releases
  {
    id: 18,
    title: "48H Film Festival - O Segredo Dos Pássaros",
    slug: "o-segredo-dos-passaros",
    description:
      "An unsuccessful coup raises suspicions of betrayal between the gang members, only to discover that the leader is the victim of a greater plan.",
    thumbnail_url: "/images/projects/o_segredo_dos_passaros/passaros_thumb.jpg",
    video_url: "",
    filmfreeway_url: "https://filmfreeway.com/osegredodospassaros",
    category: "Film",
    roles: ["Boom Operator", "Sound Mixer"],
    imdb_url: "https://www.imdb.com/title/tt19894422/",
    production_company: "O11ZE.UM",
    media_platform: "Theatric",
    release_date: 2022,
    hero_url: "/images/projects/o_segredo_dos_passaros/passaros_hero.jpeg",
    design_version: "primary",
  },
  {
    id: 19,
    title: "Bimbo - Receitas da Tia Cátia",
    slug: "bimbo",
    description:
      "A series of commercials for the Portuguese brand, Bimbo, featuring the talented Portuguese chef Cátia Goarmon, affectionately known as Tia Catia. Bimbo is a prominent brand in Portugal, known for its delicious bakery products. The commercials aimed to showcase the brand's products while highlighting the culinary expertise and charm of Tia Catia, a beloved figure in Portuguese cuisine.",
    thumbnail_url: "/images/projects/bimbo/bimbo_thumb.jpg",
    video_url:
      "https://www.youtube.com/watch?v=gjSU0BPhCMs&ab_channel=RECORDTV",
    category: "Advertisement",
    roles: ["Boom Operator", "Sound Mixer"],
    production_company: "Blablabla Media",
    media_platform: "Youtube",
    release_date: 2022,
    hero_url: "/images/projects/bimbo/bimbo_hero.png",
    design_version: "secondary",
  },
  {
    id: 20,
    title: "Jumo Health",
    slug: "jumo-health",
    description: "",
    thumbnail_url: "/images/projects/jumo_health/jumo-health-astronauts_16x9.jpg",
    video_url:
      "https://www.youtube.com/watch?v=j_N9JpT0dyM",
    category: "Animation",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "Moonbow Studios",
    media_platform: "Youtube",
    release_date: 2022,
    hero_url: "/images/projects/jumo_health/jumo-health-rocket_16x9.jpg",
    design_version: "tertiary",
  },
  {
    id: 21,
    title: "Natto Pharma",
    slug: "natto-pharma",
    description: "",
    thumbnail_url: "/images/projects/natto_pharma/natto-pharma-heart_16x9.jpg",
    video_url: "",
    category: "Animation",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "Moonbow Studios",
    media_platform: "Youtube",
    release_date: 2022,
    hero_url: "/images/projects/natto_pharma/natto-pharma-woman_16x9.jpg",
    design_version: "tertiary",
  },
  {
    id: 22,
    title: "UnoBravo",
    slug: "unobravo",
    description: "",
    thumbnail_url: "/images/projects/unobravo/unobravo_thumb_1.jpg",
    video_url:
      "https://www.youtube.com/watch?v=zS0qZu9AQe8",
    category: "Animation",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "Moonbow Studios",
    media_platform: "Youtube",
    release_date: 2022,
    hero_url: "/images/projects/unobravo/unobravo_hero_1.jpg",
    design_version: "secondary",
  },
  // 2021 releases
  {
    id: 23,
    title: "Gronda - José Avillez Masterclass",
    slug: "gronda-avillez",
    description:
      "New masterclass by José Avillez on Gronda: \"7 must-see techniques applied to the Portuguese cuisine\". The Portuguese superstar chef José Avillez teaches you highly useful techniques to embellish your dishes and fill them with color & flavor.",
    thumbnail_url: "/images/projects/gronda_jose_avillez/gronda-jose-avillez_thumb.jpg",
    video_url:
      "https://www.youtube.com/watch?v=Hr3Z_0v4Ct4&ab_channel=Gronda",
    category: "Advertisement",
    roles: ["Boom Operator", "Sound Mixer"],
    production_company: "Gronda",
    media_platform: "Online Course",
    release_date: 2021,
    hero_url: "/images/projects/gronda_jose_avillez/gronda-jose-avillez_hero.jpg",
    design_version: "primary",
  },
  {
    id: 24,
    title: "Gronda - Henrique Sá Pessoa Masterclass",
    slug: "gronda-sa-pessoa",
    description:
      "7 Genius Salted Codfish Recipes | Masterclass with two-MICHELIN-starred chef, Henrique Sá Pessoa on Gronda.",
    thumbnail_url: "/images/projects/gronda_henrique_sa_pessoa/gronda-henrique-sa-pessoa_thumb.jpg",
    video_url:
      "https://www.youtube.com/watch?v=87fRnstlqj0&ab_channel=Gronda",
    category: "Advertisement",
    roles: ["Boom Operator", "Sound Mixer"],
    production_company: "Gronda",
    media_platform: "Online Course",
    release_date: 2021,
    hero_url: "/images/projects/gronda_henrique_sa_pessoa/gronda-henrique-sa-pessoa_hero.jpg",
    design_version: "primary",
  },
  {
    id: 25,
    title: "G.O.T.S - From Field to Fashion",
    slug: "gots",
    description:
      "A series of commercials titled \"Faces From Field to Fashion,\" which offered a captivating behind-the-scenes journey into the heart of the Global Organic Textile Standard, showcasing the people, processes, and positive impact of G.O.T.S.-certified products. The project provided a compelling insight into the lives of individuals from one of the G.O.T.S.-certified facilities, Empresa Têxtil De Peugas, a Portuguese company producing 2.5 million socks annually, deeply committed to community, care, and environmental consciousness.",
    thumbnail_url: "/images/projects/gots/thumb_gots.jpg",
    video_url:
      "https://www.youtube.com/watch?v=1tFgoqtlmHs&ab_channel=GlobalOrganicTextileStandard",
    category: "Advertisement",
    roles: ["Boom Operator", "Sound Mixer"],
    production_company: "Global Organic Textile Standard",
    media_platform: "Social Media",
    release_date: 2021,
    hero_url: "/images/projects/gots/hero_gots.jpg",
    design_version: "secondary",
  },
  {
    id: 26,
    title: "Gnosis - Vitamin K2 & Women's Health",
    slug: "gnosis-vitamin-k2-womens-health",
    description:
      "Gnosis is a leading nutraceuticals company. As part of a video series, we developed a motion graphics style that makes use of negative spaces and smart transitions to help convey the importance of supplementation for health and wellbeing.",
    thumbnail_url: "/images/projects/gnosis-k2/gnosis_thumb_1.jpg",
    video_url:
      "https://vimeo.com/733933182",
    category: "Animation",
    roles: ["Dialogue Editor", "Sound Designer", "Re-recording Mixer"],
    production_company: "Moonbow Studios",
    media_platform: "Youtube",
    release_date: 2021,
    hero_url: "/images/projects/gnosis-k2/gnosis_hero.jpg",
    design_version: "tertiary",
  },
  // 2020 releases
  {
    id: 27,
    title: "Ropes For Building Blocks",
    slug: "ropes-for-building-blocks",
    description: "",
    thumbnail_url: "/images/projects/ropes-for-building-blocks/rfbb_thumb_1.jpg",
    video_url: "",
    category: "Film",
    roles: ["Original Score"],
    production_company: "New York Film Academy",
    media_platform: "NYFA",
    release_date: 2020,
    hero_url: "/images/projects/ropes-for-building-blocks/rfbb_hero_1.jpg",
    design_version: "secondary",
  },
  // 2018 releases
  {
    id: 28,
    title: "Piracanjuba - Dia Das Crianças",
    slug: "piracanjuba",
    description:
      "Quando o assunto é ser criança, não importa a idade: o importante é ter o espírito leve e divertido sempre presente! E você, já brincou com quem você ama hoje? Feliz Dia das Crianças para todos que mantém sua criança interior sempre viva!",
    thumbnail_url: "/images/projects/piracanjuba/thumb_piracanjuba.jpg",
    video_url:
      "https://www.youtube.com/watch?v=APvzATtNQ1s&ab_channel=OficinaDeImagens",
    category: "Advertisement",
    roles: ["Original Score"],
    production_company: "Caraballo",
    media_platform: "Broadcast",
    release_date: 2018,
    hero_url: "/images/projects/piracanjuba/hero_piracanjuba.jpg",
    design_version: "secondary",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(count: number = 3): Project[] {
  return sortProjectsByDate(projects.filter((p) => p.featured)).slice(0, count);
}

export function sortProjectsByDate(projectList: Project[]): Project[] {
  return [...projectList].sort((a, b) => {
    if (a.release_date && b.release_date) {
      return b.release_date - a.release_date;
    }
    if (a.release_date) return -1;
    if (b.release_date) return 1;
    return 0;
  });
}
