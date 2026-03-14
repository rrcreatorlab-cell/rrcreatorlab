import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

const defaults = {
  title: "RR Creator Lab | Building Creators. Scaling Reach.",
  description:
    "RR Creator Lab is a content growth and social media management studio helping creators and brands grow on YouTube and Instagram through strategy, consistency, and optimized execution.",
  image:
    "https://storage.googleapis.com/gpt-engineer-file-uploads/SHZSuefk03WkGhYX1k0Fe7dGoeP2/social-images/social-1767000571024-ChatGPT Image Dec 28, 2025, 05_18_23 PM.png",
  siteUrl: "https://rrcreatorlab.com",
};

const SEO = ({
  title,
  description = defaults.description,
  canonical,
  type = "website",
  image = defaults.image,
  noindex = false,
}: SEOProps) => {
  const fullTitle = title
    ? `${title} | RR Creator Lab`
    : defaults.title;
  const url = canonical
    ? `${defaults.siteUrl}${canonical}`
    : defaults.siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="RR Creator Lab" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
