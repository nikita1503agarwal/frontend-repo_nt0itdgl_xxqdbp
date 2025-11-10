import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophia',
    role: 'Graphic Designer',
    quote: 'Imagify.art gives me creative freedom like never before.',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    name: 'Liam',
    role: 'Film Director',
    quote: 'A calm, elegant tool that fits right into our workflow.',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    name: 'Ava',
    role: 'Marketing Lead',
    quote: 'Beautiful results with minimal effort — love it.',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    name: 'Noah',
    role: 'Indie Game Dev',
    quote: 'From idea to art in seconds. It’s brilliant.',
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16" style={{ backgroundColor: '#D0D4DC22' }}>
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-center text-3xl font-semibold text-[#1f2a37]">What Our Users Say</h3>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const t = testimonials[(idx + i) % testimonials.length];
            return (
              <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: '#D0D4DC' }}>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-medium text-[#1f2a37]">{t.name}</p>
                    <p className="text-sm text-[#4A6078]">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[#1f2a37]">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-1" style={{ color: '#4A6078' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#4A6078" color="#4A6078" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
