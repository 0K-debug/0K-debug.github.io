import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <h3 className="text-2xl font-light pr-8">{question}</h3>
        <div className="relative flex-shrink-0">
          <Plus 
            className={`w-8 h-8 text-white/60 transition-all duration-500 transform
                       group-hover:text-white ${isOpen ? 'rotate-45' : ''}`}
            strokeWidth={1}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-neutral-400 font-light leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Vitalism different from other longevity initiatives?",
      answer: "Our approach combines cutting-edge AI with synthetic biology, creating a unique synergy that allows us to tackle aging at its molecular roots. We're not just studying aging—we're developing adaptive solutions that evolve with our understanding."
    },
    {
      question: "How are you able to offer preferred diagnostic and product prices?",
      answer: "Through strategic partnerships and our innovative research platform, we've optimized our processes to make advanced longevity solutions more accessible. Our goal is to democratize access to life-extending technologies."
    },
    {
      question: "Are you a nonprofit organization?",
      answer: "While we operate as a for-profit organization, our mission drives every decision. We believe sustainable business practices allow us to invest more in research and development, ultimately benefiting more people."
    },
    {
      question: "Do you offer refunds on your services?",
      answer: "Yes, we stand behind our products and services with a comprehensive satisfaction guarantee. Our refund policy reflects our commitment to transparency and customer trust."
    },
    {
      question: "Do you offer student, startup, or nonprofit discounts?",
      answer: "We offer special pricing programs for students, startups, and nonprofits who share our vision of advancing human longevity. Contact our team to learn more about eligibility."
    }
  ];

  return (
    <section className="relative py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-64 h-64 rounded-full 
                        bg-gradient-to-br from-white/[0.02] to-transparent 
                        blur-3xl opacity-60 animate-float-slow" />
          <div className="absolute bottom-1/3 -right-1/3 w-96 h-96 rounded-full 
                        bg-gradient-to-bl from-white/[0.015] to-transparent 
                        blur-3xl opacity-40 animate-float-slower" />
        </div>

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-light tracking-wide">Common Questions</h2>
        </div>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(1deg); }
          75% { transform: translate(-10px, 10px) rotate(-1deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-15px, 15px) rotate(-1deg); }
          66% { transform: translate(15px, -15px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQ; 