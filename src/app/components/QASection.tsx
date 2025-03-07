import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QAItem {
  question: string;
  answer: string;
}

const qaData: QAItem[] = [
  {
    question: "What is longevity research?",
    answer: "Longevity research is the scientific study of aging and potential interventions to extend both lifespan and healthspan. It encompasses various fields including genetics, cell biology, and biotechnology, all aimed at understanding and potentially slowing or reversing the aging process."
  },
  {
    question: "What's the difference between lifespan and healthspan?",
    answer: "While lifespan refers to the total length of life, healthspan describes the period during which a person remains healthy and free from age-related diseases. Modern longevity research focuses on extending both, ensuring that increased years of life are accompanied by good health and vitality."
  },
  {
    question: "How does synthetic biology contribute to longevity research?",
    answer: "Synthetic biology allows us to engineer biological systems and modify genetic pathways that influence aging. By understanding and optimizing these pathways, we can develop targeted interventions that may enhance cellular repair mechanisms and improve overall longevity."
  },
  {
    question: "What role does machine learning play in longevity research?",
    answer: "Machine learning helps analyze vast amounts of biological data to identify patterns in aging processes and predict potential therapeutic targets. It accelerates drug discovery and helps personalize treatments by understanding individual genetic variations and their impact on aging."
  }
];

const QAItem: FC<{ item: QAItem; isOpen: boolean; onToggle: () => void }> = ({ 
  item, 
  isOpen, 
  onToggle 
}) => {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-extralight tracking-wide group-hover:text-white transition-colors">
          {item.question}
        </span>
        <span className={`ml-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 font-light leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QASection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex items-center relative py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl md:text-4xl font-extralight mb-16 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-1">
          {qaData.map((item, index) => (
            <QAItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QASection; 