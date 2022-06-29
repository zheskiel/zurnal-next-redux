import dynamic from "next/dynamic";

import { useEffect } from "react";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "../Components/Layout";

import { loadStylesheet, loadScript } from "../utils/helpers";

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
      'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6209f866f185a6e6',
    ];

    styles.map((style) => loadStylesheet(style));

    setTimeout(() => {
      scripts.map((script) => loadScript(false, script));
    }, 1000)
  }, []);

  const component = (
    <>
      <TopProgressBar />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );

  return renderComponent(component);
};

export default wrapper.withRedux(App);
