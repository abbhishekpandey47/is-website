"use client";

import session from "../../../utils/session";

export default function CompetitorHeader(props) {
  session.set('headerState', props.state);

  return (
    <header className="flex flex-col gap-1 p-6 pb-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        Competitor / Brand Analysis <span className="text-2xl">📊</span>
      </h1>
      <p className="text-sm text-gray-600 max-w-2xl">
        Explore recent Reddit posts & comments that mention a company, product or brand. Enter a brand name or domain to preview. Backend wiring & real data integration will come next.
      </p>
    </header>
  );
}
