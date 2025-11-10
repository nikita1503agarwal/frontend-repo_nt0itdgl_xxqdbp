import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Generator from './components/Generator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F7F9', fontFamily: 'Inter, Manrope, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <Hero />
      <HowItWorks />
      <Generator />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
