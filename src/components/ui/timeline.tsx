"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  role?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-[1800px] mx-auto py-16 md:py-32 px-[clamp(1rem,5vw,6rem)]">
      {/* Initial point labels */}
      <div className="hidden md:flex items-center justify-between w-full pt-0 mb-[clamp(4rem,10vw,8rem)] relative z-50">
          <div className="w-[44%] text-right pr-[clamp(1.5rem,6vw,6rem)]">
              <span className="text-[clamp(10px,0.7vw,12px)] font-bold tracking-[1.5em] text-white uppercase leading-none pl-[1.5em]">DSML</span>
            </div>
            <div className="w-[12%] flex justify-center">
              <div className="h-4 w-4 rounded-full bg-zinc-950 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-2 ring-white/5" />
            </div>
            <div className="w-[44%] text-left pl-[clamp(1.5rem,6vw,6rem)]">
              <span className="text-[clamp(10px,0.7vw,12px)] font-bold tracking-[1.5em] text-white uppercase leading-none pl-[1.5em]">AIML</span>
          </div>
      </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-[clamp(4rem,10vw,14rem)] w-full pt-8 relative ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
          {/* Mobile Title & Content Wrapper Alignment */}
          <div className="md:hidden flex flex-col items-start w-full pl-12 pr-4 relative z-10">
            <div className="mb-8 text-left">
              <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 mb-2 block">0{index + 1} / {item.role || "Phase"}</span>
              <h3 className="text-[clamp(1.3rem,6vw,2.5rem)] font-bold text-white uppercase tracking-tighter leading-tight">{item.title}</h3>
              <div className="h-px w-8 bg-zinc-800 mt-4" />
            </div>
            <div className="w-full">
              {item.content}
            </div>
          </div>

          {/* Desktop Content Side */}
          <div className="hidden md:flex w-full md:w-[46%] justify-center">
            <div className={`w-full flex ${index % 2 === 0 ? "md:justify-end md:pr-[clamp(1rem,4vw,4rem)]" : "md:justify-start md:pl-[clamp(1rem,4vw,4rem)]"} justify-center`}>
              {item.content}
            </div>
          </div>

        {/* Vertical Line Dot */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-10 md:top-1/2 md:-translate-y-1/2 z-40">
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-zinc-950/90 backdrop-blur-3xl flex items-center justify-center border border-white/5 shadow-2xl ring-1 ring-white/5">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
          </div>
        </div>

        {/* Desktop Empty Side label */}
        <div className={`hidden md:flex w-[46%] items-center ${index % 2 === 0 ? "justify-start pl-[clamp(1rem,4vw,4rem)]" : "justify-end pr-[clamp(1rem,4vw,4rem)]"}`}>
          {item.role && (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col group/role ${index % 2 === 0 ? "items-start text-left" : "items-end text-right"}`}
            >
              <span className="text-[clamp(7px,0.5vw,9px)] font-mono text-zinc-700 tracking-[0.5em] uppercase mb-4 transition-colors group-hover/role:text-zinc-500">Path Segment</span>
              <span className="text-[clamp(1.2rem,2.5vw,3rem)] font-bold uppercase tracking-tight text-zinc-500/50 group-hover/role:text-white transition-all duration-700 leading-none">
                {item.role}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    ))}

        {/* Vertical Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[1px] md:w-[2px] bg-neutral-900"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1px] md:w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
