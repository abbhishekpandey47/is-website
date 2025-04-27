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
          applyCustomStyles();
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

  const applyCustomStyles = () => {
    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 100);

    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 500);

    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 1500);
  };

  const makeBackgroundsTransparent = () => {
    const widgetContainer = document.querySelector(".clutch-widget");
    if (widgetContainer) {
      widgetContainer.style.backgroundColor = "transparent";

      const iframes = widgetContainer.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        try {
          if (iframe.contentDocument) {
            const iframeBody = iframe.contentDocument.body;
            if (iframeBody) {
              iframeBody.style.backgroundColor = "transparent";

              const iframeElements = iframeBody.querySelectorAll("*");
              iframeElements.forEach((el) => {
                const bgColor = window.getComputedStyle(el).backgroundColor;
                if (bgColor === "rgb(255, 255, 255)" || bgColor === "#ffffff") {
                  el.style.backgroundColor = "transparent";
                }
              });
            }
          }
        } catch (e) {
          console.log(
            "Could not access iframe content due to cross-origin policy"
          );
        }
      });

      const elements = widgetContainer.querySelectorAll("*");
      elements.forEach((el) => {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        if (bgColor === "rgb(255, 255, 255)" || bgColor === "#ffffff") {
          el.style.backgroundColor = "transparent";
        }

        if (
          el.style.backgroundColor === "white" ||
          el.style.backgroundColor === "#ffffff" ||
          el.style.backgroundColor === "rgb(255, 255, 255)"
        ) {
          el.style.backgroundColor = "transparent";
        }
      });
    }
  };

  return (
    <div
      className="w-[65%] clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="14"
      data-height="50"
      data-nofollow="true"
      data-expandifr="true"
      data-scale="100"
      data-clutchcompany-id="2350194"
    ></div>
  );
}
