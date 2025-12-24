"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Inter, Syne, Antic_Didone } from "next/font/google";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

// --- FONTS ---
const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"] });
const anticDidone = Antic_Didone({ subsets: ["latin"], weight: ["400"] });

// --- COMPONENTS ---

function DeviceRestrictor({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // 10x Architect: Threshold for "Monumental" experience
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isDesktop === null) return <div className="min-h-screen bg-[#020202]" />;

  if (!isDesktop) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#020202] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        {/* Architectural Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="mb-12 relative">
            <motion.div 
               animate={{ rotate: 90 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="h-20 w-20 rounded-full border border-white/5 flex items-center justify-center"
            >
              <div className="h-10 w-[1px] bg-white/20" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest mt-24 uppercase">Access Denied</span>
            </div>
          </div>

          <h2 className={`${syne.className} text-[clamp(1.5rem,4vw,2rem)] font-bold text-white mb-6 uppercase tracking-[-0.05em] leading-none`}>
            Digital Architecture <br/> Restricted
          </h2>
          
          <p className={`${inter.className} text-zinc-500 text-[11px] max-w-[280px] leading-relaxed mb-12 uppercase tracking-[0.2em] font-medium`}>
            This high-fidelity environment demands superior pixel density and screen real-estate. 
          </p>

          <div className="flex flex-col items-center gap-4">
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
             <p className="text-[9px] text-white/40 uppercase tracking-[0.6em] font-bold">
               Switch to Desktop for Full Immersion
             </p>
          </div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/10" />
        <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/10" />
        <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/10" />
        <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/10" />
      </div>
    );
  }

  return <>{children}</>;
}

function SectionWrapper({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={`py-[clamp(2.5rem,6vw,12rem)] px-[clamp(1rem,5vw,6rem)] w-full overflow-hidden ${className}`}>
      <div className="max-w-[1800px] mx-auto">
        {children}
      </div>
    </section>
  );
}

