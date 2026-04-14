import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

  const SITE_URL = "https://hidilauarchitect.com";
const DEFAULT_IMAGE = "https://hidilauarchitect.com/assets/logo-CP_OYl3M.png";

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HIDI Lau Architect",
  "url": SITE_URL,
  "logo": `${SITE_URL}/assets/logo-CP_OYl3M.png`,
  "description": "Multi-disciplinary architectural design studio in Johor Bahru, Malaysia. Architecture, interior design and passionate craftsmanship since 1989.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1, Jalan Biru 2, Taman Pelangi",
    "addressLocality": "Johor Bahru",
    "addressRegion": "Johor",
    "postalCode": "80400",
    "addressCountry": "MY"
  },
  "telephone": ["+6016-7442330", "+607-3391199"],
  "email": "hidilin@gmail.com",
  "sameAs": []
});

const SEO = ({ title, description, path, image, type = "website" }: SEOProps) => {
  const fullTitle = title;
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      <script type="application/ld+json">{organizationSchema}</script>
    </Helmet>
  );
};

export default SEO;
