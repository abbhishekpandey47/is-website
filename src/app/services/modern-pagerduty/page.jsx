"use client";

import Features from "./features";
import Footer from "./footer";
import Hero from "./hero";
import IcebergSection from "./icebergSection";
import IncidentManagement from "./incidentManagement";
import LogoSection from "./marquee";
import Price from "./price";
import TestimonialsSection from "./testimonialsSection";

export default function Page() {
    return (
        <div className="bg-[#121826] text-white pt-32">
            <Hero />
            <Features />
            <LogoSection />
            <IncidentManagement />
            <IcebergSection />
            <Price />
            <TestimonialsSection />
            <LogoSection show={true} />
            <Footer />
        </div>
    );
}
