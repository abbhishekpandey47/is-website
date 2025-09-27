"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  DollarSign, 
  Heart, 
  Home, 
  GraduationCap, 
  Plane, 
  Laptop,
  Shield,
  Clock,
  Users,
  Zap,
  Coffee,
  Gamepad2
} from "lucide-react";
import CalendarBooking from "../../calendarButton";

gsap.registerPlugin(ScrollTrigger);

const BenefitsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".benefit-category",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefitCategories = [
    {
      title: "Compensation & Equity",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
      benefits: [
        "Competitive salary based on market rates",
        "Equity participation in company growth",
        "Performance-based bonuses",
        "Annual salary reviews and adjustments"
      ]
    },
    {
      title: "Health & Wellness",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      benefits: [
        "Comprehensive health insurance (medical, dental, vision)",
        "Mental health support and counseling",
        "Gym membership or wellness stipend",
        "Flexible PTO and sick leave"
      ]
    },
    {
      title: "Work-Life Balance",
      icon: Home,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      benefits: [
        "100% remote work flexibility",
        "Flexible working hours",
        "Unlimited PTO policy",
        "Parental leave and family support"
      ]
    },
    {
      title: "Learning & Development",
      icon: GraduationCap,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      benefits: [
        "$3,000 annual learning budget",
        "Conference attendance and speaking opportunities",
        "Access to premium courses and certifications",
        "Internal knowledge sharing sessions"
      ]
    },
    {
      title: "Equipment & Tools",
      icon: Laptop,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      benefits: [
        "Top-tier laptop and equipment",
        "Home office setup allowance",
        "Latest software and tools",
        "High-speed internet reimbursement"
      ]
    },
    {
      title: "Team & Culture",
      icon: Users,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      benefits: [
        "Regular team retreats and events",
        "Virtual coffee chats and social hours",
        "Mentorship and career guidance",
        "Inclusive and diverse work environment"
      ]
    }
  ];

  const additionalBenefits = [
    {
      icon: Plane,
      title: "Travel Opportunities",
      description: "Attend conferences, meet clients, and explore new markets"
    },
    {
      icon: Shield,
      title: "Job Security",
      description: "Stable company with strong growth trajectory and funding"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you're most productive, not when the clock says"
    },
    {
      icon: Zap,
      title: "Fast Growth",
      description: "Rapid career advancement in a high-growth environment"
    },
    {
      icon: Coffee,
      title: "Coffee Culture",
      description: "Virtual coffee chats and team bonding activities"
    },
    {
      icon: Gamepad2,
      title: "Fun & Games",
      description: "Gaming sessions, team challenges, and virtual events"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            We're hiring!
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Want to help transform B2B support? We're growing fast and hiring across many roles. We would love to have you join the team in-person at our San Francisco office!
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefitCategories.map((category, index) => (
            <div key={index} className="benefit-category">
              <div className="bg-background border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="benefit-card">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                And So Much More
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Beyond the standard benefits, we offer unique perks that make working 
                at Infrasity truly special.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalBenefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="benefit-card mt-20">
          <div className="max-w-6xl mx-auto mx-6 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl p-16 text-center overflow-hidden bg-cover bg-no-repeat">
            <h3 className="text-2xl md:text-3xl font-bold text-white max-w-xl mb-6">
              Ready to join our team?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for 
              engineering excellence and developer advocacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center text-lg rounded-full bg-black px-8 py-4 text-white font-medium hover:bg-gray-900 transition"
              >
                View Open Positions
              </a>
              <CalendarBooking 
                buttonText="Book a Free Consultation" 
                width="w-52" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
