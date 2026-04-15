"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

// --- Path layer: diagonal animated strokes ---
function FloatingPaths({
  position,
  hue,
  parallaxX,
  parallaxY,
}: {
  position: number;
  hue: "cyan" | "violet";
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const stroke = hue === "cyan" ? "rgb(34, 211, 238)" : "rgb(167, 139, 250)";
  const baseOpacity = hue === "cyan" ? 0.07 : 0.09;

  const paths = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.028,
    duration: 18 + (i % 9) * 2.8,
    delay: i * 0.15,
  }));

  const shiftMultiplier = hue === "cyan" ? 1 : -0.6;
  const x = useTransform(parallaxX, (v) => v * shiftMultiplier);
  const y = useTransform(parallaxY, (v) => v * shiftMultiplier);

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ x, y }}>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={stroke}
            strokeWidth={path.width}
            strokeOpacity={baseOpacity + path.id * 0.014}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.55, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: path.delay,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// --- Ambient glow orbs that slowly drift ---
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Violet orb — top-left drift */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "22%",
          top: "35%",
          width: 680,
          height: 680,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 68%)",
          filter: "blur(24px)",
          transform: "translate(-50%,-50%)",
        }}
        animate={{ x: [0, 45, -25, 0], y: [0, -35, 22, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan orb — center-right drift */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "18%",
          top: "48%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 68%)",
          filter: "blur(24px)",
          transform: "translate(50%,-50%)",
        }}
        animate={{ x: [0, -35, 18, 0], y: [0, 22, -18, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Small violet pulse — top-center accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "18%",
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
          filter: "blur(10px)",
          transform: "translate(-50%,-50%)",
        }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Bottom-center warm deep blue base glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "50%",
          bottom: "0%",
          width: 900,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(99,60,200,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
          transform: "translate(-50%, 30%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// --- Subtle dot grid texture ---
function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(139,92,246,0.18) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}

// --- Vignette for depth ---
function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 50%, rgba(8,5,18,0.55) 100%)",
      }}
    />
  );
}

