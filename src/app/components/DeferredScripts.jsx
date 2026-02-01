"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const interactionEvents = ["scroll", "click", "keydown", "pointerdown", "touchstart"];

export default function DeferredScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const activate = () => setReady(true);

    interactionEvents.forEach((event) => {
      globalThis.addEventListener(event, activate, { once: true, passive: true });
    });

    // Increase timeout to 4500ms to give page more time to render critical content first
    const timer = globalThis.setTimeout(activate, 4500);

    return () => {
      interactionEvents.forEach((event) => {
        globalThis.removeEventListener(event, activate);
      });
      globalThis.clearTimeout(timer);
    };
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <Script id="factors-analytics" strategy="afterInteractive">
        {`
            window.faitracker = window.faitracker || function(){
              this.q=[];
              var t=new CustomEvent("FAITRACKER_QUEUED_EVENT");
              return this.init=function(t,e,a){
                this.TOKEN=t,this.INIT_PARAMS=e,this.INIT_CALLBACK=a,
                window.dispatchEvent(new CustomEvent("FAITRACKER_INIT_EVENT"))
              },
              this.call=function(){
                var e={k:"",a:[]};
                if(arguments&&arguments.length>=1){
                  for(var a=1;a<arguments.length;a++)e.a.push(arguments[a]);
                  e.k=arguments[0]
                }
                this.q.push(e),window.dispatchEvent(t)
              },
              this.message=function(){
                window.addEventListener("message",function(t){
                  if("faitracker"===t.data.origin){
                    this.call("message",t.data.type,t.data.message)
                  }
                })
              },
              this.message(),
              this.init("1ykmwtoj7xhjphvpft3b3hfqynnfl1dx",{host:"https://api.factors.ai"}),
              this
            }(),
            function(){
              var t=document.createElement("script");
              t.type="text/javascript",
              t.src="https://app.factors.ai/assets/factors.js",
              t.async=!0,
              (d=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,d)
            }();
          `}
      </Script>

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGZGHXZS');
          `}
      </Script>

      <Script id="clarity-script" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/rc3czxet7l";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rc3czxet7l");
          `}
      </Script>

      <Script id="apollo-tracker" strategy="afterInteractive">
        {`
            (function initApollo() {
              var n = Math.random().toString(36).substring(7);
              var o = document.createElement("script");
              o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
              o.async = true;
              o.defer = true;
              o.onload = function () {
                if (window.trackingFunctions && window.trackingFunctions.onLoad) {
                  window.trackingFunctions.onLoad({ appId: "663b5ebd5922fc02eac8a429" });
                } else {
                  console.error("Apollo trackingFunctions not found.");
                }
              };
              document.head.appendChild(o);
            })();
          `}
      </Script>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
