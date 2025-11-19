import { GoogleAnalytics } from '@next/third-parties/google';
import * as Sentry from '@sentry/nextjs';
import Script from 'next/script';
import AlternateLinks from './AlternateLinks';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import './globals.css';
import { metadata } from './metadata';

export function generateMetadata() {
  return {
    ...metadata,
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export default function RootLayout({ children }) {
  return (
  <html lang='en' suppressHydrationWarning>
            <head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

                {/* Preload Google Fonts CSS and load asynchronously */}
        <link
          rel='preload'
          as='style'
          href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
        />
                <noscript>
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
                    />
                </noscript>
                <noscript>
                    <link rel='stylesheet' href='/globals.css' />
                </noscript>

                {/* If you are self-hosting Quicksand, preload the font files as well */}
                <link
                    rel='preload'
                    href='/fonts/Quicksand-Bold.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                />
                <link
                    rel='preload'
                    href='/fonts/Quicksand-Regular.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                />

                <link
                    href='https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap'
                    rel='stylesheet'
                />

                {/* Factors.ai tracker */}
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

                <Script id='reb2b-snippet' strategy='afterInteractive'>
                    {`
          !function () {
            var reb2b = window.reb2b = window.reb2b || [];
            if (reb2b.invoked) return;
            reb2b.invoked = true;
            reb2b.methods = ["identify", "collect"];
            reb2b.factory = function (method) {
              return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(method);
                reb2b.push(args);
                return reb2b;
              };
            };
            for (var i = 0; i < reb2b.methods.length; i++) {
              var key = reb2b.methods[i];
              reb2b[key] = reb2b.factory(key);
            }
            reb2b.load = function (key) {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/VN080HXMWP6J.js.gz";
              var first = document.getElementsByTagName("script")[0];
              first.parentNode.insertBefore(script, first);
            };
            reb2b.SNIPPET_VERSION = "1.0.1";
            reb2b.load("VN080HXMWP6J");
          }();
        `}
                </Script>

                <Script id='google-tag-manager' strategy='lazyOnload'>{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WGZGHXZS');
      `}</Script>

                <Script id='clarity-script' strategy='lazyOnload'>{`
        window.requestIdleCallback(() => {
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "rc3czxet7l");
        });
      `}</Script>
                {/* Apollo Tracker */}
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
                {/* Snitcher Tracker */}
            <Script id="snitcher-script" strategy="afterInteractive">
      {`
        !function(e){"use strict";
        var t=e&&e.namespace;
        if(t&&e.profileId&&e.cdn){
          var i=window[t];
          if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)
            if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");
            else{
              i._loaded=!0;
              ["track","page","identify","group","alias","ready","debug","on","off","once",
              "trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset",
              "register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware",
              "addDestinationMiddleware","giveCookieConsent"].forEach((function(e){
                var a;
                i[e]=(a=e,function(){
                  var e=window[t];
                  if(e.initialized)return e[a].apply(e,arguments);
                  var i=[].slice.call(arguments);
                  return i.unshift(a),e.push(i),e
                })
              }));
              -1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),
              i.bootstrap=function(){
                var t,i=document.createElement("script");
                i.async=!0,i.type="text/javascript",i.id="__radar__",
                i.setAttribute("data-settings",JSON.stringify(e)),
                i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");
                var a=document.scripts[0];
                a.parentNode.insertBefore(i,a)
              },
              i.bootstrap()
            }
        } else "undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")
        }({
          "apiEndpoint": "radar.snitcher.com",
          "cdn": "cdn.snitcher.com",
          "namespace": "Snitcher",
          "profileId": "8436381"
        });
      `}
    </Script>
              {/*leadFeeder Tracker*/}
       <Script id="leadfeeder-tracker" strategy="afterInteractive">
          {`(function(ss,ex){ 
              window.ldfdr = window.ldfdr || function(){ 
                  (ldfdr._q = ldfdr._q || []).push([].slice.call(arguments)); 
              }; 
              (function(d,s){ 
                  var fs = d.getElementsByTagName(s)[0]; 
                  function ce(src){ 
                      var cs = d.createElement(s); 
                      cs.src = src; 
                      cs.async = 1; 
                      fs.parentNode.insertBefore(cs, fs); 
                  }; 
                  ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); 
              })(document,'script'); 
          })('Xbp1oaElvlk4EdVj');`}
        </Script>

                <Script
                    src='https://assets.calendly.com/assets/external/widget.js'
                    strategy='lazyOnload'
                />
                <AlternateLinks />
            </head>
            <GoogleAnalytics gaId='G-G0BTN1FRWY' />
            <body className='antialiased'>
                <noscript>
                    <iframe
                        src='https://www.googletagmanager.com/ns.html?id=GTM-WGZGHXZS'
                        height='0'
                        width='0'
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </body>
        </html>
    );
}
