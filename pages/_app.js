import dynamic from "next/dynamic";
import Script from "next/script";

import { useEffect } from "react";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "../Components/Layout";

import { loadStylesheet, loadScript, isProduction } from "../utils/helpers";
import { GA_TRACKING } from "../utils/gtag";

import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "../styles/globals.scss";

const TopProgressBar = dynamic(() => import("../Components/TopProgressBar"), {
  ssr: false,
});

const renderComponent = (Children) => {
  if (process.browser) {
    const store = useStore((state) => state);

    return (
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        {Children}
      </PersistGate>
    );
  }

  return Children;
};

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const styles = [
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css",
    ];

    const scripts = [
      "https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6209f866f185a6e6",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6983942794145260",
    ];

    styles.map((style) => loadStylesheet(style));

    setTimeout(() => {
      scripts.map((script) => loadScript(false, script));
    }, 1000);
  }, []);

  const isProd = isProduction();
  const TrackScripts = (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING}`}
      />

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', ${GA_TRACKING}, {
                page_path: window.location.pathname,
            });
           `,
        }}
      />
    </>
  );

  const component = (
    <>
      {/* {isProd && <TrackScripts />} */}

      <TopProgressBar />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );

  return renderComponent(component);
};

export default wrapper.withRedux(App);
