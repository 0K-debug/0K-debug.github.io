'use client';

import { FC, useState } from 'react';
import Link from 'next/link';

const ContactPage: FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-transparent backdrop-blur-[3px]
                     border-b border-white/[0.05]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          <Link 
            href="/"
            className="inline-flex items-center space-x-3 text-sm tracking-[0.2em] 
                     font-extralight text-neutral-400 hover:text-white transition-colors group"
          >
            <span className="text-lg transition-transform duration-500 group-hover:-translate-x-1">←</span>
            <span>BACK</span>
          </Link>
          <div className="flex items-center">
            <div className="relative" style={{ marginRight: '-0.2em' }}>
              <span className="absolute rotate-90 origin-left text-2xl font-light tracking-wider whitespace-nowrap" 
                    style={{ left: '0.1em', bottom: '-0.05em' }}>
                0K
              </span>
              <div className="w-4"></div>
            </div>
            <span className="text-2xl font-light">BIO</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Intro Section */}
            <div className="text-center mb-20 space-y-4">
              <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
                Let's Connect
              </h1>
              <p className="text-neutral-400 font-light tracking-wide leading-relaxed">
                Join us in shaping the future of human longevity
              </p>
            </div>

            {/* Contact Form */}
            <form className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white/90 
                           focus:outline-none focus:border-white/20 transition-colors
                           peer placeholder-transparent"
                  placeholder="Name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="name"
                  className={`absolute left-0 -top-6 text-sm tracking-wider
                           transition-all duration-300
                           ${focusedField === 'name' ? 'text-white/80' : 'text-white/40'}`}
                >
                  NAME
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white/90 
                           focus:outline-none focus:border-white/20 transition-colors
                           peer placeholder-transparent"
                  placeholder="Email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="email"
                  className={`absolute left-0 -top-6 text-sm tracking-wider
                           transition-all duration-300
                           ${focusedField === 'email' ? 'text-white/80' : 'text-white/40'}`}
                >
                  EMAIL
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white/90 
                           focus:outline-none focus:border-white/20 transition-colors
                           peer placeholder-transparent resize-none"
                  placeholder="Message"
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="message"
                  className={`absolute left-0 -top-6 text-sm tracking-wider
                           transition-all duration-300
                           ${focusedField === 'message' ? 'text-white/80' : 'text-white/40'}`}
                >
                  MESSAGE
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-8 text-center">
                <button
                  type="submit"
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
                  <span className="relative z-10">SEND MESSAGE</span>
                  <span className="relative z-10 text-lg opacity-60 transform transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                </button>
              </div>
            </form>

            {/* Additional Contact Info */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-left space-y-4">
                <h3 className="text-sm tracking-[0.2em] text-white/40">LOCATION</h3>
                <p className="font-light">Paris, France</p>
              </div>
              <div className="text-center md:text-left space-y-4">
                <h3 className="text-sm tracking-[0.2em] text-white/40">EMAIL</h3>
                <a href="mailto:info@0kbio.com" className="font-light hover:text-white transition-colors">
                  info@0kbio.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage; 