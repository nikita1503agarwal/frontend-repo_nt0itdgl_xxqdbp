import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RefreshCw } from 'lucide-react';

const aspectOptions = ['1:1', '16:9', '9:16', '4:3'];
const resolutionOptions = ['512×512', '768×768', '1024×1024'];
const modelOptions = ['Pollination AI', 'Stable Diffusion'];
const artTypes = ['Realistic', 'Digital Art', 'Sketch', 'Painting', 'Anime'];
const styles = ['Cyberpunk', 'Watercolor', 'Minimalist', 'Portrait', 'Abstract'];

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[#4A6078]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none"
        style={{ borderColor: '#D0D4DC' }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function Generator() {
  const [prompt, setPrompt] = useState('');
  const [artType, setArtType] = useState(artTypes[0]);
  const [style, setStyle] = useState(styles[0]);
  const [aspect, setAspect] = useState(aspectOptions[0]);
  const [resolution, setResolution] = useState(resolutionOptions[0]);
  const [model, setModel] = useState(modelOptions[0]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace(':3000', ':8000') : '');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          art_type: artType,
          style,
          aspect,
          resolution,
          model,
          count: 6,
        }),
      });
      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      setImages(data.images || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => handleGenerate();

  const downloadImage = async (src) => {
    try {
      const a = document.createElement('a');
      a.href = src;
      a.download = 'imagify-art.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  const shareImage = async (src) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Imagify.art', text: 'Check out my AI-generated image', url: src });
        return;
      } catch (e) {}
    }
    try {
      await navigator.clipboard.writeText(src);
      alert('Link copied to clipboard');
    } catch (e) {
      console.error('Share failed', e);
    }
  };

  return (
    <section id="generator" className="py-16" style={{ backgroundColor: '#F6F7F9' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left: Controls */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur" style={{ borderColor: '#D0D4DC' }}>
              <label className="block">
                <span className="mb-1 block text-sm text-[#4A6078]">Prompt</span>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision… e.g., ‘A golden forest in mist, painted in oil style.’"
                  className="w-full resize-none rounded-xl border bg-white/80 px-3 py-3 shadow-sm outline-none placeholder:text-[#8a95a3]"
                  style={{ borderColor: '#D0D4DC' }}
                />
              </label>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Select label="Art Type" value={artType} onChange={setArtType} options={artTypes} />
                <Select label="Style" value={style} onChange={setStyle} options={styles} />
                <Select label="Aspect Ratio" value={aspect} onChange={setAspect} options={aspectOptions} />
                <Select label="Resolution" value={resolution} onChange={setResolution} options={resolutionOptions} />
                <Select label="Model" value={model} onChange={setModel} options={modelOptions} />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-5 w-full rounded-xl px-5 py-3 font-medium text-white transition-all disabled:opacity-60"
                style={{ backgroundColor: '#4A6078', boxShadow: '0 8px 24px rgba(74,96,120,0.25)' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 28px rgba(74,96,120,0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,96,120,0.25)')}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    Generating…
                  </div>
                ) : (
                  'Generate'
                )}
              </button>

              {loading && (
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200/70">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#4A6078' }}
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Output Grid */}
          <div className="md:col-span-8">
            <div className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur" style={{ borderColor: '#D0D4DC' }}>
              {loading ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-200/60" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {images.map((src, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md" style={{ borderColor: '#D0D4DC' }}>
                      <img src={src} alt={`gen-${i}`} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-10 items-center justify-between gap-2 bg-white/80 p-2 opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100" style={{ borderTop: '1px solid #D0D4DC' }}>
                        <button onClick={() => downloadImage(src)} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#4A6078] hover:bg-gray-100"><Download size={16}/> Download</button>
                        <button onClick={() => shareImage(src)} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#4A6078] hover:bg-gray-100"><Share2 size={16}/> Share</button>
                        <button onClick={handleRegenerate} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#4A6078] hover:bg-gray-100"><RefreshCw size={16}/> Regenerate</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
