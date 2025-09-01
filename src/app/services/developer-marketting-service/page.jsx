import Image from "next/image";
import Hero from "./hero";
import Card1 from "./card1";
import DashboardCards from "./DashboardCards";
import FeatureComparison from "./FeatureComparison";
import Card2 from "./card2";

export default function Page() {
    return (
        <div className="">
            <Hero />
            <Card1 />
            <Card2 />
            <FeatureComparison />
            
        </div>
    )
}