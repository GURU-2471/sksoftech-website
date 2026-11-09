"use client";

const techStack = [
  { name: "Next.js 15", category: "Full-Stack" },
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Flutter", category: "Mobile Apps" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Google Gemini AI", category: "AI Engineering" },
  { name: "AWS Cloud", category: "Infrastructure" },
  { name: "Docker", category: "DevOps" },
  { name: "Google Ads", category: "Marketing" },
  { name: "Meta Ads", category: "Marketing" },
  { name: "Figma", category: "UI/UX Design" },
  { name: "GraphQL", category: "APIs" },
  { name: "Python", category: "Automation" },
];

export default function TechMarquee() {
  // Duplicate list to achieve continuous infinite marquee loop
  const duplicated = [...techStack, ...techStack];

  return (
    <div className="relative w-full py-8 bg-slate-950 overflow-hidden border-y border-slate-900">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {duplicated.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 mx-4 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-800/80 hover:border-[#1E6FFF] hover:bg-[#1E6FFF]/10 transition-all duration-300 group cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[#1E6FFF] group-hover:bg-[#FFC21A] transition-colors" />
            <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
              {tech.name}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-500 group-hover:text-slate-400">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
