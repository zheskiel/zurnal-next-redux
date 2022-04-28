import Head from "next/head";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { SITE_URL: siteUrl } = publicRuntimeConfig;

function MetaHeader({ title = null, description = null, type = null }) {
  const ogImage = `${siteUrl}/img/idpelago-og.jpg`;

  let normalizedUrl;

  switch (type) {
    case "category":
      normalizedUrl = `${siteUrl}/category/${title}`;
      break;

    case "user":
      normalizedUrl = `${siteUrl}/user/${title}`;
      break;

    case "tag":
      normalizedUrl = `${siteUrl}/tag/${title}`;
      break;

    case "post":
      normalizedUrl = `${siteUrl}/post/${title}`;
      break;

    default:
      normalizedUrl = `${siteUrl}/`;
      break;
  }

  const normalizedTitle =
    title !== null
      ? `${title} | Zurnal`
      : "Zurnal | Entertain, Inspire & Educate";

  const normalizedDescription =
    description !== null ? `${description}` : "Entertain, Inspire & Educate";

  return (
    <Head>
      <title key="title">{normalizedTitle}</title>
      <meta key="og:title" property="og:title" content={normalizedTitle} />
      <meta
        key="twitter:title"
        name="twitter:title"
        content={normalizedTitle}
      />
      <meta property="og:url" content={normalizedUrl} />
      <meta name="author" content="Zurnal" />
      <meta name="description" content={normalizedDescription} />

      <meta name="twitter:site" content="@zurnal" />
      <meta name="twitter:creator" content="@zurnal" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={normalizedDescription} />

      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:description" content={normalizedDescription} />

      <link rel="canonical" href={normalizedUrl} />
    </Head>
  );
}

export default MetaHeader;
