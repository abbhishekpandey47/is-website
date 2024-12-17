import OrbitingCircles from "../ui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[440px] w-[900px] max-lg:w-[600px] bg-transparent flex-col items-center justify-center overflow-hidden rounded-lg border border-none max-sm:w-[350px]">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-6xl font-semibold flex justify-center leading-none text-transparent dark:from-white dark:to-black">
        <img className = "w-[75%]" src="./logodata/infra_logo_only.png" alt="infrasity-logo" />
      </span>

      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={65}
      >
        <img src="./communityIcons/devto.svg" alt="devto-logo" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={65}
      >
        <img src="./communityIcons/youtube.svg" alt="youtube-logo" />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={130}
        duration={20}
        reverse
      >
        <img src="./communityIcons/medium.svg" alt="medium-logo" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={130}
        duration={20}
        delay={20}
        reverse
      >
        <img src="./communityIcons/tumblr.svg" alt="tumblr-logo" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={195}
        duration={20}
        delay={15}
        reverse
      >
        <img src="./communityIcons/quora.svg" alt="quora-logo" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={195}
        duration={20}
        delay={25}
        reverse
      >
        <img src="./communityIcons/reddit.svg" alt="reddit-logo" />
      </OrbitingCircles>
    </div>
  );
}