function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [
    { name: 'Path', link: '#learning' },
    { name: 'Journey', link: '#journey' },
    { name: 'Arsenal', link: '#journal' },
    { name: 'Contact', link: '#contact' }
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-[clamp(1rem,5vw,6rem)] py-[clamp(1rem,3vw,2.5rem)]"
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Magnetic>
            <a href="#intro" className="group cursor-pointer">
              <span className={`${syne.className} text-[clamp(1rem,1.5vw,1.5rem)] font-bold tracking-tighter text-white`}>
                PORTFOLIO<span className="text-zinc-300">.</span>
              </span>
            </a>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-[clamp(1.5rem,4vw,4rem)]">
            {navItems.map((item) => (
              <Magnetic key={item.name}>
                <a href={item.link} className="group relative py-2">
                  <span className="text-[clamp(0.85rem,0.9vw,1rem)] uppercase tracking-[0.2em] text-zinc-300 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-white -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
            <Magnetic>
              <a 
                href="https://github.com/rahulchirra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <Github size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 group-hover:text-white">GitHub</span>
              </a>
            </Magnetic>

            <div 
              className="h-10 w-10 flex flex-col items-end justify-center gap-1.5 cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <div className="h-px w-8 bg-white transition-all duration-300 group-hover:w-5" />
              <div className="h-px w-5 bg-white transition-all duration-300 group-hover:w-8" />
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            <div 
              className="absolute top-[clamp(1rem,3vw,2.5rem)] right-[clamp(1rem,5vw,6rem)] h-10 w-10 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsOpen(false)}
            >
              <X className="text-white group-hover:rotate-90 transition-transform duration-500" size={32} />
            </div>

            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsOpen(false)}
                  className={`${anticDidone.className} text-[clamp(2.5rem,8vw,5rem)] text-white hover:text-zinc-400 transition-colors duration-500`}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">Connect</span>
              <div className="flex gap-6">
                <a href="https://github.com/rahulchirra" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-400 transition-colors">
                  <Github size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarSocials() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-[clamp(1rem,3vw,3rem)] bottom-0 z-50 hidden lg:flex flex-col items-center gap-8"
    >
      <div className="flex flex-col gap-6">
        <Magnetic>
          <a 
            href="https://github.com/rahulchirra" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-white transition-colors duration-500 hover:scale-110 block"
          >
            <Github size={20} />
          </a>
        </Magnetic>
      </div>
      <div className="h-[clamp(4rem,10vh,8rem)] w-px bg-gradient-to-t from-zinc-500 to-transparent" />
    </motion.div>
  );
}

// --- PART 1: BOOKS DATA & COMPONENTS (From Folder 1) ---
const BOOKS = [
  {
    title: "Code",
    author: "Charles Petzold",
    image: "https://raw.githubusercontent.com/rahulchirra/se-ui/refs/heads/main/photo-1440342359743-84fcb8c21f21.avif",
    why: "The hidden language of computer hardware and software. Essential for understanding the soul of machines.",
    accent: "#fbbf24",
  },
  {
    title: "CS Distilled",
    author: "Wladston Ferreira Filho",
    image: "https://raw.githubusercontent.com/rahulchirra/se-ui/refs/heads/main/photo-1532751203793-812308a10d8e.avif",
    why: "A walkthrough of computer science concepts you must know. Pure efficiency.",
    accent: "#10b981",
  },
  {
    title: "How to Solve It",
    author: "George Pólya",
    image: "https://raw.githubusercontent.com/rahulchirra/se-ui/refs/heads/main/photo-1587111384334-650572877dd2.avif",
    why: "A system of thinking which can help you solve any problem. The foundation of logic.",
    accent: "#3b82f6",
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    image: "https://raw.githubusercontent.com/rahulchirra/se-ui/refs/heads/main/photo-1597735881932-d9664c9bbcea.avif",
    why: "A hands-on, project-based introduction to programming. The best way to start your Python journey.",
    accent: "#3776ab",
  },
  {
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    image: "https://raw.githubusercontent.com/rahulchirra/se-ui/refs/heads/main/photo-1765734208128-b3c05bc25204.avif",
    why: "An illustrated guide for programmers and other curious people. The best way to learn algorithms visually.",
    accent: "#f59e0b",
  },
];

function SwipeableCard({ book, index, total, onSwipe, activeIndex }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const scale = activeIndex === index ? 1 : 0.95 - (index - activeIndex) * 0.05;
  const yOffset = activeIndex === index ? 0 : (index - activeIndex) * 15;

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    } else {
      x.set(0);
    }
  };

  if (index < activeIndex) return null;

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        scale,
        y: yOffset,
        zIndex: total - index,
      }}
      drag={activeIndex === index ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        scale,
        y: yOffset,
        opacity: index >= activeIndex + 3 ? 0 : 1,
      }}
      className="absolute cursor-grab active:cursor-grabbing will-change-transform"
    >
      <div className="relative h-[clamp(350px,50vh,550px)] w-[clamp(260px,25vw,380px)] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 shadow-2xl">
        {/* Background Accent Glow */}
        <div 
          className="absolute -inset-20 opacity-20 blur-[80px] pointer-events-none"
          style={{ backgroundColor: book.accent }}
        />
        
        {/* Image */}
        <div className="relative h-2/3 w-full overflow-hidden">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 280px, 380px"
            priority={index === 0}
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex h-1/3 flex-col justify-end p-6 pb-8">
          <div 
            className="mb-3 h-[2px] w-12"
            style={{ backgroundColor: book.accent }}
          />
          <h3 className={`${syne.className} text-[clamp(1.1rem,1.5vw,1.5rem)] font-bold text-white`}>
            {book.title}
          </h3>
          <p className="text-[clamp(0.7rem,0.8vw,0.85rem)] text-zinc-300 mb-4">{book.author}</p>
          
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-md border border-white/5">
            <p className="text-[clamp(0.6rem,0.7vw,0.75rem)] leading-relaxed text-zinc-200">
              <span className="font-semibold" style={{ color: book.accent }}>Why:</span> {book.why}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Books Section Component Wrapper
