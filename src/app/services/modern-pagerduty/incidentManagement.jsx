"use client";

import React from "react";

const IncidentManagement = () => {
  return (
    <section className="bg-[#121826] py-10">
        <div className="font-[quicksand] max-w-5xl flex items-center justify-center mx-auto">
      <div className="container mx-auto px-4">
        <div className="mt-16 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mt-6 xl:mt-20 md:w-1/3 md:max-w-[357px] mr-0 md:mr-16 text-center md:text-left">
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white">
              Incident management reimagined
            </h2>
            <p className="mt-3 text-lg text-gray-300">
              Get all the debug data you need and collaborate with your colleagues on
              fixing the root cause of the incident.
            </p>
            <p className="mt-10 text-gray-400">Replaces</p>
            <img
              src="https://betterstackcdn.com/assets/uptime/homepage/uptime-replaces-logos-a8728ab2d11187624068605a4b7c6d1a2da52f14fb363b1e1c7833f0210fd108.svg"
              alt="Replaces VictorOps, Pagerduty and OpsGenie"
              width={321}
              height={48}
              className="mt-1 mx-auto md:mx-0"
            />
          </div>

          <div className="flex justify-center">
            <img
              src="https://betterstackcdn.com/assets/uptime/incident-management/reimagined-illustration-0f7f42346d687ef3afcc539325986b90fc6ef17c24e497fe2362b3c75c17f34b.jpg"
              alt="Screenshot of Better Stack's incidents page"
              width={755}
              height={608}
              className="max-h-[610px] rounded-lg"
            />
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:justify-between items-center md:items-start md:space-x-5">
          {[
            {
              icon: "https://betterstackcdn.com/assets/uptime/incident-management/calendar-icon-47fb5255eb3a31dcfa9df0e98acd4263a1cd5b1102192bb4bde4b6f0d7ac487b.png",
              title: "On-call schedule calendar",
              text: "Alert the right people at the right time by configuring your team's on-call duty rotations.",
            },
            {
              icon: "https://betterstackcdn.com/assets/uptime/incident-management/escalations-icon-4c9bd006ba22e7d1e36824a9bf5d5919b992821c1309cc6f0391133d7b56da4b.png",
              title: "Flexible incident escalations",
              text: "Customize who gets notified based on the incident origin, severity, and context.",
            },
            {
              icon: "https://betterstackcdn.com/assets/uptime/incident-management/audit-timeline-icon-7b3a01045cdf004f3423349799732e64c31841f66ca56efd147967b920d0d19a.png",
              title: "Incident audit timeline",
              text: "See exactly how the incident developed and evolved and who got notified with our second-by-second incident timeline.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="mb-12 flex-1 flex flex-col items-center text-center max-w-[300px]"
            >
              <img src={item.icon} alt={item.title} width={46} height={46} />
              <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default IncidentManagement;
