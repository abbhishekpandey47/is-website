import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL; 

export const initMixpanel = () => {
  if (typeof window !== "undefined" && !mixpanel.__initialized) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
    mixpanel.__initialized = true; 
  }
};

export default mixpanel;
