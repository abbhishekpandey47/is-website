import { useState } from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const [showMore, setShowMore] = useState(false);

  const testimonials = [
    {
      id: 1,
      text: "Looking for a status page? I recommend @BetterUptime. Perfect support, answered my dms in a couple of minutes, and it's the first actual cool looking status page which allows custom domains (on the free plan 😱) haven't actually tried it, but it looks good so far.\n\n#NotSponsor",
      author: {
        name: "NeverLand",
        handle: "@neverlandoff",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/neverland-avatar-80c60b1eade2943a06a5f3382344974a1acca459273086bd03737d02d5afc3b6.png"
      },
      url: "https://twitter.com/neverlandoff/status/1444299269872267266"
    },
    {
      id: 2,
      text: "I tested @BetterUptime for @gamubsapp! So much easier to configure and the interface is better than @FreshworksInc!",
      author: {
        name: "Quentin",
        handle: "@qlaffont",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/quentin-avatar-f39f38efd1a611395d5b29222c9b8d4420f33139d58ad9d0fe82e94eb86e8681.png"
      },
      url: "https://twitter.com/qlaffont/status/1442463552007147527"
    },
    {
      id: 3,
      text: "By far @BetterUptime has given me more pleasant surprises other tool in this space. We had an outage due to a domain name expiring, and it turns out we can even be alerted about that. Great user experience and UI on top of all the features. How is it not more popular?",
      author: {
        name: "John",
        handle: "@johncjago",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/john-avatar-43aac54a7f895a9ea495884f8dd5a6d93232743e94d6f65b60bf4bcb57b4dbf0.png"
      },
      url: "https://twitter.com/johncjago/status/1462624489284513793"
    },
    {
      id: 4,
      text: "One year one tool. @linear won my heart last year. This year so far, @BetterStackHQ is the frontrunner, well designed 👏",
      author: {
        name: "Tianzhou",
        handle: "@tianzhouchen",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/tianzhou-avatar-d8824f50c99ac7f5516ac804ba6efe7192dc31512f5ff97e50751f6d37bf5f6a.png"
      },
      url: "https://twitter.com/tianzhouchen/status/1441046890502520835"
    },
    {
      id: 5,
      text: "I just checked this out, and have never been so happy that I saw an ad 👏",
      author: {
        name: "Chris",
        handle: "@chrishow",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/chrishow-avatar-2a7844797e7b3da49d8974c1875c680e9c76b1c74e732281fe26df771108d65c.png"
      },
      url: "https://twitter.com/chrislhow/status/1417794338130698240"
    },
    {
      id: 6,
      text: "We have now completely switched our status page to @BetterUptime — It's all automated, pages us on all incidents and looks fantastic. Sold. status.improvmx.com",
      author: {
        name: "ImprovMX",
        handle: "@ImprovMx",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/improvmx-avatar-87afab9df50a2e97ae04e72e45e5556ecdd48630ca5bbeaada80a43b675b6b81.png"
      },
      url: "https://twitter.com/ImprovMx/status/1484160652583260178"
    },
    {
      id: 7,
      text: "Switched from @Statuspage to @BetterUptime over the week end, looking pretty good status.speakbox.ca",
      author: {
        name: "Valentin Prugnaud 🦊",
        handle: "@valentinprgnd",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/valentin-avatar-fd2a535265cb0c4a83c78adcfc5da46eae9f73234d293e0f26d40f18e0fecfed.png"
      },
      url: "https://twitter.com/valentinprgnd/status/1435163698201464832"
    },
    {
      id: 8,
      text: "@BetterUptime status page looks SO neat! A fantastic tool for SaaS products like @Snapodcast",
      author: {
        name: "TonyHe",
        handle: "@ttttonyhe",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/tony-avatar-f3a24a84bcf9b4aad725db15474cdbeb093705e0aff66da6c3008d9b1517ea2d.png"
      },
      url: "https://twitter.com/ttttonyhe/status/1433488160294678529"
    },
    {
      id: 9,
      text: "I'm utterly blown away by @LogTailHQ and @BetterUptime! They do everything. I'm now monitoring one of our US servers for every kind of log Ubuntu creates, custom alerts for errors, website downtime, incident logging, Slack notifications, S3 log storage, and loads more. 😍",
      author: {
        name: "Darren Pinder",
        handle: "@dmpinder",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/darren-avatar-5c423c6aac2024286ea74814535213e1998aafe5322930ef8c5a35702edc8cc9.png"
      },
      url: "https://twitter.com/dmpinder/status/1446246301407105033"
    },
    {
      id: 10,
      text: "We have set up a shiny system status page. Check it out status.ghostfol.io",
      author: {
        name: "Ghostfolio",
        handle: "@ghostfolio_",
        avatar: "https://betterstackcdn.com/assets/betterstack/twitter/ghostfolio-avatar-53072d1aed3573cce2427128cf4241544a04c0429b71b57dfe2926b2408e9b74.png"
      },
      url: "https://twitter.com/ghostfolio_/status/1429071692886913030"
    }
  ];

  const renderTestimonialText = (text) => {
    // Replace @mentions with styled links
    return text.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-purple-400">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const visibleTestimonials = showMore 
    ? testimonials 
    : testimonials.slice(0, 5); // Show first 5 on mobile when collapsed

  return (
    <section className="container mx-auto pt-20 sm:mb-0">
         <div className="font-[quicksand] max-w-5xl flex items-center justify-center mx-auto">
                <div>
      <div className="flex flex-col items-center text-center px-4">
        <h4 className="text-2xl font-bold text-white">
          Don't just take our word for it
        </h4>
        <p className="lg:text-xl mt-3 max-w-[574px] text-[#939db8]">
          We're proud to be working with these incredible companies, and thankful 
          for their feedback, suggestions, and support.
        </p>
      </div>

      {/* Desktop Layout - 2-3-3-2 distribution */}
      <div className="mt-10 hidden lg:grid lg:grid-cols-4 gap-4">
        {/* Left column - 2 testimonials */}
        <div className="space-y-1">
          {testimonials.slice(0, 2).map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              renderText={renderTestimonialText}
            />
          ))}
        </div>
        
        {/* Middle Left column - 3 testimonials */}
        <div className="space-y-1">
          {testimonials.slice(2, 5).map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              renderText={renderTestimonialText}
            />
          ))}
        </div>
        
        {/* Middle Right column - 3 testimonials */}
        <div className="space-y-1">
          {testimonials.slice(5, 8).map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              renderText={renderTestimonialText}
            />
          ))}
        </div>
        
        {/* Right column - 2 testimonials */}
        <div className="space-y-1">
          {testimonials.slice(8, 10).map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              renderText={renderTestimonialText}
            />
          ))}
        </div>
      </div>

      {/* Mobile and Tablet Layout - Single column with show/hide */}
      <div className="mt-10 lg:hidden space-y-1">
        {visibleTestimonials.map((testimonial) => (
          <TestimonialCard 
            key={testimonial.id} 
            testimonial={testimonial}
            renderText={renderTestimonialText}
          />
        ))}
      </div>

      {/* Show More Button - Only visible on mobile and tablet */}
      {testimonials.length > 5 && (
        <div className="lg:hidden text-white mx-auto text-center -mt-16 bg-gray-900 relative z-10 max-w-[320px]">
          <div className="relative pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 top-[-400px]"></div>
          </div>
          <button 
            className="p-4 border-t border-gray-700 text-sm w-full flex items-center justify-center gap-2"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less' : 'Show more'}
            <svg 
              className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <div className="h-32"></div>
      </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, renderText }) => {
  const cardClasses = `
    break-inside-avoid mx-auto pb-4 max-w-[320px]
  `;

  return (
    <div className={cardClasses}>
      <div className="p-5 backdrop-blur-xl rounded-xl border bg-[#161825] border-[#282c3d]">
        <p className="text-[#939db8] text-[15px] leading-relaxed">
          {renderText(testimonial.text)}
        </p>
        
        <div className="mt-5"></div>
        
        <div      className="-m-5 p-5 flex items-start hover:bg-slate-700/30 transition-colors rounded-xl"
        >
          <Image
            src={testimonial.author.avatar}
            alt={`${testimonial.author.name} avatar`}
            width={37}
            height={37}
            className="mt-1 shrink-0 rounded-full"
          />
          <div className="mx-2 grow">
            <div className="font-bold text-white">
              {testimonial.author.name}
            </div>
            <div className="text-base text-gray-400">
              {testimonial.author.handle}
            </div>
          </div>
          <TwitterIcon />
        </div>
      </div>
    </div>
  );
};

const TwitterIcon = () => (
  <svg 
    width="22" 
    height="16" 
    className="mt-4 shrink-0 text-[#7d82ff] stroke-[#7d82ff]" 
    viewBox="0 0 24 24" 
    fill="#7d82ff"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export default TestimonialsSection;