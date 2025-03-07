'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  name?: string;
  role: string;
  image: string;
  bio: string;
}

const TeamPage: FC = () => {
  const founder: TeamMember = {
    name: "Kenan Oggad",
    role: "CEO",
    image: "/team/founder_profile.jpg",
    bio: "Scientist • Developer • Entrepreneur \n Fascinated by lifeforms and machines."
  };

  const executives: TeamMember[] = [
    {
      name: "Position Open",
      role: "CTO",
      image: "/team/member-placeholder.jpg",
      bio: "Leading our technology initiatives and engineering teams."
    },
    founder,
    {
      name: "Position Open",
      role: "COO",
      image: "/team/member-placeholder.jpg",
      bio: "Overseeing operations and strategic implementation."
    }
  ];

  const advisors: TeamMember[] = [
    {
      role: "Scientific Advisor",
      image: "/team/advisor-placeholder.jpg",
      bio: "Template for scientific advisor description."
    },
    {
      role: "Research Advisor",
      image: "/team/advisor-placeholder.jpg",
      bio: "Template for research advisor description."
    }
  ];

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
          {/* Team Section */}
          <section className="mb-32">
            <h2 className="text-4xl font-extralight mb-16 tracking-tight text-center">
              Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {executives.map((member, index) => (
                <div 
                  key={index}
                  className="relative border border-white/[0.08] p-4 
                            transition-all duration-300 ease-out
                            hover:border-white/30
                            hover:bg-white/[0.02]
                            group
                            backdrop-blur-sm rounded-xl"
                >
                  <div className="relative">
                    <div className="aspect-[3/4] relative mb-6 overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20 z-10" />
                      <Image
                        src={member.image}
                        alt={member.name || member.role}
                        fill
                        className="object-cover object-[center_15%] filter brightness-105"
                        priority={index === 1}
                      />
                    </div>
                    <div className="space-y-4">
                      {member.name && (
                        <h3 className="text-xl font-light tracking-wide transition-colors duration-300 group-hover:text-white">
                          {member.name}
                        </h3>
                      )}
                      <p className="text-sm text-neutral-400 tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-neutral-300">
                        {member.role}
                      </p>
                      <div className="h-[1px] w-12 bg-gradient-to-r from-white/40 to-transparent" />
                      <p className="text-neutral-400 font-light leading-relaxed whitespace-pre-line transition-colors duration-300 group-hover:text-neutral-300">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advisors Section */}
          <section>
            <h2 className="text-4xl font-extralight mb-16 tracking-tight text-center">
              Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {advisors.map((advisor, index) => (
                <div 
                  key={index}
                  className="relative border border-white/[0.08] p-8 
                            transition-all duration-300 ease-out
                            hover:border-white/30
                            hover:bg-white/[0.02]
                            group
                            backdrop-blur-sm rounded-xl"
                >
                  <div className="relative">
                    <div className="aspect-[3/2] relative mb-6 overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 z-10" />
                      <div className="absolute inset-0 bg-white/5" />
                    </div>
                    <p className="text-sm text-neutral-400 tracking-[0.2em] uppercase mb-4 transition-colors duration-300 group-hover:text-neutral-300">
                      {advisor.role}
                    </p>
                    <div className="h-[1px] w-12 bg-gradient-to-r from-white/40 to-transparent mb-4" />
                    <p className="text-neutral-400 font-light leading-relaxed transition-colors duration-300 group-hover:text-neutral-300">
                      {advisor.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TeamPage; 