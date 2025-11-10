import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const samples = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504198266285-165a12d27b73?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % samples.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F6F7F9' }}>
      {/* Subtle background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(circle at 30% 30%, #ffffff, #D0D4DC)' }} />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle at 70% 70%, #ffffff, #D0D4DC)' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm" style={{ borderColor: '#D0D4DC', color: '#4A6078', backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(6px)' }}>
              <Sparkles size={16} /> Imagify.art — Powered by Pollination AI
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#1f2a37] md:text-6xl">
              Turn Your Imagination into Art.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A6078]">
              Imagify.art — powered by Pollination AI — transforms your words into breathtaking visuals in seconds.
            </p>
          </motion.div>

          {/* Prompt Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-2 shadow-sm backdrop-blur-md" style={{ borderColor: '#D0D4DC' }}>
              <input
                type="text"
                placeholder="Describe your vision… e.g., ‘A golden forest in mist, painted in oil style.’"
                className="w-full rounded-xl bg-transparent px-4 py-3 outline-none placeholder:text-[#8a95a3]"
              />
              <button
                className="rounded-xl px-5 py-3 font-medium text-white transition-all"
                style={{ backgroundColor: '#4A6078', boxShadow: '0 8px 24px rgba(74,96,120,0.25)' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 28px rgba(74,96,120,0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,96,120,0.25)')}
              >
                Generate
              </button>
            </div>
          </motion.div>
        </div>

        {/* Rotating sample images grid */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatePresence mode="wait">
            {Array.from({ length: 4 }).map((_, i) => {
              const imgIdx = (index + i) % samples.length;
              return (
                <motion.div
                  key={`${imgIdx}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur" style={{ borderColor: '#D0D4DC' }}
                >
                  <img src={samples[imgIdx]} alt="sample" className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
