export default function SaasGlassyBoxes() {
  // First row boxes
  const firstRow = [
    {
      icon: "icon1",
      title: "Get a SaaS-specific expert team",
      description:
        "Unlike traditional agencies that produce videos for all kinds of industries, we only work with SaaS companies. There's no one-size-fits-all approach here.",
    },
    {
      icon: "icon2",
      title: "Launch new campaigns or refresh old ads",
      description:
        "Emotionally engage and convert your audience with eye-catching videos and GIFs, or refresh your campaigns with improved video ads.",
    },
    {
      icon: "icon3",
      title: "Video testing and experimentation",
      description:
        "Find out which video ad, messaging, product, or campaigns resonate the most with your audience by following a proven framework for A/B testing and experimentation.",
    },
  ];

  // Second row boxes
  const secondRow = [
    {
      icon: "icon4",
      title: "Manage everything in one place",
      description:
        "Get everything taken care of — from script and storyboarding to talent sourcing and production. We also look after music sourcing and licensing for you.",
    },
    {
      icon: "icon5",
      title: "Reduce efforts for your in-house team",
      description:
        "Produce videos with our professional motion graphics designer, senior copywriter, and creative director to help your internal team save time and prioritize what matters most.",
    },
  ];

  // Icons mapping using icon tags
  const getIcon = (iconName) => {
    const iconMap = {
      icon1:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336c6b18c45f5075d19cec6_experts.svg",
      icon2:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336be210025631469370345_social-ads-icon.svg",
      icon3:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336be1ff798eeb3cad3b6e2_video-ad-icon.svg",
      icon4:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336c6d2b2a17b201ab2bc4a_reporting.svg",
      icon5:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/5edfe73de8531a45bb827755_box-icon-2.svg",
    };

    return iconMap[iconName] || "/api/placeholder/24/24";
  };

  const GlassyBox = ({ title, description, icon }) => {
    return (
      <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20rem)] m-2">
        {/*background*/}
        <div
          className="rounded-2xl p-5 h-full relative overflow-hidden"
          style={{
            backgroundColor: "#141318",
            backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            border: "2px solid rgba(60, 63, 84, 0.3)",
          }}
        >
          {/* Icon */}
          <div className="bg-[#2d3142] rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
            <img
              src={getIcon(icon)}
              alt={`${icon} icon`}
              className="w-5 h-5 text-white"
            />
          </div>

          {/* Content */}
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1566px] mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-white text-lg md:text-xl">WHY INFRASITY?</h2>
        <p className="quicksand-bold text-3xl md:text-4xl text-white mb-2">
          We drive growth for your <br /> B2B SaaS {"  "}
          <span className="bg-gradient-to-r from-[#4a6bcd] via-[#6370c8] to-[#5566d1] bg-clip-text animate-gradient text-transparent">
            with video ads
          </span>
        </p>
      </div>
      <div
        className="py-12 relative"
        style={{
          background:
            "radial-gradient(circle at center, #1f2130 0%, #0e0e0e 70%)",
        }}
      >
        {/* First Row 3 boxes */}
        <div className="flex flex-wrap justify-center px-4 sm:px-6 max-w-7xl mx-auto">
          {firstRow.map((box, index) => (
            <GlassyBox
              key={`first-${index}`}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>

        {/* Second Row 2 boxes */}
        <div className="flex flex-wrap justify-center px-4 sm:px-6 mt-4 max-w-7xl mx-auto">
          {secondRow.map((box, index) => (
            <GlassyBox
              key={`second-${index}`}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
