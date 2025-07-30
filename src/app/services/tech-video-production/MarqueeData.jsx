import Marquee from "../../../Components/ui/marquee";

const serviceArrHowWorks = [
  {
    id: "1",
    head: "In-Depth Understanding",
    para: "We begin by diving into your product to highlight key features like integration with developer tools. Video content simplifies the process, making it easier and quicker for users to follow along.",
  },
  {
    id: "2",
    head: "Hands-On Testing",
    para: "We conduct hands-on testing to showcase these features, ensuring that the demonstration is authentic and insightful.",
  },
  {
    id: "3",
    head: "Recording the Video",
    para: "A live demonstration is recorded, capturing the essence of your product in action.",
  },
  {
    id: "4",
    head: "Editorial Enhancements",
    para: "The recorded video is handed over to our editorial team, who adds necessary branding elements, logos, and engaging effects. Informative infographics are also incorporated to enhance clarity.",
  },
  {
    id: "5",
    head: "Final Distribution",
    para: "The polished video is then shared with the appropriate communities and channels to maximize its reach and engagement",
  },
];

const serviceArrHowWorks2 = [
  {
    id: "1",
    head: "Faceless Hands-On Showcase",
    para: "We start by recording a faceless demonstration highlighting your product's essential features.",
  },
  {
    id: "5",
    head: "Delivery for Publication",
    para: "The final video is delivered to you, ready for publication, and designed to capture your audience's attention.",
  },
  {
    id: "4",
    head: "Merging Content",
    para: "The AI-generated video is combined with our recorded content, providing a cohesive and comprehensive overview of your product.",
  },
  {
    id: "3",
    head: "AI Video Creation",
    para: "This write-up is input into an AI tool, generating a visually engaging video that complements the hands-on footage.",
  },
  {
    id: "2",
    head: "Technical Write-Up",
    para: "A detailed technical write-up is created based on the demonstration.",
  },
];

const firstRow = serviceArrHowWorks;
const secondRow = serviceArrHowWorks2;

const ServiceCard = ({ service }) => {
  return (
    <div className="border-[1.5px] border-white max-lg:p-4 p-8 rounded-md w-[350px] hover:shadow-purpleshadow duration-300 hover:bg-purpleImage cursor-pointer">
      <div className={`text-center flex flex-col gap-3 `}>
        <div className="max-lg:text-[3em] text-[4em] font-bold text-white">
          <p>{service.id}</p>
        </div>
        <div className="text-[1.2em] max-lg:text-[1em] quicksand-semibold text-white">
          <h2>{service.head}</h2>
        </div>
        <div>
          <p className="max-lg:text-[0.9em] text-[#CFCAC7]">{service.para}</p>
        </div>
      </div>
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <>
      <div className="relative flex h-[500px]  flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent w-[100vw]">
        <div className=" w-4/5 m-auto flex flex-col gap-4 max-sm:gap-2">
          <div className="w-full max-lg:text-[2em] text-center text-[3em] flex justify-center quicksand-semibold">
            <h2 className="text-white max-md:w-3/4 max-sm:text-[0.7em] max-sm:w-[93%]">
              Technical Videos Showcasing{" "}
              <span class="specialtext">Hands-On Use Cases</span>
            </h2>
          </div>
        </div>

        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((service) => (
            <ServiceCard service={service} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <div className="relative flex h-[500px] flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent top-10 w-[100vw]">
        <div className=" w-4/5 m-auto flex flex-col gap-4 max-sm:gap-2">
          <div className="w-full max-lg:text-[2em] text-center text-[3em] flex justify-center quicksand-semibold">
            <h1 className="text-white max-md:w-3/4 max-sm:text-[0.7em] max-sm:w-[93%]">
              AI-Generated Videos Enhanced with{" "}
              <span class="specialtext">Human Touch</span>
            </h1>
          </div>
        </div>

        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((service) => (
            <ServiceCard service={service} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </>
  );
}
