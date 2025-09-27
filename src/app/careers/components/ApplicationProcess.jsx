"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Send, 
  MessageCircle, 
  Users, 
  CheckCircle, 
  Clock,
  ArrowRight,
  FileText,
  Calendar,
  Handshake
} from "lucide-react";
import CalendarBooking from "../../calendarButton";

gsap.registerPlugin(ScrollTrigger);

const ApplicationProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".process-arrow",
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    {
      step: 1,
      icon: Send,
      title: "Apply Online",
      description: "Submit your application through our simple online form. No resume required - just tell us about yourself and your experience.",
      duration: "5 minutes",
      details: [
        "Fill out our application form",
        "Answer a few questions about your background",
        "Upload your portfolio or GitHub profile",
        "Tell us why you want to join Infrasity"
      ]
    },
    {
      step: 2,
      icon: MessageCircle,
      title: "Initial Screening",
      description: "We'll review your application and reach out within 48 hours to schedule a brief initial conversation.",
      duration: "30 minutes",
      details: [
        "Phone or video call with our team",
        "Discuss your background and interests",
        "Learn more about the role and company",
        "Answer any questions you might have"
      ]
    },
    {
      step: 3,
      icon: FileText,
      title: "Technical Assessment",
      description: "Complete a practical assessment that reflects the actual work you'll be doing. No whiteboard coding!",
      duration: "2-4 hours",
      details: [
        "Real-world project or case study",
        "Work at your own pace",
        "Use your preferred tools and environment",
        "Focus on problem-solving, not memorization"
      ]
    },
    {
      step: 4,
      icon: Users,
      title: "Team Interview",
      description: "Meet with your potential teammates and managers to discuss collaboration, culture fit, and mutual expectations.",
      duration: "1 hour",
      details: [
        "Meet your future team members",
        "Discuss team dynamics and collaboration",
        "Learn about day-to-day responsibilities",
        "Ask questions about company culture"
      ]
    },
    {
      step: 5,
      icon: Handshake,
      title: "Final Decision",
      description: "We'll make our decision within 48 hours and extend an offer if we're a good mutual fit.",
      duration: "24-48 hours",
      details: [
        "Receive our decision quickly",
        "Discuss compensation and benefits",
        "Review offer details and timeline",
        "Welcome to the Infrasity team!"
      ]
    }
  ];


  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Our Application Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've designed a straightforward, respectful process that focuses on your skills 
            and potential rather than traditional resume screening.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-approved" />
          
          <div className="space-y-16 lg:space-y-24">
            {processSteps.map((step, index) => (
              <div key={step.step} className="process-step">
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Step Content */}
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Step {step.step}</div>
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-approved mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Arrow (Desktop) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block process-arrow absolute top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* CTA Section */}
        <div className="process-step mt-20 text-center">
          <div className="bg-gradient-to-r from-[#5F64FF] to-[#7F8CFF] rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our team and help us build the future of developer marketing. 
              We can't wait to meet you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="px-8 py-4 bg-white text-[#5F64FF] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Apply Now
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

export default ApplicationProcess;
