// src/lib/schema.ts
import { Project } from "@/data/projects";

// ─── 1. 基础公司信息（单一样本源）────────────────────────────────────────────
export const BUSINESS_INFO = {
  name: "HIDI Lau Architect",
  url: "https://hidilauarchitect.com/",
  logo: "https://hidilauarchitect.com/assets/logo-CP_OYl3M.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1, Jalan Biru 2, Taman Pelangi",
    addressLocality: "Johor Bahru",
    addressRegion: "Johor",
    postalCode: "80400",
    addressCountry: "MY",
  },
};

// ─── 2. 首页 ─────────────────────────────────────────────────────────────────
export const getHomeSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BUSINESS_INFO.url}#website`,
      url: `${BUSINESS_INFO.url}/`,
      name: "HIDI Lau Architect",
      alternateName: ["HIDI Lau", "Hidi Lau Architect"],
      publisher: { "@id": `${BUSINESS_INFO.url}#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
      url: `${BUSINESS_INFO.url}/`,
    },
  ],
});

// ─── 3. About ────────────────────────────────────────────────────────────────
export const getAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BUSINESS_INFO.url}about/`,
      url: `${BUSINESS_INFO.url}about/`,
      name: "About HIDI Lau Architect",
      description:
        "Learn more about Ar. Hidi Lau Wei Lin and the philosophy of HIDI Lau Architect.",
      mainEntity: {
        "@type": "Person",
        name: "Ar. Hidi Lau Wei Lin",
        jobTitle: "Principal Architect",
        affiliation: {
          "@type": "LocalBusiness",
          name: BUSINESS_INFO.name,
          address: BUSINESS_INFO.address,
        },
        description:
          "Ar. Hidi Lau Wei Lin is a practicing Architect registered with Lembaga Arkitek Malaysia (LAM). She specialized in contemporary luxury homes and tropical resorts.",
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Melbourne" },
          { "@type": "CollegeOrUniversity", name: "University of Western Australia" },
        ],
        award: "PAM Silver Award (2019) - Commercial Low Rise Category",
        memberOf: [
          { "@type": "Organization", name: "Pertubuhan Akitek Malaysia (PAM)" },
          { "@type": "Organization", name: "Lembaga Arkitek Malaysia (LAM)" },
        ],
      },
    },
  ],
});

// ─── 4. Services（列表页）────────────────────────────────────────────────────
export const getServicesSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BUSINESS_INFO.url}services/`,
      url: `${BUSINESS_INFO.url}services/`,
      name: "Architectural and Interior Design Services | HIDI Lau Architect",
      description:
        "Comprehensive architectural solutions, interior design, authority submissions and passionate craftsmanship in Johor Bahru.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS_INFO.url}services/` },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Professional Design Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Architectural Design",
              url: `${BUSINESS_INFO.url}services/architectural-design/`,
              description:
                "Comprehensive architectural solutions from concept to completion, blending form and function.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Interior Design",
              url: `${BUSINESS_INFO.url}services/interior-design/`,
              description:
                "Crafting refined interiors that reflect your lifestyle with meticulous attention to detail.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Authority Submissions",
              url: `${BUSINESS_INFO.url}services/authority-submissions/`,
              description:
                "Professional handling of all regulatory submissions and approvals for seamless project delivery.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Passionate Craftsmanship",
              url: `${BUSINESS_INFO.url}services/craftsmanship/`,
              description:
                "Every element is carefully selected and crafted to achieve absolute perfection.",
            },
          },
        ],
      },
    },
  ],
});

