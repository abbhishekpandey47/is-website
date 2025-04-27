import { useEffect } from "react";

export default function ClutchBadge() {
  useEffect(() => {
    const loadWidget = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://widget.clutch.co/static/js/widget.js";
      script.async = true;
      script.onload = () => {
        if (window.CLUTCHCO) {
          window.CLUTCHCO.Init();
        }
      };
      document.body.appendChild(script);
    };
    loadWidget();

    const handleRouteChange = () => {
      loadWidget();
    };

    window.addEventListener("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div
      className="clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="1"
      data-height="40"
      data-nofollow="true"
      data-expandifr="true"
      data-clutchcompany-id="2350194"
    ></div>
  );
}
