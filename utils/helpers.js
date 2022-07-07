import getConfig from "next/config";

import config from "../utils/config";
import watchIntersection from "../libs/intersection";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV, SITE_URL } = publicRuntimeConfig;

const baseUrl = SITE_URL;

/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const shouldTrack = (currentIp) => {
  let shouldTrack;
  let { blacklistedIps } = config;

  if (blacklistedIps.includes(currentIp)) {
    shouldTrack = false;
  } else {
    shouldTrack = true;
  }

  return shouldTrack;
};

export const isNumberKey = (evt) => {
  var charCode = evt.which ? evt.which : evt.keyCode;

  return !(charCode > 31 && (charCode < 48 || charCode > 57));
};

export const isProduction = () => {
  let env = APP_ENV;

  return env == "production";
};

export const isMobileView = (currentWidth) => {
  let minWidth = 679;
  let isMobileView = currentWidth < minWidth;

  return isMobileView;
};

export const ImgError = (source) => {
  source.target.onerror = null;
  source.target.style.display = "none";
};

export const detectRobot = (userAgent) => {
  const robots = new RegExp(
    [
      /bot/,
      /spider/,
      /crawl/, // GENERAL TERMS
      /APIs-Google/,
      /AdsBot/,
      /Googlebot/, // GOOGLE ROBOTS
      /mediapartners/,
      /Google Favicon/,
      /FeedFetcher/,
      /Google-Read-Aloud/,
      /DuplexWeb-Google/,
      /googleweblight/,
      /bing/,
      /yandex/,
      /baidu/,
      /duckduck/,
      /yahoo/, // OTHER ENGINES
      /ecosia/,
      /ia_archiver/,
      /facebook/,
      /instagram/,
      /pinterest/,
      /reddit/, // SOCIAL MEDIA
      /slack/,
      /twitter/,
      /whatsapp/,
      /youtube/,
      /semrush/, // OTHER
    ]
      .map((r) => r.source)
      .join("|"),
    "i"
  ); // BUILD REGEXP + "i" FLAG

  return robots.test(userAgent);
};

export const processThemeCookie = (req) => {
  const cookie = req.headers ? req.headers.cookie : null;
  const themeCookie = getHeaderCookie("theme", cookie);
  const theme = themeCookie !== null ? themeCookie : "light";

  return theme;
};

export const processSSR = async (userAgent, modelQuery, parameters) => {
  const response = {
    props: {},
  };

  // const isRobot = true;
  //   const isRobot = false;
  const isRobot = detectRobot(userAgent);

  if (!isRobot) {
    response.props = parameters;

    return response;
  }

  const { query } = parameters;
  const ssrData = await modelQuery(query);

  response.props = {
    ...parameters,
    ssrData,
    isRobot,
  };

  return response;
};

export const getHeaderCookie = (name, source) => {
  var nameEQ = name + "=";

  if (!source) return null;

  var ca = source.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export function loadScript(isSupport, src) {
  return new Promise((resolve) => {
    if (isSupport) {
      return resolve();
    }

    let dom = document.querySelector(`script[src="${src}"]`);

    if (dom) {
      const prevCallback = dom.onload ? dom.onload.bind(dom) : null;
      return (dom.onload = () => {
        if (prevCallback) {
          prevCallback();
        }
        resolve();
      });
    }

    let script = document.createElement("script");

    script.async = "async";
    script.src = src;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export function loadStylesheet(href) {
  return new Promise((resolve) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    document.head.appendChild(link);
  });
}

export const multiDimensionDedupe = (paramArray) => {
  return paramArray
    .map(JSON.stringify)
    .reverse()
    .filter(function (item, index, arr) {
      return arr.indexOf(item, index + 1) === -1;
    })
    .reverse()
    .map(JSON.parse);
};

export const multiDimensionalUnique = (arr) => {
  var uniques = [];
  var itemsFound = {};

  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);

    if (itemsFound[stringified]) {
      continue;
    }

    uniques.push(arr[i]);

    itemsFound[stringified] = true;
  }

  return uniques;
};

export const calculatePagination = (totalItems, currentPage, pageSize) => {
  const range = (start, end) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  const DOTS = "...";
  const siblingCount = 1;
  const totalPageCount = Math.ceil(totalItems / pageSize);
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 2 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 2 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

export const buildUrl = (url, parameters) => {
  var qs = "";

  for (var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }

  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }

  return url;
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lazyloadContentImages = () => {
  let target = document.getElementById("article"),
    entryContent = target?.getElementsByClassName("entry-content")[0],
    images = entryContent?.querySelectorAll("img");

  images.forEach((img) => {
    let dataSrc = img.getAttribute("data-src"),
      parent = img.parentNode,
      child;

    if (dataSrc !== null) {
      watchIntersection(parent, () => {
        child = parent.querySelector("img");

        child.removeAttribute("data-src");
        child.setAttribute("src", dataSrc);

        child.classList.add("show");
      });
    } else {
      child = parent.querySelector("img");
      child.classList.add("show");

      return;
    }
  });
};

let success = false;
let wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const retryOperation = (operation, delay, retries) => {
  return new Promise((resolve, reject) => {
    return operation()
      .then(resolve)
      .catch((reason) => {
        if (retries > 0 && !success) {
          return wait(delay)
            .then(retryOperation.bind(null, operation, delay, retries - 1))
            .then(resolve)
            .catch(reject);
        }
        return reject(reason);
      });
  });
};

export const LoadTwitterEmbed = () => {
  return new Promise((resolve, reject) => {
    let result = reject();

    if (window.twttr) {
      window.twttr.widgets.load();
      success = true;
      result = resolve();
    }

    return result;
  });
};
