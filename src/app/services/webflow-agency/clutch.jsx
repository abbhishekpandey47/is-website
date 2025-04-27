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
          // Apply custom styles after the widget loads
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
    // Initial attempt with a short delay
    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 100);

    // Second attempt with a longer delay to ensure widget is fully rendered
    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 500);

    // Final attempt with an even longer delay
    setTimeout(() => {
      makeBackgroundsTransparent();
    }, 1500);
  };

  const makeBackgroundsTransparent = () => {
    const widgetContainer = document.querySelector(".clutch-widget");
    if (widgetContainer) {
      // Make the container background transparent
      widgetContainer.style.backgroundColor = "transparent";

      // Apply to all iframes inside the widget
      const iframes = widgetContainer.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        // Try to access the iframe content if from same origin
        try {
          if (iframe.contentDocument) {
            const iframeBody = iframe.contentDocument.body;
            if (iframeBody) {
              iframeBody.style.backgroundColor = "transparent";

              // Apply to all elements in the iframe
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
          // Cross-origin restrictions may prevent access to iframe content
          console.log(
            "Could not access iframe content due to cross-origin policy"
          );
        }
      });

      // Apply to all elements in the widget
      const elements = widgetContainer.querySelectorAll("*");
      elements.forEach((el) => {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        if (bgColor === "rgb(255, 255, 255)" || bgColor === "#ffffff") {
          el.style.backgroundColor = "transparent";
        }

        // Also handle any inline background styles
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
      className="lg:w-[37%] clutch-widget"
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
