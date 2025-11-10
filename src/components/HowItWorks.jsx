import { motion } from 'framer-motion';
import { Type, Image, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Type It',
    desc: 'Enter your creative prompt.',
    icon: Type,
  },
  {
    title: 'Generate It',
    desc: 'Pollination AI creates your artwork.',
    icon: Image,
  },
  {
    title: 'Download & Share',
    desc: 'Save or share instantly.',
    icon: Share2,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F6F7F9' }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1f2a37] md:text-4xl">How Imagify.art Works</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: '#D0D4DC' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ border: '1px solid #D0D4DC', color: '#4A6078' }}>
                  <s.icon size={22} />
                </div>
                <h3 className="text-xl font-medium text-[#1f2a37]">{s.title}</h3>
              </div>
              <p className="mt-3 text-[#4A6078]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
