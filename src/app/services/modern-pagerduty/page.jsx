"use client";

import Features from "./features";
import Hero from "./hero";
import IcebergSection from "./icebergSection";
import IncidentManagement from "./incidentManagement";
import LogoSection from "./marquee";
import Price from "./price";

export default function Page() {
    return (
        <div className="bg-[#121826] text-white pt-32">
            <Hero />
            <Features />
            <LogoSection />
            <IncidentManagement />
            <IcebergSection />
            <Price />
        </div>
    );
}
