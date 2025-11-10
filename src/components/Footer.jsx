import { Flower } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-10" style={{ backgroundColor: '#F6F7F9', borderColor: '#D0D4DC' }}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: '#4A6078' }}>
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Docs</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Terms</a>
        </nav>
        <p className="mt-6 text-sm text-[#4A6078]">© 2025 Imagify.art — Powered by Pollination AI API.</p>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1" style={{ borderColor: '#D0D4DC', color: '#4A6078' }}>
          <Flower size={16} className="animate-pulse" />
          <span>Pollination</span>
        </div>
      </div>
    </footer>
  );
}
