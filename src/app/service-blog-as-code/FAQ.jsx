import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Components/ui/accordian";

import { ArrowRight } from 'lucide-react';



// FAQ data
const faqData = [
  {
    id: "1",
    question: "Question 1",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus "
  },
  {
    id: "2",
    question: "Question 2",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus "
  },
  {
    id: "3",
    question: "Question 3",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus "
  },
  {
    id: "4",
    question: "Question 4",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus"
  },
  {
    id: "5",
    question: "Question 5",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus"
  },
  {
    id: "6",
    question: "Question 6",
    answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In necessitatibus, deleniti dolores dolorum recusandae hic quod rerum consectetur numquam cumque tenetur minus placeat doloribus"
  }
];

const FAQSection = () => {
  return (
    <section className="w-full py-10 px-6 md:px-10 bg-white">
      <div className="w-full mx-auto md:w-full">
        <div className="flex max-md:flex-col sm:flex-col lg:flex-row justify-center gap-10 lg:gap-40">
          {/* Left column with heading and text */}
          <div className="lg:w-5/12 mb-10 lg:mb-0">
            <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-purple-800 text-center">FAQ</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-400 text-[#02113E] mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            
            <p className="text-lg text-gray-500 mb-8">
              Have a question that needs a human to answer? No problem.
            </p>
            
            <a 
              href="#contact"
              className="inline-flex items-center text-purple-600  transition-colors"
            >
              Speak to Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          {/* Right column with accordion FAQs */}
          <div className="w-full flex justify-center lg:w-5/12  ">
            <Accordion type="single" collapsible className="w-[80%] flex flex-col gap-3">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[1px] border-gray-200 rounded-[10px] hover:border-[2px]">
                  <AccordionTrigger className="py-6 px-6 text-left text-m text-[#02113E]  ">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 bg-gray-200 text-md  p-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
