import Home from "./Componets/home";
import SecondSection from "./Componets/secondSection";
import ThirdSection from "./Componets/thirdSection";
import NewMarquee from "@/Components/NewMarquee.jsx";
import Testimonials from "./Componets/testimonial";
import IntegrationSection from "./Componets/integrationSection";

export default function LandingPage() {
	return (
		<main>
			<Home />
            <NewMarquee/>
			<SecondSection />
			<ThirdSection />
            <Testimonials />  
            <IntegrationSection />
		</main>
	);
}
