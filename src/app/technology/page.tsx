'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  abstract?: string;
}

interface Patent {
  title: string;
  inventors: string[];
  filingDate: string;
  patentNumber?: string;
  status: 'Pending' | 'Granted' | 'Published';
  abstract?: string;
}

const TechnologyPage: FC = () => {
  const [activeTab, setActiveTab] = useState<'in-silico' | 'in-vitro'>('in-silico');

  const technologies = {
    'in-silico': [
      {
        title: "Evolutionary Algorithms",
        description: "Our proprietary Evo2 platform with beam search optimization enables efficient exploration of genetic sequence space, identifying promising therapeutic candidates.",
        details: [
          "Advanced protein structure prediction using AlphaFold3 integration",
          "Parallel simulation of multiple evolutionary pathways",
          "Optimization for both stability and function"
        ]
      },
      {
        title: "Molecular Dynamics",
        description: "High-resolution simulation of protein-protein interactions and drug binding dynamics at the atomic level.",
        details: [
          "Custom force fields optimized for aging-related proteins",
          "Microsecond-scale simulations of conformational changes",
          "Integration with experimental validation data"
        ]
      },
      {
        title: "Machine Learning Models",
        description: "Deep learning frameworks for predicting protein function, drug interactions, and aging pathway analysis.",
        details: [
          "Transformer-based architecture for sequence analysis",
          "Graph neural networks for pathway modeling",
          "Reinforcement learning for optimization"
        ]
      }
    ],
    'in-vitro': [
      {
        title: "Cell Line Development",
        description: "Advanced platforms for developing and characterizing immortalized cell lines while maintaining normal function.",
        details: [
          "Precise genetic modification techniques",
          "Automated cell culture systems",
          "Real-time monitoring of cellular health"
        ]
      },
      {
        title: "Microarray Systems",
        description: "High-throughput screening platform for continuous monitoring of genetic expression and cellular behavior.",
        details: [
          "Automated data collection and analysis",
          "Multi-parameter cellular assessment",
          "Integration with computational models"
        ]
      },
      {
        title: "Organoid Models",
        description: "Development of complex tissue models for validating therapeutic approaches in near-physiological conditions.",
        details: [
          "Multi-tissue interaction studies",
          "Long-term viability monitoring",
          "Scalable production systems"
        ]
      }
    ]
  };

  const publications: Publication[] = [
    {
      title: "Novel Approaches to Longevity Enhancement Through Synthetic Biology",
      authors: ["Kenan Oggad", "et al."],
      journal: "Nature Biotechnology",
      year: 2024,
      doi: "10.1038/example",
      abstract: "A comprehensive study on the application of synthetic biology techniques in longevity research."
    },
    {
      title: "Machine Learning Applications in Gene Therapy Optimization",
      authors: ["Kenan Oggad", "et al."],
      journal: "Cell",
      year: 2023,
      doi: "10.1016/example",
      abstract: "Novel machine learning approaches for optimizing gene therapy delivery and efficacy."
    }
  ];

  const patents: Patent[] = [
    {
      title: "Method and System for Adaptive Gene Therapy Delivery",
      inventors: ["Kenan Oggad", "et al."],
      filingDate: "2024-01",
      patentNumber: "US 12,345,678",
      status: "Granted",
      abstract: "A novel system for delivering personalized gene therapies using adaptive algorithms."
    },
    {
      title: "Artificial Intelligence System for Longevity Pathway Analysis",
      inventors: ["Kenan Oggad", "et al."],
      filingDate: "2023-06",
      status: "Pending",
      abstract: "An AI-driven system for analyzing and identifying key pathways in cellular aging."
    }
  ];

  return (
    <main className="relative bg-black text-white min-h-screen">
      {/* Header with back navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a 
            href="/"
            className="flex items-center space-x-2 text-sm tracking-[0.2em] font-extralight text-neutral-400 hover:text-white transition-colors group"
          >
            <span className="text-lg transform transition-transform duration-500 group-hover:-translate-x-1">←</span>
            <span>BACK TO HOME</span>
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title section */}
          <div className="text-center mb-24">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight mb-8">
              Our Technology
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-extralight max-w-3xl mx-auto">
              We combine advanced computational methods with cutting-edge experimental techniques 
              to develop novel therapeutic approaches to aging.
            </p>
          </div>

          {/* Tab navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-white/10 rounded-full p-1">
              <button
                onClick={() => setActiveTab('in-silico')}
                className={`px-8 py-3 rounded-full text-sm tracking-[0.2em] font-extralight transition-all duration-500
                          ${activeTab === 'in-silico' 
                            ? 'bg-white/10 text-white' 
                            : 'text-neutral-400 hover:text-white'}`}
              >
                IN SILICO
              </button>
              <button
                onClick={() => setActiveTab('in-vitro')}
                className={`px-8 py-3 rounded-full text-sm tracking-[0.2em] font-extralight transition-all duration-500
                          ${activeTab === 'in-vitro' 
                            ? 'bg-white/10 text-white' 
                            : 'text-neutral-400 hover:text-white'}`}
              >
                IN VITRO
              </button>
            </div>
          </div>

          {/* Technology cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies[activeTab].map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative border border-white/[0.08] p-8
                         before:absolute before:inset-0 
                         before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent
                         before:opacity-0 before:transition-opacity before:duration-700
                         hover:before:opacity-100"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-light mb-4">{tech.title}</h3>
                  <p className="text-neutral-400 font-light mb-6 leading-relaxed">
                    {tech.description}
                  </p>
                  <ul className="space-y-2">
                    {tech.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-neutral-400">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Publications & Patents Section */}
          <section className="mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-extralight mb-16 tracking-tight text-center">
                Research & Innovation
              </h2>
              
              {/* Publications */}
              <div className="max-w-4xl mx-auto mb-16">
                <h3 className="text-2xl font-extralight mb-8 tracking-tight">
                  Publications
                </h3>
                <div className="space-y-6">
                  {publications.map((pub, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative border border-white/[0.08] p-8
                               before:absolute before:inset-0 
                               before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent
                               before:opacity-0 before:transition-opacity before:duration-700
                               hover:before:opacity-100
                               backdrop-blur-sm rounded-xl"
                    >
                      <div className="relative z-10 space-y-4">
                        <h4 className="text-lg font-light tracking-wide transition-colors duration-300">
                          {pub.title}
                        </h4>
                        <p className="text-sm text-neutral-400 tracking-wide">
                          {pub.authors.join(", ")}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-400">
                          <span>{pub.journal}</span>
                          <span>{pub.year}</span>
                          {pub.doi && (
                            <a 
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                              DOI
                            </a>
                          )}
                        </div>
                        {pub.abstract && (
                          <>
                            <div className="h-[1px] w-12 bg-gradient-to-r from-white/40 to-transparent" />
                            <p className="text-neutral-400 font-light leading-relaxed">
                              {pub.abstract}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Patents */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-extralight mb-8 tracking-tight">
                  Patents
                </h3>
                <div className="space-y-6">
                  {patents.map((patent, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative border border-white/[0.08] p-8
                               before:absolute before:inset-0 
                               before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent
                               before:opacity-0 before:transition-opacity before:duration-700
                               hover:before:opacity-100
                               backdrop-blur-sm rounded-xl"
                    >
                      <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-lg font-light tracking-wide">
                            {patent.title}
                          </h4>
                          <span className={`
                            px-3 py-1 rounded-full text-xs tracking-wider
                            ${patent.status === 'Granted' ? 'bg-emerald-900/30 text-emerald-300' :
                              patent.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-300' :
                              'bg-blue-900/30 text-blue-300'}
                          `}>
                            {patent.status}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 tracking-wide">
                          {patent.inventors.join(", ")}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-400">
                          <span>Filed: {patent.filingDate}</span>
                          {patent.patentNumber && (
                            <span>Patent: {patent.patentNumber}</span>
                          )}
                        </div>
                        {patent.abstract && (
                          <>
                            <div className="h-[1px] w-12 bg-gradient-to-r from-white/40 to-transparent" />
                            <p className="text-neutral-400 font-light leading-relaxed">
                              {patent.abstract}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <a 
              href="/contact"
              className="inline-flex items-center justify-center space-x-4 
                       px-12 py-4
                       text-base tracking-[0.2em] font-extralight
                       text-white/80 hover:text-white
                       transition-all duration-500 ease-out
                       rounded-full
                       border border-white/[0.08] hover:border-white/20
                       relative
                       group
                       after:absolute after:inset-0
                       after:rounded-full
                       after:border after:border-white/[0.08]
                       after:scale-[1.05] after:opacity-0
                       hover:after:scale-[1.15] hover:after:opacity-100
                       after:transition-all after:duration-500
                       after:ease-out"
            >
              <span className="relative z-10">DISCUSS YOUR PROJECT</span>
              <span className="relative z-10 text-lg opacity-60 transform transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TechnologyPage; 