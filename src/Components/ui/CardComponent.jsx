import CardComponent from "./CardComponent";
import img1 from "../../app/services/webflow/images/css4.png";
import img2 from "../../app/services/webflow/images/css4.png";

const cards = [
  {
    image: img1 ,
    title: "Simple Pricing",
    desc: "We keep straightforward pricing based on what you opt for at our Webflow expert agency. Choose a way to work with us. No Contracts. Cancel anytime.",
  },
  {
    image: img1 ,
    title: "Quick Delivery",
    desc: "We as a Webflow Agency deliver full-fledged Webflow websites in just 2 weeks*. Our turnaround time for hourly work is just 2 days.",
  },
  {
    image: img1 ,
    title: "Certified Developers",
    desc: "We make sure that our developers have passed all Webflow certification tests on Webflow University.",
  },
  {
    image: img1 ,
    title: "Beautiful Interactions",
    desc: "We create simple and beautiful animations that improve the user's overall experience.",
  },
  {
    image: img1 ,
    title: "Responsive Design",
    desc: "We as a Webflow design agency ensure that all the designs we develop in Webflow have similar experiences across all devices.",
  },
  {
    image: img1 ,
    title: "Page Speed Optimization",
    desc: "We build a site with a clean structure so it won’t impact the page speed. As a Webflow development agency, we ensure that Google’s core web vitals are in green.",
  },
];

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
      {cards.map((card, index) => (
        <CardComponent
          key={index}
          image={card.image}
          title={card.title}
          desc={card.desc}
        />
      ))}
    </div>
  );
};

export default CardGrid;  