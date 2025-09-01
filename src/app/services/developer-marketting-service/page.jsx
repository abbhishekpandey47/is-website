import Image from "next/image";
import Hero from "./hero";
import Card1 from "./card1";
import DashboardCards from "./DashboardCards";

export default function Page() {
    return (
        <div className="">
            <Hero />
            <Card1 />
            <DashboardCards />
        </div>
    )
}