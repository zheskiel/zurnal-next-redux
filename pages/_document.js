import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { processThemeCookie } from "../utils/helpers";

import Script from "next/script";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    let theme = "light";

    if (ctx.req && ctx.req.headers.cookie) {
      theme = processThemeCookie(ctx.req);
    }

    return { ...initialProps, theme };
  }

  render() {
    let date = new Date();
    let year = date.getFullYear();

    return (
      <Html lang="en" translate="no">
        <Head>
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="google-site-verification"
            content="nJt6gwBgHkE7LfyPHtHzwrjsKftGQS31wRwFoFWFSIU"
          />
          <meta
            name="facebook-domain-verification"
            content="8lzihur4ozv1i67e90auodkla99y69"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Zurnal.co" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="address=no" />
          <meta name="format-detection" content="email=no" />
          <meta httpEquiv="Cache-Control" content="no-siteapp" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="Copyright"
            content={`@${year} Zurnal.co All Rights Reserved.`}
          />
          <meta property="fb:app_id" content="396954390897339" />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:type" content="website" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="https://www.zurnal.co/images/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="https://www.zurnal.co/images/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://www.zurnal.co/images/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="https://www.zurnal.co/images/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="https://www.zurnal.co/images/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://www.zurnal.co/images/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="https://www.zurnal.co/images/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://www.zurnal.co/images/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://www.zurnal.co/images/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="https://www.zurnal.co/images/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://www.zurnal.co/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="https://www.zurnal.co/images/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://www.zurnal.co/images/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="https://www.zurnal.co/images/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff"></meta>
          <link rel="mask-icon" href="" color="#5bbad5" />
          <link rel="dns-prefetch" href="//ajax.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//partner.gooleadservices.com" />
          <link rel="dns-prefetch" href="//google.com.tw" />
          <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
          <link rel="dns-prefetch" href="//google-analytics.com" />
          <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
          <link rel="dns-prefetch" href="//pubads.g.doubleclick.net" />
          <link rel="dns-prefetch" href="//graph.facebook.com" />
          <link rel="dns-prefetch" href="//facebook.com" />
          <link rel="dns-prefetch" href="//connect.facebook.net" />

          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6983942794145260"
            strategy="lazyOnload"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
