export default function RedditLPLayout({ children }) {
  return (
    <>
      {/* Preload critical images for this page */}
      <link rel="preload" href="/fonts/quicksand-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/reddit/hyperwise.svg" as="image" fetchPriority="high" />
      <link rel="preload" href="/reddit/together.svg" as="image" fetchPriority="high" />
      <link rel="preload" href="/reddit/eclipse.svg" as="image" fetchPriority="high" />
      <link rel="preload" href="/reddit/freeAudit.svg" as="image" fetchPriority="high" />
      {children}
    </>
  );
}
