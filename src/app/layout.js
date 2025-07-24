import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import './globals.css';
import { metadata } from './metadata';
import AlternateLinks from './AlternateLinks';

export { metadata };

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

                {/* Preload Google Fonts CSS and load asynchronously */}
                <link
                    rel='preload'
                    as='style'
                    href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
                    onLoad="this.onload=null;this.rel='stylesheet'"
                />
                <noscript>
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
                    />
                </noscript>

                {/* Preload main CSS if possible (adjust path if needed) */}
                <link
                    rel='preload'
                    as='style'
                    href='/src/app/globals.css'
                    onLoad="this.onload=null;this.rel='stylesheet'"
                />
                <noscript>
                    <link rel='stylesheet' href='/globals.css' />
                </noscript>

                {/* If you are self-hosting Quicksand, preload the font files as well */}
                <link
                    rel='preload'
                    href='/src/app/fonts/Quicksand-Bold.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                />
                <link
                    rel='preload'
                    href='/src/app/fonts/Quicksand-Regular.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                />

                <Script id="reb2b-script" strategy="afterInteractive">
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
        script.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/0NW1GHLXJDO4.js.gz";
        var first = document.getElementsByTagName("script")[0];
        first.parentNode.insertBefore(script, first);
      };
      reb2b.SNIPPET_VERSION = "1.0.1";
      reb2b.load("0NW1GHLXJDO4");
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
