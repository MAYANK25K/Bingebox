/**
 * @file FAQ.jsx
 * @brief A component that displays a list of frequently asked questions in an accordion style.
 *
 * This component renders a section with a title and a list of questions.
 * Each question can be clicked to reveal its answer. The component uses local state
 * to manage which FAQ item is currently open. It also includes a call-to-action
 * form at the bottom for user email submission.
 */
import React, { useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';

const FAQ = ({ onGetStarted }) => {
  // State to track the index of the currently open FAQ item.
  const [openIndex, setOpenIndex] = useState(null);

  /**
   * Toggles the visibility of an FAQ answer.
   * If the clicked item is already open, it closes it.
   * Otherwise, it opens the clicked item and closes any other open one.
   * @param {number} index - The index of the FAQ item to toggle.
   */
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // An array of objects, each representing an FAQ question and its answer.
  const faqs = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649/month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
    }
  ];

  return (
    <section className="bg-black py-16 px-[4%] ">
      <h2 className="text-[2rem] md:text-[3rem] font-black text-center mb-6 text-white">
        Frequently Asked Questions
      </h2>
      
      <div className="flex flex-col gap-2 max-w-[1100px] mx-auto">
        {faqs.map((item, index) => (
          <div key={index} className="group">
            {/* Question Button: Toggles the answer's visibility on click. */}
            <button 
              onClick={() => toggleFAQ(index)}
              className="w-full bg-[#2d2d2d] hover:bg-[#414141] transition-colors duration-200 p-6 flex justify-between items-center cursor-pointer"
            >
              <span className="text-[1.125rem] md:text-[1.5rem] font-medium text-left text-white">
                {item.question}
              </span>
              
              {/* The plus icon visually indicates the state (open/closed) by rotating. */}
              <Plus 
                className={`text-white min-w-[36px] min-h-[36px] transition-transform duration-200 ease-in-out ${
                  openIndex === index ? 'rotate-45' : 'rotate-0'
                }`} 
              />
            </button>
            
            {/* Answer Content: Uses `max-height` for a smooth slide-down animation. */}
            <div 
              className={`bg-[#2d2d2d] overflow-hidden transition-[max-height] duration-250 ease-[cubic-bezier(0.5,0,0.1,1)] ${
                openIndex === index ? 'max-h-[1200px]' : 'max-h-0'
              }`}
            >
               {/* A 1px top border creates a visual separation between the question and answer. */}
               <div className="p-6 text-[1.125rem] md:text-[1.5rem] text-white leading-normal border-t border-black whitespace-pre-line">
                 {item.answer}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email Signup Form (Bottom Call-to-Action) */}
      <div className="w-full max-w-3xl mx-auto text-center mt-12 px-4">
        <p className="text-white text-[1.15rem] md:text-[1.25rem] pb-4 px-2 leading-snug">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center w-full">
          <div className="relative w-full md:flex-1">
             <input 
              type="text" 
              name="demo_email_input"
              id="demo_email_faq"
              autoComplete="off"
              placeholder="Email address" 
              className="w-full h-12 md:h-14 px-4 bg-black/40 border border-gray-500/70 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition backdrop-blur-sm"
              />
          </div>
          
          {/* The "Get Started" button triggers the `onGetStarted` prop function. */}
          <button onClick={onGetStarted} className="h-12 md:h-14 px-6 bg-[#E50914] text-white text-xl md:text-2xl font-bold rounded hover:bg-[#c11119] transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
            Get Started <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;