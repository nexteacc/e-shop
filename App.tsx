import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Mail,
  Globe,
  MapPin
} from 'lucide-react';

// --- Utilities ---

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WHAT WE DO', href: '#about' },
    { name: 'NEWS', href: '#news' },
    { name: 'OUR BRANDS', href: '#brands' },
    { name: 'WORK PROCESS', href: '#process' },
    { name: 'CONTACT US', href: '#contact', primary: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-lush-cream/95 backdrop-blur-md py-4 shadow-sm border-b border-lush-dark/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="group">
          <div className="flex items-center gap-1 font-black text-2xl tracking-wide text-lush-dark">
            <span className="text-lush-accent text-3xl font-serif italic">U</span>SHOPAL
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-xs font-bold tracking-widest transition-all duration-300 hover:text-lush-accent ${link.primary ? 'bg-lush-dark text-lush-cream px-6 py-2.5 rounded-sm hover:bg-lush-accent hover:text-white' : 'text-lush-dark/80'}`}
            >
              {link.name}
            </a>
          ))}
          <span className="text-xs font-bold tracking-widest text-lush-accent ml-6 cursor-pointer hover:opacity-70">EN / CN</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-lush-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-lush-cream border-t border-lush-dark/10 shadow-xl transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-8 px-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold tracking-widest text-lush-dark hover:text-lush-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-lush-cream">
      <div className={`absolute top-0 right-0 w-full md:w-[55%] h-full z-0 transition-opacity duration-1000 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop" 
          alt="Model Portrait" 
          className="w-full h-full object-cover opacity-90 object-top grayscale-[20%] transition-transform duration-[20s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lush-cream via-lush-cream/60 to-transparent md:via-lush-cream/20"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full pointer-events-none">
        <div className={`max-w-2xl mt-20 md:mt-0 pointer-events-auto transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-[12vw] md:text-[6.5rem] leading-[0.85] font-black text-lush-dark mb-8 tracking-tighter">
            <span className="block relative">
              <span className="absolute -left-1 md:-left-3 top-0 text-lush-accent font-serif italic pr-1">U</span>
              <span className="pl-[8vw] md:pl-[4.5rem]">SHOPAL</span>
            </span>
          </h1>
          <FadeIn delay={200}>
            <h2 className="text-3xl md:text-5xl font-medium text-lush-dark/90 mb-10 uppercase tracking-tight font-serif">
              Luxe Beauty Brand <br/> Equity Partner
            </h2>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg md:text-xl text-lush-dark/70 font-light max-w-md leading-relaxed border-l-2 border-lush-accent pl-6">
              The Fastest Growing Brand Platform <br/>
              Building and Investing in the Iconic Brands of the Future
            </p>
          </FadeIn>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-2 animate-pulse opacity-50">
        <div className="text-[10px] uppercase tracking-widest text-lush-dark writing-vertical-rl">Scroll</div>
        <div className="w-[1px] h-12 bg-lush-dark"></div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { value: "4", label: "Global Luxury Brands Direct Equity" },
    { value: "200+", label: "Direct Retail Store Exposure" },
    { value: "700", suffix: "Million +", label: "GMV Annual Run Rate (RMB)" }
  ];

  return (
    <section className="bg-lush-dark text-lush-cream py-20 border-t border-white/10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 150} className={`flex flex-col justify-center ${idx > 0 ? 'pt-12 md:pt-0 md:pl-12' : ''}`}>
              <div className="flex items-baseline mb-3 justify-center md:justify-start">
                <span className="text-6xl md:text-8xl font-light font-serif">{stat.value}</span>
                {stat.suffix && <span className="text-2xl md:text-4xl font-light ml-2 text-lush-accent">{stat.suffix}</span>}
                {!stat.suffix && <span className="text-4xl ml-1 font-light text-lush-accent opacity-80">+</span>}
              </div>
              <p className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-70 mt-2 max-w-[240px] mx-auto md:mx-0">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-lush-dark text-lush-cream py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn className="flex flex-col">
             <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest leading-tight mb-6">
               About <br/><span className="text-lush-accent font-serif italic">U</span>SHOPAL
             </h2>
             <div className="h-1 w-24 bg-lush-accent mb-12"></div>
             
             {/* New Image Added Here */}
             <div className="w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden relative grayscale-[30%] hover:grayscale-0 transition-all duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop" 
                 alt="Luxury Fashion Model" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-lush-dark/10"></div>
             </div>
          </FadeIn>

          <FadeIn delay={200} className="flex flex-col justify-center space-y-10 md:pt-24">
            <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white/90">
              Growth <br/> Partners
            </h3>
            <div className="space-y-8 text-lg font-light text-white/70 leading-relaxed max-w-lg">
              <p className="border-l border-white/20 pl-6">
                We take luxury beauty brands from startup to market leaders.
                We invest in founders developing the iconic brands of tomorrow.
              </p>
              <p>
                We are beauty brand equity partners.
                The only luxury beauty player combining the future of the East and West.
              </p>
            </div>
            <div className="pt-4">
              <button className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase hover:text-lush-accent transition-colors">
                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  return (
    <section id="news" className="bg-lush-cream py-24 md:py-32 border-t border-lush-dark/10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-lush-dark mb-12 tracking-tight">
            News & <br/> Updates
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FadeIn delay={100}>
            <div className="bg-white p-8 border border-lush-dark/10 hover:border-lush-accent transition-colors">
              <p className="text-xs uppercase tracking-widest text-lush-dark/40 mb-4">Latest</p>
              <h3 className="text-xl font-bold text-lush-dark mb-4">Expanding Our Brand Portfolio</h3>
              <p className="text-sm text-lush-dark/70 leading-relaxed">
                We continue to strengthen our position as a leading luxury beauty equity partner across APAC.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-white p-8 border border-lush-dark/10 hover:border-lush-accent transition-colors">
              <p className="text-xs uppercase tracking-widest text-lush-dark/40 mb-4">Partnership</p>
              <h3 className="text-xl font-bold text-lush-dark mb-4">Strategic Retail Expansion</h3>
              <p className="text-sm text-lush-dark/70 leading-relaxed">
                Opening new retail locations in key markets to serve our growing customer base.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="bg-white p-8 border border-lush-dark/10 hover:border-lush-accent transition-colors">
              <p className="text-xs uppercase tracking-widest text-lush-dark/40 mb-4">Innovation</p>
              <h3 className="text-xl font-bold text-lush-dark mb-4">Sustainability Initiatives</h3>
              <p className="text-sm text-lush-dark/70 leading-relaxed">
                Leading the industry in ethical sourcing and sustainable beauty practices.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const WorkProcessSection = () => {
  return (
    <section id="process" className="bg-lush-dark text-lush-cream py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-white mb-12 tracking-tight">
            Our Work <br/> Process
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          <FadeIn delay={100}>
            <div className="flex flex-col">
              <div className="text-6xl font-serif text-lush-accent mb-6">01</div>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-widest">Discovery</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                We identify and evaluate emerging luxury beauty brands with exceptional potential.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col">
              <div className="text-6xl font-serif text-lush-accent mb-6">02</div>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-widest">Investment</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Strategic equity partnerships and capital infusion to accelerate growth.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col">
              <div className="text-6xl font-serif text-lush-accent mb-6">03</div>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-widest">Development</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Leveraging our expertise to build brand equity and market presence.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="flex flex-col">
              <div className="text-6xl font-serif text-lush-accent mb-6">04</div>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-widest">Scale</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Expanding reach through retail networks and digital platforms across APAC.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const BrandPortfolioIntro = () => {
  return (
    <section className="bg-lush-cream py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold uppercase text-lush-dark mb-6 tracking-tight">
              Our Brand <br/> Portfolio
            </h2>
            <p className="text-xl md:text-2xl font-serif italic text-lush-dark/70 border-b border-lush-dark pb-8 inline-block max-w-xl leading-normal">
              Direct Equity Ownership in 4 Global Luxury Beauty Brands
            </p>
            <div className="mt-12">
                <a href="#" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-lush-accent transition-colors">
                  View All 14 Brands Across APAC
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </a>
            </div>
          </FadeIn>

          {/* New Abstract Image Added Here */}
          <FadeIn delay={200}>
            <div className="relative aspect-square md:aspect-[5/4] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550614000-4b9519e00766?q=80&w=1200&auto=format&fit=crop" 
                alt="Brand Portfolio" 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s]"
                loading="lazy"
              />
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 md:p-6 max-w-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xs font-bold tracking-widest uppercase mb-1 text-lush-dark">Curated Excellence</p>
                <p className="font-serif italic text-lush-dark/60 text-sm">Defining the future standard of luxury beauty through strategic selection.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

interface BrandProps {
  name: string;
  image: string;
  logoFont?: string;
  layout?: 'wide' | 'tall';
  category?: 'equity' | 'licensed';
}

const BrandCard = ({ name, image, logoFont, layout = 'tall', category }: BrandProps) => {
  return (
    <div className="group relative bg-white transition-all duration-500 hover:shadow-2xl overflow-hidden cursor-pointer h-full flex flex-col">
      <div className="p-8 pb-4 bg-white z-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-lush-dark group-hover:bg-lush-accent transition-colors"></div>
          <div className="flex-1">
            <h3 className={`text-xl md:text-2xl uppercase tracking-widest text-lush-dark group-hover:text-lush-accent transition-colors ${logoFont || 'font-serif'}`}>{name}</h3>
            {category && (
              <span className={`text-[9px] uppercase tracking-widest mt-1 inline-block ${
                category === 'equity' 
                  ? 'text-lush-accent' 
                  : 'text-lush-dark/50'
              }`}>
                {category === 'equity' ? 'Direct Equity' : 'Licensed'}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={`w-full overflow-hidden flex-grow relative ${layout === 'tall' ? 'aspect-[4/5]' : 'aspect-video'}`}>
        <div className="absolute inset-0 bg-lush-dark/0 group-hover:bg-lush-dark/10 transition-colors z-10 duration-500"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <div className="bg-white p-3 rounded-full text-lush-dark shadow-lg">
             <ArrowRight size={20} />
           </div>
        </div>
      </div>
    </div>
  );
};

const BrandsGrid = () => {
  return (
    <section id="brands" className="bg-lush-cream pb-32">
      <div className="container mx-auto px-6 md:px-12 space-y-24">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 border-r border-lush-dark/10 p-4 flex flex-col justify-between hidden lg:flex">
             <div className="text-xs font-bold tracking-widest text-lush-dark/40 uppercase writing-vertical-lr h-32">
               Equity Partners
             </div>
             <div className="text-xs font-bold tracking-widest text-lush-dark/40 uppercase">
               01 — 03
             </div>
          </div>
          <FadeIn delay={100} className="lg:col-span-1 h-full">
             <BrandCard 
               name="Chantecaille" 
               image="/chantecaille.png"
               category="equity"
             />
          </FadeIn>
          <FadeIn delay={200} className="lg:col-span-1 h-full">
             <BrandCard 
               name="RMK" 
               image="/rmk.png"
               category="equity"
             />
          </FadeIn>
          <FadeIn delay={300} className="lg:col-span-1 h-full">
             <BrandCard 
               name="BULK Homme" 
               image="/bulk-homme.png"
               logoFont="font-sans font-black"
               category="equity"
             />
          </FadeIn>
        </div>

        {/* Row 2 - Wide */}
        <div>
          <FadeIn>
            <div className="flex justify-between items-end mb-12 border-t border-lush-dark pt-8">
              <h3 className="text-3xl font-serif italic text-lush-dark">Strategic Partnerships</h3>
              <span className="text-xs font-bold tracking-widest text-lush-dark/40 uppercase">Global Reach</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <FadeIn delay={100}><BrandCard 
               name="Molton Brown" 
               image="/molton-brown.png"
               layout="wide"
               category="licensed"
             /></FadeIn>
             <FadeIn delay={200}><BrandCard 
               name="Phyto" 
               image="/phyto.png"
               layout="wide"
               logoFont="font-sans font-bold"
               category="licensed"
             /></FadeIn>
             <FadeIn delay={300}><BrandCard 
               name="SUQQU" 
               image="/suqqu.png"
               layout="wide"
               category="licensed"
             /></FadeIn>
          </div>
        </div>

        {/* Row 3 - Wide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <FadeIn delay={100}><BrandCard 
               name="ARgENTUM" 
               image="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1200&auto=format&fit=crop"
               layout="wide"
               logoFont="font-sans"
               category="licensed"
             /></FadeIn>
             <FadeIn delay={200}><BrandCard 
               name="Juliette has a gun" 
               image="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop"
               layout="wide"
               logoFont="font-serif italic"
               category="licensed"
             /></FadeIn>
        </div>
      </div>
    </section>
  );
};

const MetricsSection = () => {
  return (
    <section className="bg-lush-cream border-t border-lush-dark/10 py-24 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#281E15 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
          
          {/* Metric 1 */}
          <FadeIn className="flex flex-col space-y-6">
            <h4 className="text-xl uppercase tracking-widest text-lush-dark/60 border-b border-lush-dark/20 pb-4">
              Average Ticket Value
            </h4>
            <div className="flex items-baseline text-lush-dark">
              <span className="text-4xl mr-4 opacity-50 font-serif italic">&gt;</span>
              <span className="text-xl mr-2 font-bold">¥</span>
              <span className="text-8xl md:text-[7rem] lg:text-[6rem] xl:text-[7rem] leading-none font-serif">5000</span>
            </div>
            <div className="pt-4">
               <div className="flex items-center gap-4 mt-6">
                 <div className="text-5xl font-serif text-lush-accent">BC</div>
                 <div className="text-xs uppercase tracking-widest opacity-60">Bonnie & Clyde <br/> Developed in 2020</div>
               </div>
            </div>
          </FadeIn>

          {/* Center Image - New */}
          <FadeIn delay={100} className="hidden lg:block h-full">
            <div className="h-full min-h-[400px] w-full relative overflow-hidden rounded-sm">
                <img 
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop" 
                    alt="Cosmetics Art" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
            </div>
          </FadeIn>

          {/* Metric 2 */}
          <FadeIn delay={200} className="flex flex-col space-y-6">
            <h4 className="text-xl uppercase tracking-widest text-lush-dark/60 border-b border-lush-dark/20 pb-4">
              CBEC Shanghai Delivery
            </h4>
            <div className="flex items-baseline text-lush-dark">
              <span className="text-8xl md:text-[7rem] lg:text-[6rem] xl:text-[7rem] leading-none font-serif">4</span>
              <span className="text-4xl md:text-5xl font-bold ml-4 font-serif italic text-lush-accent">Hours</span>
            </div>
            <div className="pt-4">
               <p className="text-base lg:text-lg text-lush-dark/80 leading-relaxed">
                 Bonnie & Clyde, developed in 2020, has over 10M users in the coveted 28-35yr old range, commanding the highest ATV in multi-brand beauty.
               </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const SustainabilitySection = () => {
  return (
    <section className="relative bg-lush-dark text-lush-cream overflow-hidden">
      {/* Top Banner Text */}
      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <FadeIn className="flex flex-col justify-end min-h-[40vh]">
          
          {/* Text Section - Horizontal Layout above Title */}
          <div className="w-full flex flex-col md:flex-row justify-end items-start md:items-center gap-6 md:gap-8 mb-4 md:mb-8">
             <p className="text-sm md:text-lg font-light opacity-80 leading-relaxed max-w-xl text-left md:text-right order-2 md:order-1">
               Embracing the movement towards conscious beauty, we ensure <span className="underline decoration-lush-accent underline-offset-4">our unwavering commitment to sustainability resonates</span> with the values of the emerging generation.
             </p>
             
             {/* Divider + Tag */}
             <div className="flex items-center gap-4 shrink-0 order-1 md:order-2">
                <p className="text-xs font-bold uppercase tracking-widest text-lush-accent whitespace-nowrap">
                  Ethically Sourced
                </p>
                <div className="w-12 h-[1px] bg-lush-accent hidden md:block"></div>
             </div>
          </div>

          {/* Title Section */}
          <h2 className="text-[14vw] leading-[0.8] font-bold uppercase tracking-tighter text-white whitespace-nowrap -ml-1 md:-ml-2">
            Sustain<span className="text-lush-accent">ability</span>
          </h2>

        </FadeIn>
      </div>

      {/* Image Shelf */}
      <div className="w-full h-[50vh] relative mt-[-5vh] md:mt-[-10vh]">
        <img 
          src="/sustainability-shelf.png" 
          alt="Sustainability Shelf" 
          className="w-full h-full object-cover sepia-[.3] brightness-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lush-dark via-transparent to-lush-dark/50"></div>
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-lush-dark to-transparent"></div>
      </div>
    </section>
  );
};

const DetailedStats = () => {
  return (
    <section className="bg-lush-dark text-lush-cream py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Stat 1 */}
          <FadeIn delay={0} className="pr-8 pt-8 md:pt-0">
            <h4 className="text-xs uppercase tracking-[0.2em] text-lush-gray mb-8 pb-2 border-b border-white/10 w-24">Brands</h4>
            <div className="text-base text-lush-gray mb-12 h-12 font-light">4 invested and 10 licensed brands</div>
            <div className="text-8xl md:text-9xl font-light font-serif flex items-start text-white">
              14<span className="text-4xl mt-4 text-lush-accent">+</span>
            </div>
            <div className="mt-12 border-t border-white/10 pt-6">
              <h5 className="text-xl uppercase font-serif mb-2 text-white/90">Bonnie & Clyde</h5>
              <p className="text-xs text-lush-gray leading-relaxed max-w-xs font-light">
                Bonnie & Clyde developed in 2020 has over 10M user base, commanding the highest ATV in multi-brand beauty.
              </p>
            </div>
          </FadeIn>

          {/* Stat 2 */}
          <FadeIn delay={200} className="md:pl-12 pt-8 md:pt-0">
            <h4 className="text-xs uppercase tracking-[0.2em] text-lush-gray mb-8 pb-2 border-b border-white/10 w-24">Employees</h4>
            <div className="text-base text-lush-gray mb-12 h-12 font-light">HQ in Shanghai, with a global infrastructure network</div>
            <div className="text-8xl md:text-9xl font-light font-serif flex items-start text-white">
              250<span className="text-4xl mt-4 text-lush-accent">+</span>
            </div>
            <div className="mt-12 border-t border-white/10 pt-6">
              <h5 className="text-xl uppercase font-serif mb-2 text-white/90">Retail Store</h5>
              <p className="text-xs text-lush-gray leading-relaxed max-w-xs font-light">
                Over 200 direct retail store exposure across premium locations.
              </p>
            </div>
          </FadeIn>

          {/* Stat 3 */}
          <FadeIn delay={400} className="md:pl-12 pt-8 md:pt-0">
            <h4 className="text-xs uppercase tracking-[0.2em] text-lush-gray mb-8 pb-2 border-b border-white/10 w-24">Offices</h4>
            <div className="text-base text-lush-gray mb-12 h-12 font-light">8 offices across Asia, Europe, and the Americas</div>
            <div className="text-8xl md:text-9xl font-light font-serif flex items-start text-white">
              8
            </div>
            <div className="mt-12 border-t border-white/10 pt-6">
              <h5 className="text-xl uppercase font-serif mb-2 text-white/90">Luxury Spas</h5>
              <p className="text-xs text-lush-gray leading-relaxed max-w-xs font-light">
                Our luxury spas perform over 7 million treatments annually.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const RetailLocations = () => {
  const locations = [
    { name: "Hainan Hailu Duty-Free", image: "/retail-hainan.png" },
    { name: "Nanjing De Ji", image: "/retail-nanjing.png" },
    { name: "Haikou International Duty-Free", sub: "Shopping Complex | 2023", image: "/retail-haikou.png" },
    { name: "Shenzhen", sub: "2024", image: "/retail-shenzhen.png" }
  ];

  return (
    <section className="bg-lush-dark text-lush-cream py-24">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
           <div>
             <h3 className="text-sm font-bold tracking-widest uppercase mb-2">Retail Presence</h3>
             <p className="text-xs text-white/50 font-light">Representative locations from 200+ stores</p>
           </div>
           <div className="flex gap-4 text-xs opacity-60">
             <span className="hidden md:inline">Shanghai Taikoo</span>
             <span className="hidden md:inline">Shanghai Jingan Kerry</span>
             <span className="hidden md:inline">Shanghai Kee Club</span>
           </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <FadeIn key={idx} delay={idx * 150} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/5 mb-4 bg-white/5">
                 <div className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-widest uppercase opacity-70 drop-shadow-md">USHOPAL</div>
                 <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all"></div>
              </div>
              <h4 className="text-lg font-medium tracking-wide group-hover:text-lush-accent transition-colors">{loc.name}</h4>
              {loc.sub && <p className="text-sm opacity-50 mt-1 font-light tracking-wide">{loc.sub}</p>}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-lush-cream py-20 border-t border-lush-dark/10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn className="flex flex-col items-center justify-center space-y-12">
          
          <div className="text-center">
             <h3 className="text-2xl md:text-3xl font-light text-lush-dark mb-10 uppercase tracking-widest font-serif">Contact Us</h3>
             <div className="flex gap-8 justify-center text-lush-dark">
                <a href="#" className="hover:text-lush-accent hover:-translate-y-1 transition-all duration-300"><Mail size={28} strokeWidth={1.2} /></a>
                <a href="#" className="hover:text-lush-accent hover:-translate-y-1 transition-all duration-300"><Instagram size={28} strokeWidth={1.2} /></a>
                <a href="#" className="hover:text-lush-accent hover:-translate-y-1 transition-all duration-300"><Globe size={28} strokeWidth={1.2} /></a>
                <a href="#" className="hover:text-lush-accent hover:-translate-y-1 transition-all duration-300"><Facebook size={28} strokeWidth={1.2} /></a>
                <a href="#" className="hover:text-lush-accent hover:-translate-y-1 transition-all duration-300"><Linkedin size={28} strokeWidth={1.2} /></a>
             </div>
          </div>

          <div className="text-center text-[10px] md:text-xs text-lush-dark/40 uppercase tracking-[0.2em] mt-12">
            <p>&copy; 2024 Ushopal.com is a registered trademark. All rights reserved.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="font-sans antialiased text-lush-dark selection:bg-lush-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection />
      <NewsSection />
      <BrandPortfolioIntro />
      <BrandsGrid />
      <MetricsSection />
      <WorkProcessSection />
      <SustainabilitySection />
      <RetailLocations />
      <DetailedStats />
      <Footer />
    </div>
  );
};

export default App;