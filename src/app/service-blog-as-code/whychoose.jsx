import React from 'react';

const WhyChooseInfrasity = () => {
  return (
    <section className="w-full py-20 px-6 md:px-10 bg-[#080124]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl quicksand-bold text-white mb-16 text-center">
          Why choose Infarsity for your blog?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
          <div className="text-center p-4 border-r border-white/10 md:border-r border-white/10 last:border-r-0">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
              150K+
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
              Content pieces<br />delivered
            </p>
          </div>
          
          <div className="text-center p-4 border-r-0 md:border-r border-white/10 last:border-r-0">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
              2500+
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
              Brands we have worked<br />with
            </p>
          </div>

          <div className="text-center p-4">
            <h3 className="text-5xl md:text-6xl lg:text-7xl quicksand-bold text-white mb-4">
              150K+
            </h3>
            <p className="text-white/80 text-lg quicksand-medium">
              Strong creator network
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInfrasity;