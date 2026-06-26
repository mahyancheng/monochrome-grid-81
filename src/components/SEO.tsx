import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  schema?: object;  // ← 加这个
}

const SITE_URL = "https://hidilauarchitect.com";
const DEFAULT_IMAGE = "https://hidilauarchitect.com/assets/logo-CP_OYl3M.png";

const SEO = ({ title, description, path, image, type = "website", schema }: SEOProps) => {
  // Normalize: strip any leading/trailing slashes from the page-supplied path,
  // then build a single, canonical trailing-slash URL. Prevents "//" (when path
  // already ends in "/") and a missing slash (when it doesn't).
  const cleanPath = path ? path.replace(/^\/+|\/+$/g, "") : "";
  const url = cleanPath ? `${SITE_URL}/${cleanPath}/` : `${SITE_URL}/`;
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="HIDI LAU ARCHITECT" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;