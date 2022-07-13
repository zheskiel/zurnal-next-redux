import { isProduction } from "./helpers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const { GA_TRACKING } = publicRuntimeConfig;

// export const GTM_TRACKING_ID = process.env.PUBLIC_GTM_ID;

const isProd = isProduction();

export const pageEvent = (url) => {
  if (!isProd) return;

  const pageEvent = {
    event: "pageview",
    page: url,
  };

  window.gtag(pageEvent);

  return pageEvent;
};

// Sent directly to Google Analytics
export const sentPageView = (url) => {
  if (!isProd) return;

  if (typeof window.ga != "undefined") {
    ga("set", "page", url);
    ga("send", "pageview");
  }
};

// // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  console.log("*******************");
  console.log("log : ", url);
  console.log("isProd : ", isProd);
  console.log("*******************");

  if (!isProd) return;

  setTimeout(() => {
    window.gtag("config", GA_TRACKING, {
      page_path: url,
    });
  }, 2000);
};

// // https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!isProd) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
