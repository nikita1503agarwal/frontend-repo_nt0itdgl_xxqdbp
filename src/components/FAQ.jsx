import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does Imagify.art generate images?',
    a: 'We leverage advanced diffusion models and the Pollination AI API to turn text prompts into high-fidelity images in seconds.',
  },
  {
    q: 'What is Pollination AI?',
    a: 'Pollination AI provides robust, scalable AI generation APIs that power Imagify.art under the hood.',
  },
  {
    q: 'Can I use my generated art commercially?',
    a: 'Yes, you can use your generated images commercially subject to our license and the Pollination AI usage policy.',
  },
  {
    q: 'Is there a free plan?',
    a: 'We offer a free tier with limited credits so you can explore and create before upgrading.',
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: '#D0D4DC' }}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="font-medium text-[#1f2a37]">{q}</span>
        <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} color="#4A6078" />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden px-4 pb-4 text-[#4A6078]">{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16" style={{ backgroundColor: '#F6F7F9' }}>
      <div className="mx-auto max-w-4xl px-6">
        <h3 className="text-center text-3xl font-semibold text-[#1f2a37]">Frequently Asked Questions</h3>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
