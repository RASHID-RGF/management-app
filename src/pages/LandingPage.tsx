import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRef, useState } from "react";
import {
  Brain,
  Zap,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Globe,
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  ChevronLeft,
  Star,
  Layout,
  Bot,
  Kanban,
  Infinity,
  Layers,
  Search,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg-new.png";
import aboutTeamImg from "@/assets/about-team.jpg";
import serviceTasksImg from "@/assets/service-tasks.jpg";
import serviceAiImg from "@/assets/service-ai-new.png";
import serviceCollabImg from "@/assets/service-collab-new.png";
import serviceAnalyticsImg from "@/assets/service-analytics.jpg";
import blogAiImg from "@/assets/blog-ai-productivity.jpg";
import blogRealtimeImg from "@/assets/blog-realtime.jpg";
import blogDarkmodeImg from "@/assets/blog-darkmode.jpg";
import blogFutureImg from "@/assets/blog-future-work.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const services = [
  {
    icon: Kanban,
    title: "Smart Task Management",
    desc: "Kanban boards with AI prioritization. Automatically group related tasks and predict bottlenecks before they happen.",
    image: serviceTasksImg,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Bot,
    title: "Cognitive AI Assistant",
    desc: "Summarize threads, generate project briefs, and automate repetitive actions with our context-aware neural assistant.",
    image: serviceAiImg,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Users,
    title: "Hyper-Linked Collaboration",
    desc: "Real-time presence with pixel-perfect accuracy. See what your team sees and sync across time zones effortlessly.",
    image: serviceCollabImg,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Not just past stats, but future insights. Forecast project completion dates and team velocity with 95% accuracy.",
    image: serviceAnalyticsImg,
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

const features = [
  {
    title: "Neural Search",
    desc: "Find anything across your entire workspace using natural language. No more digging through folders.",
    icon: Search,
  },
  {
    title: "Enterprise Security",
    desc: "Military-grade encryption for all your data. SOC2 compliant and built with privacy-first principles.",
    icon: Lock,
  },
  {
    title: "Infinite Scalability",
    desc: "From a 3-person startup to a 10,000-person enterprise, NeuraBoard scales with your growth.",
    icon: Infinity,
  },
  {
    title: "Custom Workflows",
    desc: "Build the perfect workflow with deep integrations and a flexible automation engine.",
    icon: Layers,
  },
];

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "CTO at FuturaCloud",
    quote: "NeuraBoard has completely transformed how our engineering team ships. The AI features alone save us 10+ hours a week."
  },
  {
    name: "Sarah Chen",
    role: "Head of Product at Nexus",
    quote: "The interface is breathtaking. It's the first project management tool that our designers actually enjoy using every day."
  },
  {
    name: "Marcus Thorne",
    role: "Founder of Arca",
    quote: "Scaling from 5 to 50 people was seamless with NeuraBoard's hyper-linked collaboration. It's our digital headquarters."
  }
];

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const { user, signInWithGoogle } = useAuth();
  const orb1Y = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const orb2Y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
    }
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">NeuraBoard</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#services" className="hover:text-foreground transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#features" className="hover:text-foreground transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleGoogleSignIn} className="hidden sm:flex gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
            <Button size="sm" onClick={handleGoogleSignIn} className="gap-1.5 shadow-lg shadow-primary/20">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div style={{ y: orb1Y }} className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[130px] pointer-events-none animate-pulse" />
        <motion.div style={{ y: orb2Y }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-info/20 blur-[120px] pointer-events-none delay-1000 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-8"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Workspace
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
              >
                Operate at the <br />
                <span className="gradient-text">speed of thought.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                NeuraBoard isn't just a tool; it's your team's collective brain.
                Manage tasks, collaborate in real-time, and leverage AI to build the future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Button size="lg" onClick={handleGoogleSignIn} className="w-full sm:w-auto px-10 gap-2 text-base h-14 rounded-xl">
                  Start for Free <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleGoogleSignIn} className="w-full sm:w-auto px-10 gap-2 text-base h-14 rounded-xl">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Connect Google
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-4 text-sm text-muted-foreground"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-accent" />
                  ))}
                </div>
                <p>Joined by <span className="text-foreground font-bold font-mono">10,000+</span> teams this month</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              style={{ y: heroY }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="relative perspective-1000 hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-card transform-gpu">
                <img
                  src={heroBg}
                  alt="NeuraBoard AI Dashboard"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              </div>
              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Task Completed</div>
                    <div className="text-[10px] text-muted-foreground">Updated just now</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass p-4 rounded-xl shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">AI Insight</div>
                    <div className="text-[10px] text-muted-foreground">Velocity increased by 12%</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About / Stats */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4"
            >
              Our Impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              The platform teams <span className="gradient-text">trust most.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold">More than just project management.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                NeuraBoard was built with a simple premise: work should feel like play.
                By combining beautiful design with powerful AI, we've created a workspace
                that doesn't just store tasks — it solves them.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: "Uptime", value: "99.99%", desc: "Enterprise reliability" },
                  { label: "Deployment", value: "2x Faster", desc: "Average team speed" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm font-semibold">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.desc}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="lg" className="rounded-xl group">
                Learn our story <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-2xl"
            >
              <img src={aboutTeamImg} alt="Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shared Services Section with Sticky Images */}
      <section id="services" className="py-24 md:py-40 bg-accent/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Built for <span className="gradient-text">high-performance</span> teams.
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Focus on the work that matters. Let NeuraBoard handle the coordination.
            </p>
          </div>

          <div className="flex flex-col gap-32">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold">{service.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="space-y-4 pt-4">
                    {[1, 2, 3].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        Feature highlight and benefit text
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold group">
                    Deep dive into this feature <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                    className={`relative rounded-[2rem] overflow-hidden border border-border shadow-3xl bg-gradient-to-br ${service.color} p-4`}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                      <img src={service.image} alt={service.title} className="w-full aspect-[4/3] object-cover" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section id="features" className="py-24 md:py-32 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl group transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-24 md:py-40 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-12"
          >
            Voice of Innovation
          </motion.p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-12 italic">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </h3>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-[2rem] bg-accent mb-4 border-2 border-primary rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${TESTIMONIALS[activeTestimonial].name}`}
                      alt={TESTIMONIALS[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-xl">{TESTIMONIALS[activeTestimonial].name}</div>
                  <div className="text-primary font-medium text-sm">{TESTIMONIALS[activeTestimonial].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      activeTestimonial === i ? "bg-primary w-8" : "bg-primary/20 shadow-inner"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="p-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-primary p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40"
          >
            {/* Shapes */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-black/10 blur-3xl" />

            <Zap className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to join the <br />future of work?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-12 font-medium">
              Get started today for free. No credit card required.
              Join 50,000+ teams who are building with NeuraBoard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={handleGoogleSignIn} className="w-full sm:w-auto px-12 h-16 rounded-2xl text-lg font-bold gap-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-12 h-16 rounded-2xl text-lg font-bold border-white/20 hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="pt-24 pb-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">NeuraBoard</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Building the most intelligent workspace for the most ambitious teams.
              </p>
              <div className="flex gap-4">
                {["Twitter", "GitHub", "Discord"].map(s => (
                  <div key={s} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                    <span className="text-xs font-bold">{s[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "API", "Docs"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Security", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "GDPR"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-lg mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">© 2026 NeuraBoard. All rights reserved. Built with ❤️ for the future.</p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm font-medium text-success">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                System Status: Operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
