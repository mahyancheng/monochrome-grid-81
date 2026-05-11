// src/utils/schema.ts
import { Project } from "@/data/projects"; // 确保路径正确
// 1. 定义基础的公司信息（单一样本源）
export const BUSINESS_INFO = {
  name: "HIDI Lau Architect",
  url: "https://hidilauarchitect.com/",
  logo: "https://hidilauarchitect.com/assets/logo-CP_OYl3M.png",
  address: {
    "@type": "PostalAddress",
    "streetAddress": "1, Jalan Biru 2, Taman Pelangi",
    "addressLocality": "Johor Bahru",
    "addressRegion": "Johor",
    "postalCode": "80400",
    "addressCountry": "MY"
  }
};
  
  // 2. 生成首页 Schema 的函数
  export const getHomeSchema = () => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BUSINESS_INFO.url}/#website`,
        "url": `${BUSINESS_INFO.url}/`,
        "name": "HIDI Lau Architect", // 强制 Google 识别这个名字
        "alternateName": ["HIDI Lau", "Hidi Lau Architect"],
        "publisher": { "@id": `${BUSINESS_INFO.url}/#organization` }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#organization`,
        ...BUSINESS_INFO,
        "url": `${BUSINESS_INFO.url}/` // 建议统一带上结尾斜杠
      }
    ]
  });
  
  // 3. 生成项目详情页 Schema 的函数 (支持动态关联)
  export const getProjectSchema = (project: { title: string; description: string; image: string; path: string; location?: string }) => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#organization`,
        ...BUSINESS_INFO
      },
      {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "image": project.image,
        "url": `${BUSINESS_INFO.url}${project.path}/`,
        "author": { "@id": `${BUSINESS_INFO.url}/#organization` },
        "locationCreated": {
          "@type": "Place",
          "name": project.location || "Malaysia"
        }
      }
    ]
  });

//About Us
  export const getAboutSchema = () => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${BUSINESS_INFO.url}/about/`,
        "url": `${BUSINESS_INFO.url}/about/`,
        "name": "About HIDI Lau Architect",
        "description": "Learn more about Ar. Hidi Lau Wei Lin and the philosophy of HIDI Lau Architect.",
        "mainEntity": {
          "@type": "Person",
          "name": "Ar. Hidi Lau Wei Lin",
          "jobTitle": "Principal Architect",
          "affiliation": {
            "@type": "LocalBusiness",
            "name": BUSINESS_INFO.name,
            "address": BUSINESS_INFO.address
          },
          "description": "Ar. Hidi Lau Wei Lin is a practicing Architect registered with Lembaga Arkitek Malaysia (LAM). She specialized in contemporary luxury homes and tropical resorts.",
          "alumniOf": [
            {
              "@type": "CollegeOrUniversity",
              "name": "University of Melbourne"
            },
            {
              "@type": "CollegeOrUniversity",
              "name": "University of Western Australia"
            }
          ],
          "award": "PAM Silver Award (2019) - Commercial Low Rise Category",
          "memberOf": [
            {
              "@type": "Organization",
              "name": "Pertubuhan Akitek Malaysia (PAM)"
            },
            {
              "@type": "Organization",
              "name": "Lembaga Arkitek Malaysia (LAM)"
            }
          ]
        }
      }
    ]
  });

//Services
export const getServicesSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BUSINESS_INFO.url}/services/`,
      "url": `${BUSINESS_INFO.url}/services/`,
      "name": "Architectural and Interior Design Services | HIDI Lau Architect",
      "description": "Comprehensive architectural solutions, interior design, authority submissions and passionate craftsmanship in Johor Bahru.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Services" }
        ]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}/#organization`,
      ...BUSINESS_INFO,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Professional Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Architectural Design",
              "description": "Comprehensive architectural solutions from concept to completion, blending form and function."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Interior Design",
              "description": "Crafting refined interiors that reflect your lifestyle with meticulous attention to detail."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Authority Submissions",
              "description": "Professional handling of all regulatory submissions and approvals for seamless project delivery."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Passionate Craftsmanship",
              "description": "Every element is carefully selected and crafted to achieve absolute perfection."
            }
          }
        ]
      }
    }
  ]
});


//Contact
export const getContactSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${BUSINESS_INFO.url}/contact/`,
      "url": `${BUSINESS_INFO.url}/contact/`,
      "name": "Contact HIDI Lau Architect",
      "description": "Get in touch with HIDI Lau Architect for architectural and interior design inquiries in Johor Bahru.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#organization`,
        ...BUSINESS_INFO,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+6016-7442330",
            "contactType": "customer service",
            "areaServed": "MY",
            "availableLanguage": ["English", "Chinese", "Malay"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+607-3391199",
            "contactType": "office"
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Contact" }
        ]
      }
    }
  ]
});

export const getProjectListSchema = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "name": "Architecture & Interior Design Portfolio",
      "description": "Exquisite architectural and interior design projects by HIDI Lau Architect.",
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${BUSINESS_INFO.url}/project/${project.id}`,
        "name": project.title,
        "image": project.cover
      }))
    }
  ]
});

/**
 * 2. 生成单个项目详情页 Schema (CreativeWork)
 * 用于提升特定项目的搜索排名，例如有人搜 "Ritz Carlton Langkawi Architect" 时。
 */
export const getProjectDetailSchema = (project: any) => {
  // 合并所有图片以供 Google 图片搜索抓取
  const allImages = [
    project.cover,
    ...(project.carouselImages || []),
    ...(project.images || [])
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#organization`,
        ...BUSINESS_INFO
      },
      {
        "@type": "CreativeWork",
        "@id": `${BUSINESS_INFO.url}/project/${project.id}/`,
        "name": project.title,
        "description": project.description || `${project.title} — ${project.category} project by HIDI Lau Architect.`,
        "url": `${BUSINESS_INFO.url}/project/${project.id}`,
        "image": allImages,
        "genre": project.category,
        "author": { "@id": `${BUSINESS_INFO.url}/#organization` },
        "locationCreated": {
          "@type": "Place",
          "name": project.location || "Malaysia"
        },
        // 关键资历：将项目关联到首席建筑师
        "creator": {
          "@type": "Person",
          "name": project.leadArchitect || "Ar. Hidi Lau Wei Lin"
        },
        ...(project.client && {
          "provider": {
            "@type": "Organization",
            "name": project.client
          }
        })
      }
    ]
  };
};