function BooksSection({ id }: { id?: string }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = BOOKS.length;

  const handleSwipe = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <SectionWrapper id={id} className="relative flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[clamp(300px,60vw,800px)] w-[clamp(300px,60vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-8 text-center"
      >
        <h2 className={`${anticDidone.className} text-[clamp(2.5rem,6vw,8rem)] font-light text-white tracking-tight leading-none`}>
          Intellectual Arsenal
        </h2>
        <div className="h-px w-24 bg-zinc-900 mx-auto mt-6" />
      </motion.div>

      <div className="relative flex h-[clamp(400px,60vh,650px)] w-full items-center justify-center overflow-visible">
        <div className="relative h-[clamp(350px,50vh,550px)] w-[clamp(260px,25vw,380px)]">
          {BOOKS.map((book, i) => (
            <SwipeableCard
              key={`${book.title}-${i}`}
              book={book}
              index={i}
              total={total}
              activeIndex={activeIndex}
              onSwipe={handleSwipe}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex gap-1.5">
          {BOOKS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-[11px] font-semibold tracking-[0.3em] text-zinc-300 uppercase"
      >
        Swipe Left or Right
      </motion.p>
    </SectionWrapper>
  );
}

function IntroductionSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      id="intro"
      ref={containerRef} 
      className="relative h-[min(100vh,1200px)] min-h-[600px] flex items-center justify-center bg-[#020202] overflow-hidden"
    >
      {/* Background Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
      </div>

      <motion.div 
        style={{ y: textY, opacity, scale }}
        className="relative z-10 w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto will-change-transform"
      >
        <div className="flex flex-col items-center">
          {/* Stunning Pre-title */}
          <div className="overflow-hidden mb-[clamp(2rem,5vw,5rem)]">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`${syne.className} text-[clamp(0.85rem,1.2vw,1.1rem)] font-medium text-zinc-300 uppercase tracking-[1em] pl-[1em]`}
            >
              HELLO I&apos;M
            </motion.p>
          </div>

          {/* Monumental Name Display */}
          <h1 className={`${anticDidone.className} text-center select-none overflow-hidden pb-4`}>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block text-[clamp(2.5rem,10vw,16rem)] font-light tracking-[-0.02em] leading-[1.1] text-white whitespace-normal break-words"
            >
              RAHUL CHIRRA
            </motion.span>
          </h1>

          {/* Minimal Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="mt-[clamp(2.5rem,8vh,12rem)] flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-8">
              <div className="h-px w-[clamp(2rem,8vw,8rem)] bg-zinc-800" />
              <span className="text-[clamp(0.75rem,0.8vw,0.9rem)] text-zinc-300 font-medium tracking-[0.5em] uppercase pl-[0.5em]">
                front end dev
              </span>
              <div className="h-px w-[clamp(2rem,8vw,8rem)] bg-zinc-800" />
            </div>
            {/* GitHub Profile Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.8 }}
              className="flex items-center gap-4"
            >
              <Magnetic>
                <a 
                  href="https://github.com/rahulchirra" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 group px-6 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500"
                >
                  <span className="text-[10px] text-zinc-400 tracking-[0.4em] uppercase font-bold group-hover:text-white transition-colors">Github profile</span>
                  <ExternalLink size={14} className="text-zinc-500 group-hover:text-white transition-colors transform group-hover:rotate-45 transition-transform duration-500" />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Extreme Bottom Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-[clamp(2rem,5vh,5rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-[clamp(2rem,8vh,6rem)] bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </section>
  );
}

function JourneyCard({ number, title, subtitle, children }: { number: string, title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div className="card group relative will-change-transform">
      <div className="absolute -inset-8 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[100px] -z-10" />
      <div className="bg-zinc-950/40 backdrop-blur-xl border border-white/5 p-[clamp(1.5rem,5vw,3rem)] rounded-[clamp(1.5rem,3vw,3rem)] w-full max-w-[clamp(280px,85vw,520px)] shadow-2xl relative overflow-hidden transition-all duration-700 group-hover:border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-[clamp(1.5rem,4vw,2.5rem)]">
          <span className="text-[clamp(10px,0.6vw,12px)] font-mono text-zinc-400 tracking-[0.5em] uppercase leading-none">{number}</span>
          <div className="h-[1px] flex-1 bg-zinc-800" />
          <span className="text-[clamp(10px,0.6vw,12px)] font-mono text-zinc-400 tracking-[0.3em] uppercase leading-none">{title}</span>
        </div>

        <h2 className={`${syne.className} text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold mb-[clamp(1rem,3vw,2rem)] tracking-tighter text-white group-hover:text-white transition-colors duration-500`}>
          {subtitle}
        </h2>

        <div className="space-y-[clamp(0.75rem,2vw,1.25rem)] font-medium text-zinc-200 text-[clamp(0.85rem,0.9vw,1rem)] mt-2 leading-relaxed group-hover:text-white transition-colors duration-500">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- PART 2: MAIN PAGE (JOURNEY + MERGE) (From Folder 2) ---

export default function CombinedPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.12,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".card");
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <DeviceRestrictor>
      <main className={`min-h-screen bg-[#020202] text-white selection:bg-white/20 overflow-hidden ${inter.className}`}>
        <Header />
        <SidebarSocials />
        {/* Noise Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

          {/* Grid Pattern */}
          <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
            style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} 
          />

        <div className="content-wrapper relative z-10" ref={containerRef}>
          <IntroductionSection />
          
          {/* Learning Section */}
          <SectionWrapper id="learning">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-[clamp(2.5rem,6vw,8rem)]"
            >
              <h2 className={`${anticDidone.className} text-[clamp(2.5rem,7vw,10rem)] font-light text-white tracking-tight leading-[1] md:leading-none`}>
                Learning Path
              </h2>
              <div className="h-[1px] w-12 bg-zinc-800 mx-auto mt-10" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-[clamp(2rem,8vw,12rem)]">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <span className="text-[clamp(10px,0.6vw,12px)] uppercase tracking-[0.6em] text-zinc-400 mb-6 font-semibold">01 / STAGNATION</span>
                <h3 className={`${syne.className} text-[clamp(1.2rem,2vw,1.75rem)] font-bold mb-[clamp(2rem,5vw,4rem)] text-white uppercase tracking-[0.2em]`}>
                  Tutorial Hell
                </h3>
                
                <div className="space-y-[clamp(1.5rem,4vw,3rem)]">
                  {[
                    { label: "FOCUS", value: "Just Watching Others" },
                    { label: "PLAN", value: "Waiting for the Right Time" },
                    { label: "HABIT", value: "Starting & Stopping" },
                    { label: "RESULT", value: "Never Finishing Anything" }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1.5 text-center md:text-left">
                      <span className="text-[clamp(9px,0.5vw,11px)] uppercase tracking-[0.3em] text-zinc-400 font-semibold">{item.label}</span>
                      <span className={`${anticDidone.className} text-[clamp(1rem,1.5vw,1.75rem)] text-zinc-100 font-medium tracking-wide`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-[clamp(10px,0.6vw,12px)] uppercase tracking-[0.6em] text-zinc-400 mb-6 font-semibold">02 / DOMINANCE</span>
                <h3 className={`${syne.className} text-[clamp(1.2rem,2vw,1.75rem)] font-bold mb-[clamp(2rem,5vw,4rem)] text-white uppercase tracking-[0.2em]`}>
                  Building Reality
                </h3>
                
                <div className="space-y-[clamp(1.5rem,4vw,3rem)]">
                  {[
                    { label: "FOCUS", value: "Writing Code Every Day" },
                    { label: "PLAN", value: "Shipping Real Projects" },
                    { label: "HABIT", value: "Non-stop Consistency" },
                    { label: "RESULT", value: "Becoming a 10x Engineer" }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1.5 text-center md:text-left">
                      <span className="text-[clamp(9px,0.5vw,11px)] uppercase tracking-[0.3em] text-zinc-400 font-semibold">{item.label}</span>
                      <span className={`${anticDidone.className} text-[clamp(1rem,1.5vw,1.75rem)] text-zinc-100 font-medium tracking-wide`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Timeline Section */}
          <section id="journey" className="relative w-full overflow-hidden">
            <SectionWrapper className="!py-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="flex flex-col items-center text-center"
              >
                <h1 className={`${anticDidone.className} text-5xl md:text-[8vw] font-light tracking-[0.6em] text-white ml-[0.6em]`}>
                  JOURNEY
                </h1>
                <div className="mt-12 h-px w-32 bg-zinc-800" />
                <span className="mt-10 text-[12px] uppercase tracking-[0.6em] text-zinc-400 font-semibold">
                  The Evolution of Craft
                </span>
              </motion.div>
            </SectionWrapper>
            
            <div className="relative">
              <Timeline data={[
              {
                title: "Data Foundations",
                role: "Data Engineer",
                content: (
                  <JourneyCard number="01" title="Data Ecosystems" subtitle="Data Engineering">
                    <p><span className="text-white font-semibold">Architecture:</span> Robust Peta-Scale Pipeline Design & Distributed Storage.</p>
                    <p><span className="text-white font-semibold">Tooling:</span> Spark, Scala, and SQL optimization for massive datasets.</p>
                    <p><span className="text-white font-semibold">Warehousing:</span> Snowflake, BigQuery, and Snowflake optimization.</p>
                    <p><span className="text-white font-semibold">Governance:</span> Advanced ETL/ELT orchestration with dbt & Airflow.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "Analytical Intelligence",
                role: "Data Analyst",
                content: (
                  <JourneyCard number="02" title="Strategic Insights" subtitle="Data Analytics">
                    <p><span className="text-white font-semibold">Analysis:</span> Complex statistical modeling and hypothesis testing at scale.</p>
                    <p><span className="text-white font-semibold">Synthesis:</span> Converting raw telemetry into high-impact executive vision.</p>
                    <p><span className="text-white font-semibold">Automation:</span> Building self-healing reporting systems with Advanced SQL & Python.</p>
                    <p><span className="text-white font-semibold">Platforms:</span> Mastery over BI Tooling (Tableau/Looker) for deep drilling.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "Predictive Engines",
                role: "ML Engineer",
                content: (
                  <JourneyCard number="03" title="Algorithm Mastery" subtitle="ML Engineering">
                    <p><span className="text-white font-semibold">Modelling:</span> Mastery over Gradient Boosting and Deep Learning architectures.</p>
                    <p><span className="text-white font-semibold">Frameworks:</span> High-performance implementations using PyTorch and JAX.</p>
                    <p><span className="text-white font-semibold">Precision:</span> Advanced mathematical optimization for model convergence.</p>
                    <p><span className="text-white font-semibold">Integration:</span> Seamless MLflow experiment tracking and lifecycle management.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "Production AI",
                role: "AI Engineer",
                content: (
                  <JourneyCard number="04" title="Intelligent Systems" subtitle="AI Engineering">
                    <p><span className="text-white font-semibold">Deployment:</span> Architecting ultra-low latency inference engines with FastAPI.</p>
                    <p><span className="text-white font-semibold">Scale:</span> Multi-stage containerization with Docker and Kubernetes.</p>
                    <p><span className="text-white font-semibold">Optimization:</span> TensorRT & ONNX runtime for hardware-accelerated AI.</p>
                    <p><span className="text-white font-semibold">Intelligence:</span> Building sophisticated vector search and embedding pipelines.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "System Reliability",
                role: "MLOps Engineer",
                content: (
                  <JourneyCard number="05" title="Operational Excellence" subtitle="MLOps Engineering">
                    <p><span className="text-white font-semibold">Infrastructure:</span> Cloud-agnostic IaC utilizing Terraform and Ansible.</p>
                    <p><span className="text-white font-semibold">Reliability:</span> Automated CI/CD pipelines with zero-downtime deployment.</p>
                    <p><span className="text-white font-semibold">Monitoring:</span> Advanced drift detection using Prometheus and Grafana.</p>
                    <p><span className="text-white font-semibold">Version Control:</span> High-integrity data and model versioning with DVC.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "Generative Mastery",
                role: "GenAI Developer",
                content: (
                  <JourneyCard number="06" title="Cognitive Architecture" subtitle="GenAI Development">
                    <p><span className="text-white font-semibold">Intelligence:</span> Designing autonomous multi-agent systems and RAG.</p>
                    <p><span className="text-white font-semibold">Frameworks:</span> Advanced orchestration with LangChain and LlamaIndex.</p>
                    <p><span className="text-white font-semibold">Expertise:</span> Fine-tuning state-of-the-art LLMs (GPT-4o, Claude 3.5).</p>
                    <p><span className="text-white font-semibold">Reliability:</span> Rigorous evaluation using Ragas and Deep Eval for LLM safety.</p>
                  </JourneyCard>
                ),
              },
              {
                title: "Hyper-Scale Infra",
                role: "Infra Architect",
                content: (
                  <JourneyCard number="07" title="Core Infrastructure" subtitle="Infrastructure Architecture">
                    <p><span className="text-white font-semibold">Compute:</span> Management of H100 GPU clusters and RDMA fabrics.</p>
                    <p><span className="text-white font-semibold">Concurrency:</span> Massive parallelism using Ray.io and DeepSpeed.</p>
                    <p><span className="text-white font-semibold">Architecture:</span> Scaling vLLM and TGI for global concurrent traffic.</p>
                    <p><span className="text-white font-semibold">Networking:</span> InfiniBand high-speed interconnect management.</p>
                  </JourneyCard>
                ),
              },
              ]} />
            </div>
          </section>

          <BooksSection id="journal" />

          <SectionWrapper id="contact" className="flex items-center justify-center text-center">
            <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/40">
              <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-medium transition-colors duration-500 group-hover:text-white">
                chadvukora puka
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-10" />
            </button>
          </SectionWrapper>
        </div>
      </main>
    </DeviceRestrictor>
  );
}
