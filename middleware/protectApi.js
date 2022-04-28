import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV, SITE_URL } = publicRuntimeConfig;

const protectApi = (handler) => {
  return async (req, res) => {
    if (
      APP_ENV == "production" &&
      (!req.headers.referer || new URL(req.headers.referer).origin !== SITE_URL)
    ) {
      return res.status(403).json({ success: false, message: `Forbidden` });
    }

    return handler(req, res);
  };
};

export default protectApi;
