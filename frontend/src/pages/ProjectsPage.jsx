import Navbar from "@/components/common/components/Navbar";
import GlassCard from "@/components/common/ui/GlassCard";
import FormButton from "@/components/common/ui/FormButton";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Flame,
  Sparkles,
  Star,
  LayoutGrid,
  List,
  Bookmark,
  Heart,
  Eye,
  ArrowRight,
  Plus,
  Terminal,
  Braces,
} from "lucide-react";

// ─── Reusable Components ───────────────────────────────────────────────────────

/** Section eyebrow / label — matches SectionLabel pattern in DevStackPage */
function SectionLabel({ children }) {
  return (
    <h3
      className="uppercase mb-4 text-on-surface-variant opacity-60"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      {children}
    </h3>
  );
}

/** Mono tech tag — matches Tag in DevStackPage */
function TechTag({ children }) {
  return (
    <span
      className="border border-outline-variant/30 text-on-surface-variant px-2 py-0.5 rounded"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "13px",
        lineHeight: "18px",
      }}
    >
      {children}
    </span>
  );
}

/** Likes / views stat */
function StatPill({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-1.5 text-on-surface-variant">
      <Icon size={14} />
      <span
        className="uppercase"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.05em",
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** Footer link — identical to FooterLink in DevStackPage */
function FooterLink({ children }) {
  return (
    <a
      href="#"
      className="text-on-surface-variant hover:text-primary underline transition-all opacity-80 hover:opacity-100 uppercase"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      {children}
    </a>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "latest",   label: "Latest",   icon: Sparkles },
  { id: "popular",  label: "Popular",  icon: Star },
];

const TECHNOLOGIES = ["React", "Typescript", "Rust", "Python", "Next.JS", "Docker"];

const FOOTER_LINKS = ["Docs", "Community", "Changelog", "Privacy"];

const PROJECTS = [
  {
    id: 1,
    title: "QuantumShield API",
    author: "alex_dev",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSAFQug5Z6dOHyHKpXrDP6sHVaMohW6nHz8W3D9MddQ1fxq9Z8bXbbLiwE9pSlhSoWgNV9dtmQtTksjwOHdogpcajhitIH3wuxeWlEKSEWnfcMe1OQSPnumcTVcAOiw7aB56Rc5Wgx890MMcZMg8jg1wMCaQrkwxXA7cpfAMMhI6oZVp8xpLMJW0yDofrvN02Se4l6ASpnGWDRlUYFe0dvv4Chws5PONR2AKIBZHoNKdgP_HovNB2BflE6E4K07ldyMPo5z115K1U",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxJ4i6sFVNFkxr51CuIeffsbIw61I0EvkELb5RdPMrXdk9FHR0jPAjoRrcqFuSreVswWKS9GQTpujhcztJoOvJjH_Tw9JeomD0MB9wgltkH9r0cPAk2R9WZUusqou9ulUIw_na9U5omJNysveH270qkKVgDsO5M8x6CbsF4gM642XKKIPFRj3gV4dC4Q9ulYGouKSrhGa2yeb0AuAUZqnl9qa9Wl1hA2xg3vtywn9eveurbPz5VHqgBRfUMfu4UA07fOiRfuhtRMw",
    tags: ["Rust", "gRPC", "Wasm"],
    likes: "1.2K",
    views: "8.4K",
    featured: true,
  },
  {
    id: 2,
    title: "NeuralStack JS",
    author: "sarah_code",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUnjYScLLV2EGIHDfTo4HOVEVVHi-HFGdSC671V60aks0SQF0gbOsoWgTl9RHfMzG_omdhf-PWUGIA7gZXutUkkpfzPWx2-zuxpWDcD5oZhYkfejXYM14NnVK6666j7IO-gk1FCndSkRqv8hKLXC_NrosQUk6FUyDbFKYaRSyKewIfNQLTOgdXLfHwG0vOVB4WzTKjkanYcql1xyAFsMZAd32qIsNyQeXD8v0yp5JMaR11IMV7EbyhRiwTRHP7etxp891Nk4PrOPo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArGdZzALQcPAiZXNFlwXJrbjT-45kB1616hGSMzxRXng8fPwV2dENO3vHC7mODn3-oqHVpc923t4V0P33W2iKIOF4-tdIuJqXft8aArzZMRTIz1PtZ_-Qy1ca67_4ZZytdlhz7b2ELEayLvW8bz4p3RFMoVu0DhJa_FKJPswtXFnYEid9514THWJTb217xnx0YdyKPKnpJn8WP1IWmxy1o07_Fsi220ABYsSGcBv04Z5JRGSNmgklg-IfNEJf2GEYzCMi8B1ByjHo",
    tags: ["Node.js", "PyTorch"],
    likes: "842",
    views: "5.1K",
    featured: false,
  },
  {
    id: 3,
    title: "VortexUI Kit",
    author: "james_ux",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMM0dBH9-8y9HchB8GuYGwwSufuG6AsgmSZKkXYfnJJ5n1OnK9krBbZMiJkiiLaZiHvNbZvwcPL6XJhOJ85gjnVSUSftkmecHdTM2g8FmeHEDlImuVeCsHJZTVzRqixE5GwcYQHDoWj5k4GzQmYzkzfulQ3Y89Kl9tTSIFk4zEEnpkebfkpOJCHIhF3TnNCBH_QnL8UYxrSDMLiDMJlkPlHd9pOlCvPqE7aDrJdfYLWgUnQyv5WTKYsnOCN8zTeniujHGjDZLsqBY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8l_bIY7sQdhdRzKnfc-0h_lKL6N_Z1hao6b54BdQzR7ZVhtc5DqMJg060psxeW1ogP7gvGWmhnhFfHbmMQdEb1LaPZSnYw2k3qvf3baQTba9hsFHxjCBsz-Ugn5NiZ_y86n6VoythUV0KoUccAb5EwSYhfeF1J6Yp89kEvfqPZo91SkIvCZsdje-dOL1Feq6PPp9B3DUvUeLzuL0pR5TZ6CdL7DFJsisgi1MQCoALhFbKB-Qyc5HWP4VwQAZdBIziszIpWqahX1w",
    tags: ["React", "Tailwind", "Framer"],
    likes: "2.4K",
    views: "12K",
    featured: false,
  },
  {
    id: 4,
    title: "Titan DB Engine",
    author: "dev_marco",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADeB59Fv1Ok7uwlzixXFqNve2B97RTgyZhxqIwyKIgdCVD8E_182ectgBaciMD6Jrcgn_BihW1zsKuLE_soW8I2UWJqPqIgBKCFMu5CBL7mNpxDMF61egyogSrLHxFIDnS6cvtFbec1wGShPm8_5lW-L-tKx0xQ7BnNURW5YhfC-SqQepuHjUfBLzun4WUAeMVrA5TmYO-g-b__fwHXfzFaHv0gdWkKJp00tjlRA6IEE8lqgaX9L6CVlcpzztqmQsTjctf4Nwejpc",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNPN48NbeyFwH_fgZWek2wSSpqJDnBnbwMnFS9Lpjd71jKnhcDu0CLiRppmsmZeDBu-I3_spy8fCTC9Ncpdhxx7ZyyW9E0DA_2o6XVrEnjL5biSZ32co9WTY0dmjwur8Rv7aVHu5c1eTBaQcgRECD_CP-vTOHf5EDgvDYi60nfXLYA7NPhjMkKdw_pMBM4n5dr4tk3vypD63UPD-qhBRPAPdxC3vlgf37jX-7Aq90svNBPQENtDf-JMrIUvp6u6jW-xLqVLLRhhlM",
    tags: ["Go", "RocksDB"],
    likes: "621",
    views: "3.2K",
    featured: false,
  },
];

// ─── Section Components ────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    // GlassCard wraps — same as every card in DevStackPage's bento grid
    <GlassCard className="overflow-hidden p-0 group" hoverColor="primary">
      {/* thumbnail */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
        {project.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-on-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-md rounded">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2
            className="text-on-surface group-hover:text-primary transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              lineHeight: "28px",
              letterSpacing: "-0.01em",
              fontWeight: 600,
            }}
          >
            {project.title}
          </h2>
          <button
            onClick={() => setBookmarked((p) => !p)}
            className="text-outline hover:text-primary transition-colors cursor-pointer"
            aria-label="Bookmark"
          >
            <Bookmark
              size={18}
              className={bookmarked ? "fill-primary text-primary" : ""}
            />
          </button>
        </div>

        {/* author */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={project.avatar}
            alt={project.author}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-on-surface-variant">{project.author}</span>
        </div>

        {/* tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>

        {/* footer */}
        <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
          <div className="flex gap-4">
            <StatPill icon={Heart} value={project.likes} />
            <StatPill icon={Eye}   value={project.views} />
          </div>
          <button className="text-primary hover:text-on-surface transition-colors cursor-pointer">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function AddProjectCard() {
  return (
    <article className="group rounded flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-all min-h-[400px] cursor-pointer bg-gradient-to-br from-[rgba(18,33,49,0.7)] to-[rgba(5,20,36,0.8)] backdrop-blur-md">
      <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
        <Plus size={28} className="text-outline group-hover:text-primary" />
      </div>
      <p
        className="text-outline group-hover:text-primary uppercase transition-all"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.05em",
          fontWeight: 600,
        }}
      >
        Submit Your Project
      </p>
    </article>
  );
}

function Sidebar({ activeSort, setActiveSort }) {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-8">
      {/* sort */}
      <div>
        <SectionLabel>Sort By</SectionLabel>
        <ul className="space-y-2">
          {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => setActiveSort(id)}
                className={`flex items-center gap-3 w-full p-2 rounded font-medium transition-all text-sm ${
                  activeSort === id
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="bg-outline-variant/20" />

      {/* technologies */}
      <div>
        <SectionLabel>Technologies</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {TECHNOLOGIES.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-surface-container-highest border-0 text-primary text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:bg-primary/10 transition-colors rounded"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="bg-outline-variant/20" />

      {/* CTA card — same pattern as the "Ready to Scale?" card in DevStackPage */}
      <GlassCard className="p-6" hoverColor="primary">
        <h4
          className="text-primary mb-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "-0.01em",
            fontWeight: 600,
          }}
        >
          Build Together
        </h4>
        <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
          Join our community of 50k+ developers and showcase your latest
          innovations.
        </p>
        <FormButton className="w-full py-2 bg-primary text-on-primary hover:brightness-110 active:scale-95 rounded">
          Start Coding
        </FormButton>
      </GlassCard>
    </aside>
  );
}

function ProjectsGrid() {
  const [activeSort, setActiveSort] = useState("trending");
  const [view, setView] = useState("grid");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Sidebar activeSort={activeSort} setActiveSort={setActiveSort} />

      <section className="flex-grow">
        {/* header row */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1
              className="text-on-surface mb-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "32px",
                lineHeight: "40px",
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              Explore Projects
            </h1>
            <p className="text-on-surface-variant">
              Discover the next big thing in the developer ecosystem.
            </p>
          </div>

          {/* view toggle */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded transition-colors ${
                view === "grid"
                  ? "bg-surface-container-highest text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded transition-colors ${
                view === "list"
                  ? "bg-surface-container-highest text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <AddProjectCard />
        </div>

        {/* load more — same ghost-glass button style as DevStackPage's "Talk to Sales" */}
        <div className="mt-12 flex justify-center">
          <button
            className="px-12 py-4 font-bold rounded transition-all hover:bg-white/10"
            style={{
              background: "rgba(18,33,49,0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.05em",
            }}
          >
            LOAD MORE PROJECTS
          </button>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 w-full max-w-[1440px] mx-auto">
        {/* brand */}
        <div className="mb-8 md:mb-0">
          <span
            className="font-black text-primary uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "-0.02em",
            }}
          >
            DevStack
          </span>
          <p className="mt-4 text-on-surface-variant max-w-xs opacity-80">
            © 2026 DevStack Platform. Built for Technical Precision.
          </p>
        </div>

        {/* links */}
        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link}>{link}</FooterLink>
          ))}
        </div>

        {/* icon buttons */}
        <div className="mt-8 md:mt-0 flex gap-4">
          {[Terminal, Braces].map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:text-primary hover:bg-primary/10 transition-all border border-outline-variant/20"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ backgroundColor: "#051424", color: "#d4e4fa", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-8 py-12 mt-20">
        <ProjectsGrid />
      </main>
      <Footer />
    </div>
  );
}