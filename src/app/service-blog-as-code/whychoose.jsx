import React from 'react';

const WhyChooseInfrasity = () => {
  return (
    <section className="w-full pt-10 px-6 md:px-10 ">
      <div
                    className='w-full h-px bg-white/30 mb-16'
                ></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl quicksand-bold text-white mb-16 text-center">
        Why top engineering teams rely on Infrasity for content ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
          <div className="text-center p-4 border-r border-white/10 md:border-r border-white/10 last:border-r-0">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
              4000+
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
              Technical Content pieces<br />developed
            </p>
          </div>
          
          <div className="text-center p-4 border-r-0 md:border-r border-white/10 last:border-r-0">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
             70%
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
            Lower cost compared to building a full-time DevRel or content team <br />with
            </p>
          </div>

          <div className="text-center p-4">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
              50+
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
            Trusted by infra founders. Loved by engineering teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInfrasity;