"use client";

import React from "react";

const IcebergSection = () => {
    const cards = [
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/screenshots-error-logs-066479a2bad198452364400f976ccb512277d31c464dcb13cd361929fe18b503.jpg",
            title: "Screenshots & error logs",
            text: "We don't just tell you that your service went down. We also tell you why.",
        },
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/incident-audit-illustration-5b1cc9fd4c17d51e336dd27459915898a409e2ab2e445ca62a038c0fe247da1d.jpg",
            title: "Incident audit timeline",
            text: "Get second-by-second timeline for every incident with detailed information about what happened and who got alerted.",
        },
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/ping-ssl-illustration-f30f55a64448c9eb8c6a688bf3966dc5f44933983ef79d5d65b5cdf3e8feff20.jpg",
            title: "Ping, SSL & TLD expiration",
            text: "The most commonly used monitors come built-in and can be configured in a few seconds.",
        },
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/group-incidents-illustration-c5faafe74bec7f96a6a0302d967c7bafc0b6b142e7c2dcd8451d25d5ddc871ab.jpg",
            title: "Smart incident merging",
            text: "30 incidents get created at the same time? Acknowledge them with a single tap and keep your phone from ringing while fixing the issue.",
        },
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/integrations-illustration-92e20acd97378310b2e7888a338147a5eb82c4a408a70367a2e482374144e10e.jpg",
            title: "Integrate everything",
            text: "Plug in the services across all levels of your stack and get up and running in minutes, not days.",
        },
        {
            img: "https://betterstackcdn.com/assets/uptime/iceberg/cron-illustration-af95a586e6eb266b64e4a0783a8eb96a9b48b471150a59edfa2f30e6e5c76a7e.jpg",
            title: "Cron job monitoring",
            text: "Never lose a DB backup! Track your CRON jobs and serverless workers. Get alerted if they don't run correctly.",
        },
    ];

    return (
        <section className="pb-20  container mx-auto px-4">
            <div className="font-[quicksand] max-w-4xl flex items-center justify-center mx-auto">
                <div>
                    <div className="flex justify-center xl:justify-start">
                        <h3 className="text-3xl md:text-4xl font-bold text-white w-full max-w-[777px] leading-snug">
                            That's just the tip
                            <br />
                            of the iceberg
                        </h3>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl overflow-hidden bg-[#1A202F] flex flex-col"
                            >
                                <div className="w-full h-full">
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="px-8 py-6 flex flex-col flex-grow">
                                    <h4 className="text-xl text-white font-bold">{card.title}</h4>
                                    <p className="mt-2 text-[#939db8]">{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IcebergSection;
