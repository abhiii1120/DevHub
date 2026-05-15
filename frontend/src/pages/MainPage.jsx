import HeroSection from "@/components/common/components/HeroSection";
import Navbar from "@/components/common/components/Navbar";
import { useState } from "react";

// ─── Reusable Components ───────────────────────────────────────────────────────

/** Icon using Google Material Symbols (loaded via <link> in your index.html) */
function Icon({ name, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined align-middle ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {name}
    </span>
  );

    <div>
      <h1>Hello</h1>
    </div>
  )
}

/** Pill / badge used in the hero section */
function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
      <span
        className="text-primary uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.05em", fontWeight: 600 }}
      >
        {children}
      </span>
    </div>
  );
}

/** Primary CTA button */
function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-on-primary font-bold rounded hover:shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

/** Ghost / outline button */
function OutlineButton({ children, onClick, className = "", icon }) {
  return (
    <button
      onClick={onClick}
      className={`border border-outline font-bold rounded hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center gap-2 ${className}`}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

/** Glass-morphism panel card */
function GlassCard({ children, className = "", hoverColor = "primary" }) {
  const hoverMap = {
    primary: "hover:border-primary/40",
    secondary: "hover:border-secondary/40",
    tertiary: "hover:border-tertiary/40",
  };
  return (
    <div
      className={`
        bg-[rgba(18,33,49,0.4)] backdrop-blur-[12px]
        border border-white/10 rounded
        transition-all ${hoverMap[hoverColor] ?? ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/** Tag chip used in the blog feature card */
function Tag({ children }) {
  return (
    <span className="px-2 py-1 bg-surface-container-highest text-[10px] font-bold rounded uppercase">
      {children}
    </span>
  );
}

/** Avatar stack for social proof */
function AvatarStack({ avatars }) {
  return (
    <div className="flex -space-x-3">
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-surface object-cover"
        />
      ))}
    </div>
  );
}

/** Nav link */
function NavLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="text-on-surface-variant font-medium hover:text-secondary transition-all duration-200"
    >
      {children}
    </a>
  );
}

/** Footer link */
function FooterLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="text-on-surface-variant hover:text-primary underline transition-all opacity-80 hover:opacity-100 uppercase"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.05em", fontWeight: 600 }}
    >
      {children}
    </a>
  );
}

// ─── Section Components ────────────────────────────────────────────────────────



const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcueeyfk3Nj3quRmXEMxmbn-EsMSa-9qHCJHV96PIBCQOmckdEAPSOaNJzH4vLNkDHDbJVSbZhnkj1gyfVOEWi4D_16-VUT4wkZ3BEQ03im9aFJbgE1_impnPVQlJdq88JESrXsqHuxj4at9lHoNW1iGzgqPjfrnG8Cg5pSSAqDLc5nGeZbyh3yL0DUYwdUm1DgL7A8KSgnOQNPO4PIjkN39Ids_X0rNnhHcsWisDh26HrmbDSyYwdiNEGzIkXIVoeYH4KFzVG4q4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB1a6cSi9rPYNTd0QORD8nD0B19qEkrG4c_SE4piQjNeQPQrGiVhM30qp6rwpHYNk7fxKF-P0jroz-M3xlrma2gcBrPJu4DCOjW3e_hQmaJI1qPCqmDKPwx-vz_Mp04OHc6bw0FrfK4kMo3PbPcErQOYB7rCx-Nz4p2y5Qw4wMXye0rT5D3zEw00YfOoMl1FGJ1x0paz_TqDUqsvC5DOsaoCZFqmXPQN3vnLoM0-iJ185xBkl4b34Rkc9EBvoLYElGB1_9xrXBnQ_w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAW-5mbTIdrRzWd8Pge3q9xgWojKIogYx1_pNj9x6rnIpjunx2UinqBSymqwTpjIw7RwLTGx7g_R3D60UGyNG9HLNW8Q5t79BxHoS3RWNqMMsRFwPRHRZoksisFi4UUEbt4pUk0-zxnZ0Cw2CsZ40ZV377z5mnXgj5iyk_vualRvk_V9p0FziX4QUjq-8mJgrCvg08JJL5n1O3NGMDRi1DajnFoBobSXsimn9s5r5AV0ywuTi2BSVkxX7itwZL-PRM6FdjxNCQ6m3c",
];

const BRAND_LOGOS = ["GITHUB", "VERCEL", "DOCKER", "STRIPE"];

function SocialProof() {
  return (
    <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Avatars + text */}
        <div className="flex items-center gap-4">
          <AvatarStack avatars={AVATARS} />
          <p className="font-bold text-on-surface">
            Trusted by <span className="text-primary">50,000+</span> developers
          </p>
        </div>

        {/* Brand logos */}
        <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
          {BRAND_LOGOS.map((logo) => (
            <span
              key={logo}
              className="font-black tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Code snippet shown inside the Project Sharing card */
function CodeSnippet() {
  return (
    <div className="flex-1 w-full bg-black/40 rounded p-4 border border-outline-variant/30">
      {/* Mac-style traffic lights */}
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/20 pb-2">
        <div className="w-3 h-3 rounded-full bg-error" />
        <div className="w-3 h-3 rounded-full bg-tertiary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
      {/* Code */}
      <div
        className="text-primary/80"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "18px" }}
      >
        <p className="text-on-surface-variant opacity-50">// Project.config.js</p>
        <p>
          <span className="text-secondary">export</span>{" "}
          <span className="text-tertiary">const</span> devStack = {"{"}
        </p>
        <p className="ml-4">
          name: <span className="text-secondary">"QuantumFlow"</span>,
        </p>
        <p className="ml-4">
          framework: <span className="text-secondary">"Next.js"</span>,
        </p>
        <p className="ml-4">
          status: <span className="text-secondary">"deployed"</span>
        </p>
        <p>{"}"}</p>
      </div>
    </div>
  );
}

function FeaturesBentoGrid() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          className="text-on-surface mb-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 }}
        >
          Precision Tools for Creators
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Every component is engineered to help you deploy your identity as a
          world-class engineer.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* ── Project Sharing (wide) ── */}
        <GlassCard className="md:col-span-8 p-8" hoverColor="primary">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Icon name="dynamic_feed" className="text-primary text-4xl mb-6" />
              <h3
                className="text-on-surface mb-4"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 }}
              >
                Project Sharing
              </h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                Deploy your code and showcase live previews instantly. Integrated
                with GitHub to pull your latest commits and display your
                contribution graph in real-time.
              </p>
              <ul
                className="space-y-3 text-on-surface-variant"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
              >
                {["Live Preview Integration", "Tech Stack Auto-Detection", "Collaboration Invites"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-primary text-sm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <CodeSnippet />
          </div>
        </GlassCard>

        {/* ── Portfolios (narrow) ── */}
        <GlassCard className="md:col-span-4 p-8 flex flex-col" hoverColor="secondary">
          <Icon name="account_box" className="text-secondary text-4xl mb-6" />
          <h3
            className="text-on-surface mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 }}
          >
            Portfolios
          </h3>
          <p className="text-on-surface-variant flex-grow leading-relaxed">
            An automated, SEO-optimized personal site that updates as you build.
            No maintenance required.
          </p>
          <div className="mt-8 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span
                className="opacity-60 uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.05em", fontWeight: 600 }}
              >
                Theme: Terminal Dark
              </span>
              <Icon name="arrow_forward" className="text-on-surface-variant" />
            </div>
          </div>
        </GlassCard>

        {/* ── Technical Blogs (narrow) ── */}
        <GlassCard className="md:col-span-4 p-8 flex flex-col" hoverColor="tertiary">
          <Icon name="terminal" className="text-tertiary text-4xl mb-6" />
          <h3
            className="text-on-surface mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 }}
          >
            Technical Blogs
          </h3>
          <p className="text-on-surface-variant flex-grow leading-relaxed">
            Markdown-first editor designed for engineers. Native syntax
            highlighting and LaTeX support built-in.
          </p>
          <div className="mt-8 flex gap-2">
            <Tag>Markdown</Tag>
            <Tag>KaTeX</Tag>
          </div>
        </GlassCard>

        {/* ── CTA card (wide) ── */}
        <div className="md:col-span-8 bg-primary-container/20 border border-primary/20 p-8 rounded flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3
              className="text-primary mb-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 }}
            >
              Ready to Scale?
            </h3>
            <p className="text-on-background/80">
              Join the elite circle of developers building the future of the web.
            </p>
          </div>
          <PrimaryButton className="px-10 py-4 hover:scale-105 whitespace-nowrap">
            Join Community
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-8 text-center relative z-10">
        <h2
          className="text-on-surface mb-8"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "48px", lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: 700 }}
        >
          Stop building in silence.
        </h2>
        <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">
          Join 50,000+ developers who have accelerated their careers by sharing
          their journey on DevStack.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <PrimaryButton className="px-12 py-5 text-lg hover:brightness-110">
            Get Started - It's Free
          </PrimaryButton>
          <button
            className="px-12 py-5 font-bold rounded text-lg transition-all hover:bg-white/10"
            style={{ background: "rgba(18,33,49,0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Talk to Sales
          </button>
        </div>
      </div>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[150px] pointer-events-none" />
    </section>
  );
}

const FOOTER_LINKS = ["Docs", "Community", "Changelog", "Status", "Privacy"];

function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 w-full max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="mb-8 md:mb-0">
          <span
            className="font-black text-primary uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.02em" }}
          >
            DevStack
          </span>
          <p className="mt-4 text-on-surface-variant max-w-xs opacity-80">
            © 2024 DevStack Platform. Built for Technical Precision.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link}>{link}</FooterLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DevStackPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ backgroundColor: "#051424", color: "#d4e4fa", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <main className="pt-10">
        <HeroSection />
        <SocialProof />
        <FeaturesBentoGrid />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}