// ─── 5. Architectural Design（详情页）────────────────────────────────────────
export const getArchitecturalDesignSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
    },
    {
      "@type": "Service",
      "@id": `${BUSINESS_INFO.url}services/architectural-design/`,
      name: "Architectural Design",
      alternateName: "Architecture Design Service Malaysia",
      description:
        "Comprehensive architectural design solutions from concept to completion. We study the site, environment, lifestyle requirements, spatial flow, natural lighting, ventilation, and long-term usability before shaping the design direction for residential, renovation, commercial, and development projects.",
      url: `${BUSINESS_INFO.url}services/architectural-design/`,
      serviceType: "Architectural Design",
      provider: { "@id": `${BUSINESS_INFO.url}#organization` },
      areaServed: [
        { "@type": "State", name: "Johor" },
        { "@type": "Country", name: "Malaysia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Architectural Design Process",
        itemListElement: [
          "Site analysis and design feasibility",
          "Space planning and layout development",
          "Conceptual design direction",
          "Floor plans and elevations",
          "Design refinement based on client feedback",
          "Material and façade consideration",
          "Functional planning for daily use",
          "Coordination between design, structure, and authority requirements",
        ].map((step, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: step },
        })),
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS_INFO.url}services/` },
          { "@type": "ListItem", position: 3, name: "Architectural Design", item: `${BUSINESS_INFO.url}services/architectural-design/` },
        ],
      },
    },
  ],
});

// ─── 6. Interior Design（详情页）─────────────────────────────────────────────
export const getInteriorDesignSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
    },
    {
      "@type": "Service",
      "@id": `${BUSINESS_INFO.url}services/interior-design/`,
      name: "Interior Design",
      alternateName: "Interior Design Service Malaysia",
      description:
        "Visually refined and practical interior design for residential and commercial spaces. We consider architectural language, movement flow, lighting, materials, storage, and the lifestyle of users to create interiors that are beautiful, comfortable, and lasting.",
      url: `${BUSINESS_INFO.url}services/interior-design/`,
      serviceType: "Interior Design",
      provider: { "@id": `${BUSINESS_INFO.url}#organization` },
      areaServed: [
        { "@type": "State", name: "Johor" },
        { "@type": "Country", name: "Malaysia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Interior Design Approach",
        itemListElement: [
          "Interior concept development",
          "Space planning and furniture layout",
          "Material and colour selection",
          "Lighting atmosphere and ambience planning",
          "Built-in cabinet and storage design",
          "Feature wall and ceiling design",
          "Selection of finishes, textures, and details",
          "Coordination between interior design and architectural structure",
        ].map((step, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: step },
        })),
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS_INFO.url}services/` },
          { "@type": "ListItem", position: 3, name: "Interior Design", item: `${BUSINESS_INFO.url}services/interior-design/` },
        ],
      },
    },
  ],
});

// ─── 7. Authority Submissions（详情页）───────────────────────────────────────
export const getAuthoritySubmissionsSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
    },
    {
      "@type": "Service",
      "@id": `${BUSINESS_INFO.url}services/authority-submissions/`,
      name: "Authority Submissions",
      alternateName: "Building Plan Submission and Regulatory Approval Malaysia",
      description:
        "Professional authority submission service that manages the technical and administrative side of architectural projects. We prepare required drawings and documents, liaise with local authorities, and guide clients through regulatory compliance to reduce delays and avoid costly mistakes.",
      url: `${BUSINESS_INFO.url}services/authority-submissions/`,
      serviceType: "Building Permit and Regulatory Submission",
      provider: { "@id": `${BUSINESS_INFO.url}#organization` },
      areaServed: [
        { "@type": "State", name: "Johor" },
        { "@type": "Country", name: "Malaysia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Authority Submission Services",
        itemListElement: [
          "Preparation of submission drawings",
          "Coordination with relevant consultants",
          "Building plan submission support",
          "Liaison with local authorities where required",
          "Compliance review based on project requirements",
          "Documentation for approval processes",
          "Guidance on regulatory requirements",
          "Follow-up and revision support when needed",
        ].map((step, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: step },
        })),
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS_INFO.url}services/` },
          { "@type": "ListItem", position: 3, name: "Authority Submissions", item: `${BUSINESS_INFO.url}services/authority-submissions/` },
        ],
      },
    },
  ],
});

// ─── 8. Passionate Craftsmanship（详情页）────────────────────────────────────
export const getPassionateCraftsmanshipSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
    },
    {
      "@type": "Service",
      "@id": `${BUSINESS_INFO.url}services/craftsmanship/`,
      name: "Passionate Craftsmanship",
      alternateName: "Design Detail and Quality Craftsmanship Architecture Malaysia",
      description:
        "A craftsmanship-driven approach that focuses on quality, precision, and thoughtful execution. Every line, material, joint, finish, and proportion is considered carefully — from how natural light enters a space to the practicality of built-in features and the overall finishing quality.",
      url: `${BUSINESS_INFO.url}services/craftsmanship/`,
      serviceType: "Architectural Craftsmanship and Design Quality",
      provider: { "@id": `${BUSINESS_INFO.url}#organization` },
      areaServed: [
        { "@type": "State", name: "Johor" },
        { "@type": "Country", name: "Malaysia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Craftsmanship Approach",
        itemListElement: [
          "Careful attention to design details",
          "Material and finishing consideration",
          "Practical design solutions",
          "Coordination between design intent and site execution",
          "Refinement of proportions, lines, and spatial experience",
          "Quality-focused thinking throughout the project",
          "A strong sense of responsibility toward the final outcome",
        ].map((step, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: step },
        })),
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS_INFO.url}services/` },
          { "@type": "ListItem", position: 3, name: "Passionate Craftsmanship", item: `${BUSINESS_INFO.url}services/craftsmanship/` },
        ],
      },
    },
  ],
});

// ─── 9. Contact ──────────────────────────────────────────────────────────────
export const getContactSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${BUSINESS_INFO.url}contact/`,
      url: `${BUSINESS_INFO.url}contact/`,
      name: "Contact HIDI Lau Architect",
      description:
        "Get in touch with HIDI Lau Architect for architectural and interior design inquiries in Johor Bahru.",
      mainEntity: {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}#organization`,
        ...BUSINESS_INFO,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+6016-7442330",
            contactType: "customer service",
            areaServed: "MY",
            availableLanguage: ["English", "Chinese", "Malay"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+607-3391199",
            contactType: "office",
          },
        ],
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS_INFO.url },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${BUSINESS_INFO.url}contact/` },
        ],
      },
    },
  ],
});

// ─── 10. Project List ────────────────────────────────────────────────────────
export const getProjectListSchema = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Architecture & Interior Design Portfolio",
      description:
        "Exquisite architectural and interior design projects by HIDI Lau Architect.",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BUSINESS_INFO.url}project/${project.id}`,
        name: project.title,
        image: project.cover,
      })),
    },
  ],
});

