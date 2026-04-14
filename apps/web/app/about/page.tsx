import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const team = [
  { name: "Amara Osei", role: "Founder & CEO", linkedin: "https://linkedin.com", email: "mailto:hello@poneglyph.io", initials: "AO", image: "avatar-amara.png" },
  { name: "Priya Sharma", role: "Co-founder & CTO", linkedin: "https://linkedin.com", email: "mailto:hello@poneglyph.io", initials: "PS", image: "avatar-priya.png" },
  { name: "Lucas Mendes", role: "Head of Product", linkedin: "https://linkedin.com", initials: "LM", image: "avatar-lucas.png" },
  { name: "Fatima Al-Rashid", role: "Head of AI Research", linkedin: "https://linkedin.com", email: "mailto:hello@poneglyph.io", initials: "FA", image: "avatar-fatima.png" },
  { name: "James Okonkwo", role: "Founding Engineer", linkedin: "https://linkedin.com", email: "mailto:hello@poneglyph.io", initials: "JO", image: "avatar-james.png" },
];

const partners = [
  "UNICEF", "Oxfam", "Save The Children", "Red Cross", "Care International",
  "World Vision", "Médecins Sans Frontières", "Action Against Hunger",
];

function LogoTicker() {
  return (
    <div className="w-full overflow-hidden py-8 border-y border-grey-3">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {partners.concat(partners).map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 text-sm font-medium text-grey-2 whitespace-nowrap"
            >
              <div className="w-5 h-5 bg-grey-3 rounded-full" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-40 flex items-center justify-center">
        <div className="absolute inset-0 dots-pattern pointer-events-none" aria-hidden />
        <div className="container-max relative z-10 text-center">
          <h1 className="text-[clamp(44px,6vw,70px)] font-medium leading-[1em] tracking-[-0.03em] text-black max-w-2xl mx-auto">
            Poneglyph transforms fragmented field data into global intelligence
          </h1>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 bg-white">
        <div className="container-max flex flex-col gap-20">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <h2 className="text-[clamp(36px,4vw,48px)] font-medium leading-tight tracking-tight text-black shrink-0 md:w-[280px]">
              Our story
            </h2>
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-[20px] font-medium text-black leading-snug">
                It all started with a frustrating reality: NGOs sit on terabytes of critical field data while researchers and journalists struggle to access accurate intelligence.
              </p>
              <p className="text-sub font-medium uppercase tracking-widest text-grey-1 mb-1">The problem we saw</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-body text-grey-1 leading-relaxed">
                  Before founding Poneglyph, our team spent years working directly with NGOs across three continents. The same story repeated everywhere — valuable data trapped in silos, unable to inform global task forces.
                </p>
                <p className="text-body text-grey-1 leading-relaxed">
                  We founded Poneglyph in 2024 to fix the data layer. AI-managed ingestion, real-time analytics, and a shared intelligence commons that finally lets datasets cross borders and inform policy.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[520px] rounded-2xl overflow-hidden relative">
            <Image
              src="/images/team-photo.png"
              alt="Poneglyph team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Logo Ticker ── */}
      <LogoTicker />

      {/* ── Quote ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-max flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1 flex flex-col gap-10">
            <blockquote className="text-[clamp(28px,4vw,48px)] font-medium leading-tight tracking-tight text-black">
              &ldquo;The biggest barrier to solving global crises isn't a lack of data — it's our inability to share and interpret it correctly.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/avatar-amara.png"
                  alt="Amara Osei"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-black">Amara Osei</p>
                <p className="text-sm text-grey-1">Founder &amp; CEO @Poneglyph</p>
              </div>
            </div>
          </div>
          <div className="flex-1 h-[400px] rounded-2xl overflow-hidden relative">
            <video
              src="/videos/poneglyph-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 bg-grey-4">
        <div className="container-max flex flex-col items-center gap-8 max-w-[500px] mx-auto text-center">
          <h2 className="text-[clamp(22px,3vw,28px)] font-medium leading-snug text-black">
            Data silos have always been the missing layer in humanitarian work.
          </h2>
          <div className="text-body text-grey-1 leading-relaxed space-y-4 text-left">
            <p>
              Every humanitarian organization faces the same invisible tax: time spent manually analyzing reports, translating local data, and struggling to correlate regional trends globally.
            </p>
            <p>The field data was everywhere. The connected intelligence layer was missing.</p>
            <ul className="space-y-1">
              {[
                "Dataset ingestion from any NGO ✓",
                "AI-extracted trend insights ✓",
                "Publicly accessible intelligence ✓",
                "Agentic research terminal ✓",
                "Autonomous campaign orchestration ✓",
                "Open API for researchers ✓",
              ].map((item) => (
                <li key={item} className="text-black font-medium">{item}</li>
              ))}
            </ul>
            <p>
              Poneglyph brings all of it into one platform — so NGOs can publish data, and task forces can act.
            </p>
            <p className="font-medium text-black">This is what we built. And it works.</p>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 dots-pattern pointer-events-none" aria-hidden />
        <div className="container-max relative z-10 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <p className="text-sub font-medium uppercase tracking-widest text-grey-1">the team</p>
            <h2 className="text-[clamp(28px,4vw,36px)] font-medium leading-tight tracking-tight text-black max-w-md">
              Powered by people who give a damn
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 p-5 bg-white border border-grey-3 rounded-2xl hover:border-grey-2 transition-colors"
              >
                <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-grey-4">
                  <Image
                    src={`/images/${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-black">{member.name}</p>
                  <p className="text-xs text-grey-1">{member.role}</p>
                </div>
                <div className="flex items-center gap-1">
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-grey-1 hover:text-black hover:bg-grey-4 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={14} />
                    </Link>
                  )}
                  {member.email && (
                    <Link
                      href={member.email}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-grey-1 hover:text-black hover:bg-grey-4 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4">
        <div className="max-w-container mx-auto">
          <div className="relative bg-black rounded-2xl px-8 py-20 flex flex-col items-center gap-8 overflow-hidden text-center">
            <div className="absolute inset-0 dots-pattern pointer-events-none" aria-hidden />
            <p className="text-sub font-medium uppercase tracking-widest text-grey-2 relative z-10">
              Join the team
            </p>
            <h2 className="text-[clamp(36px,5vw,60px)] font-medium leading-tight tracking-tight text-white relative z-10 max-w-xl">
              Help us turn humanitarian data into action.
            </h2>
            <Link
              href="/careers#openpositions"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-medium rounded-xl hover:bg-primary/80 transition-colors relative z-10"
            >
              View open positions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}