// --- Creative name backdrop: horizontal streams + diagonal fan + animated sparks ---
function NameBackdrop() {
  // Horizontal S-curve streams sweeping left → right through the name
  const streams = Array.from({ length: 24 }, (_, i) => {
    const y = 16 + i * 12;
    const bend = ((i % 4) - 1.5) * 28;
    const isViolet = i % 5 === 3;
    return {
      id: i,
      d: `M -30 ${y} C 180 ${y + bend} 480 ${y - bend} 750 ${y}`,
      stroke: isViolet ? "rgb(167,139,250)" : "rgb(34,211,238)",
      width: 0.5 + (i % 6) * 0.12,
      opacity: 0.08 + (i % 8) * 0.022,
      duration: 13 + (i % 7) * 2.2,
      delay: i * 0.2,
      // direction alternates so half flow left, half flow right
      reverse: i % 2 === 0,
    };
  });

  // Diagonal accent beams for depth — same formula as full-bg but denser
  const beams = Array.from({ length: 10 }, (_, i) => ({
    id: i + 200,
    d: `M-${200 - i * 6} -${60 + i * 10}C-${200 - i * 6} -${60 + i * 10} -${140 - i * 6} ${140 - i * 8} ${280 - i * 6} ${240 - i * 8}C${580 - i * 6} ${330 - i * 8} ${640 - i * 6} ${560 - i * 8} ${640 - i * 6} ${560 - i * 8}`,
    width: 0.6 + i * 0.05,
    duration: 18 + i * 1.5,
    delay: i * 0.4 + 0.5,
  }));

  // Spark dots that travel left → right along select stream y-positions
  const sparks = [
    { id: 0, cy: 52,  duration: 7,   delay: 0,   color: "rgb(34,211,238)",  r: 1.8 },
    { id: 1, cy: 112, duration: 9.5, delay: 2.2, color: "rgb(167,139,250)", r: 1.4 },
    { id: 2, cy: 172, duration: 8,   delay: 4.8, color: "rgb(34,211,238)",  r: 1.6 },
    { id: 3, cy: 232, duration: 11,  delay: 1.1, color: "rgb(167,139,250)", r: 1.2 },
    { id: 4, cy: 80,  duration: 6.5, delay: 6,   color: "rgb(167,139,250)", r: 1.0 },
    { id: 5, cy: 148, duration: 10,  delay: 3.5, color: "rgb(34,211,238)",  r: 1.3 },
  ];

  return (
    <span
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 95% 110% at 50% 50%, black 20%, rgba(0,0,0,0.7) 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 110% at 50% 50%, black 20%, rgba(0,0,0,0.7) 55%, transparent 100%)",
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 720 300"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal streams */}
        {streams.map((s) => (
          <motion.path
            key={s.id}
            d={s.d}
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeOpacity={s.opacity}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, s.opacity * 6.5, 0.25],
              pathOffset: s.reverse ? [0, 1, 0] : [1, 0, 1],
            }}
            transition={{
              duration: s.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: s.delay,
            }}
          />
        ))}

        {/* Diagonal accent beams */}
        {beams.map((b) => (
          <motion.path
            key={b.id}
            d={b.d}
            stroke="rgb(167,139,250)"
            strokeWidth={b.width}
            strokeOpacity={0.07 + (b.id % 10) * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.45, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: b.delay,
            }}
          />
        ))}

        {/* Animated spark dots */}
        {sparks.map((sp) => (
          <motion.circle
            key={sp.id}
            cy={sp.cy}
            r={sp.r}
            fill={sp.color}
            initial={{ cx: -10, opacity: 0 }}
            animate={{
              cx: [-10, 730],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: sp.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: sp.delay,
              times: [0, 0.08, 0.5, 0.92, 1],
            }}
          />
        ))}

        {/* Soft center glow */}
        <motion.ellipse
          cx={360}
          cy={150}
          rx={280}
          ry={100}
          fill="url(#nameGlow)"
          animate={{ opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <radialGradient id="nameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
}

// --- Main exported component ---
export function BackgroundPaths({
  title = "Elizabeth Tran",
  onCTAClick,
}: {
  title?: string;
  onCTAClick?: () => void;
}) {
  const words = title.split(" ");

  // Mouse parallax state
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 30 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set(((e.clientX - cx) / rect.width) * 18);
      rawY.set(((e.clientY - cy) / rect.height) * 12);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Layer 1: dot grid texture */}
      <DotGrid />

      {/* Layer 2: ambient glow orbs */}
      <AmbientOrbs />

      {/* Layer 3: animated path strokes — cyan */}
      <FloatingPaths position={1} hue="cyan" parallaxX={springX} parallaxY={springY} />
      <FloatingPaths position={-1} hue="cyan" parallaxX={springX} parallaxY={springY} />

      {/* Layer 4: animated path strokes — violet, offset parallax */}
      <FloatingPaths position={0.7} hue="violet" parallaxX={springX} parallaxY={springY} />
      <FloatingPaths position={-0.7} hue="violet" parallaxX={springX} parallaxY={springY} />

      {/* Layer 5: vignette for depth */}
      <Vignette />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Name with letter-by-letter spring animation + local path backdrop */}
          <div className="relative inline-block mb-6">
            <NameBackdrop />
            <h1 className="relative text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter font-display px-4 py-2">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white/70"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400"
          >
            I build AI that works for people.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-sm sm:text-base text-slate-400 mb-10 tracking-widest uppercase"
          >
            AI Agent Builder&nbsp;&nbsp;•&nbsp;&nbsp;Automation Expert&nbsp;&nbsp;•&nbsp;&nbsp;Entrepreneur
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative inline-block"
          >
            {/* Pulse ring */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(34,211,238,0.45)",
                  "0 0 0 10px rgba(34,211,238,0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 2.2 }}
            />
          <div className="group relative bg-gradient-to-b from-cyan-400/20 to-violet-600/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-cyan-500/25 hover:shadow-xl transition-all duration-300">
            <Button
              variant="ghost"
              onClick={onCTAClick}
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-slate-950/90 hover:bg-slate-950/100 text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-white/10 hover:border-cyan-400/30 hover:shadow-md"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                See My Work
              </span>
              <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                →
              </span>
            </Button>
          </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
