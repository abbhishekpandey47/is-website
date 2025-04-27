export default function ClutchBadge() {
  const htmlString = `<script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script> <div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="14" data-height="50" data-nofollow="true" data-expandifr="true" data-scale="100" data-clutchcompany-id="2350194"></div>`;

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
