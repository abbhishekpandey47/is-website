import Image from "next/image";
import Hero from "./hero";
import Card1 from "./card1";
import FeatureComparison from "./FeatureComparison";
import Card2 from "./card2";
import CTA from "./cta";

export default function Page() {
    return (
        <div className="">
            <Hero />
            <Card1 />
            <Card2 />
            <FeatureComparison />
            <CTA />
        </div>
    )
}