// ─── 11. Project Detail ──────────────────────────────────────────────────────
export const getProjectDetailSchema = (project: any) => {
  const allImages = [
    project.cover,
    ...(project.carouselImages || []),
    ...(project.images || []),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}#organization`,
        ...BUSINESS_INFO,
      },
      {
        "@type": "CreativeWork",
        "@id": `${BUSINESS_INFO.url}project/${project.id}/`,
        name: project.title,
        description:
          project.description ||
          `${project.title} — ${project.category} project by HIDI Lau Architect.`,
        url: `${BUSINESS_INFO.url}project/${project.id}`,
        image: allImages,
        genre: project.category,
        author: { "@id": `${BUSINESS_INFO.url}#organization` },
        locationCreated: {
          "@type": "Place",
          name: project.location || "Malaysia",
        },
        creator: {
          "@type": "Person",
          name: project.leadArchitect || "Ar. Hidi Lau Wei Lin",
        },
        ...(project.client && {
          provider: {
            "@type": "Organization",
            name: project.client,
          },
        }),
      },
    ],
  };
};

// ─── 12. Project（旧版，保留向后兼容）────────────────────────────────────────
export const getProjectSchema = (project: {
  title: string;
  description: string;
  image: string;
  path: string;
  location?: string;
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}#organization`,
      ...BUSINESS_INFO,
    },
    {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: project.image,
      url: `${BUSINESS_INFO.url}${project.path}/`,
      author: { "@id": `${BUSINESS_INFO.url}#organization` },
      locationCreated: {
        "@type": "Place",
        name: project.location || "Malaysia",
      },
    },
  ],
});