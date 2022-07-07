import Head from "next/head";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { SITE_URL: siteUrl } = publicRuntimeConfig;

function MetaHeader({ title = null, description = null, type = null }) {
  const ogImage = `${siteUrl}/img/idpelago-og.jpg`;

  let normalizedUrl =
    type !== "index" ? `${siteUrl}/${type}/${title}` : `${siteUrl}/`;

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
