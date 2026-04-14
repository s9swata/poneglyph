import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    description: "For researchers and journalists querying our public dataset.",
    cta: "Start exploring",
    ctaHref: "/contact",
    highlighted: false,
    features: [
      "Public dataset access",
      "AI research terminal (1,000 queries/mo)",
      "Trend reports & published insights",
      "Attribution-free download",
      "Community forum access",
    ],
  },
  {
    name: "Contributor",
    price: "$49",
    period: "/mo",
    description: "For NGOs submitting data and receiving AI insights at scale.",
    cta: "Start free trial",
    ctaHref: "/contact",
    highlighted: true,
    features: [
      "Dataset submission portal",
      "AI-cleaned data feedback loop",
      "Insights published under your NGO's attribution",
      "Campaign orchestration tools",
      "Priority support + Data export",
    ],
  },
  {
    name: "Partner",
    price: "Custom",
    period: "",
    description: "For networks needing API access, custom AI runs, and white-label intelligence.",
    cta: "Talk to us",
    ctaHref: "/contact",
    highlighted: false,
    features: [
      "Full REST API access",
      "Custom agentic research runs",
      "Co-published intelligence briefs",
      "Dedicated data analyst",
      "White-label option + Custom SLA",
    ],
  },
];

const faqs = [
  {
    q: "Is the data really free to access?",
    a: "Yes, all published insights are publicly accessible, forever.",
  },
  {
    q: "What data formats can NGOs submit?",
    a: "CSV, JSON, PDF reports, and direct API push. We handle cleaning.",
  },
  {
    q: "How do AI insights get published?",
    a: "Our agents run nightly extraction passes and publish findings with source attribution.",
  },
  {
    q: "Is submitted data kept private?",
    a: "Raw submissions are never made public. Only aggregated, AI-processed insights are surfaced.",
  },
  {
    q: "Can I query the data programmatically?",
    a: "Yes, via our Research API (Contributor tier and above).",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navigation />
      {/* ── Hero ── */}
      <section className="py-24 text-center">
        <div className="container-max flex flex-col items-center gap-6">
          <p className="text-sub font-medium uppercase tracking-widest text-grey-1">pricing</p>
          <h1 className="text-[clamp(40px,6vw,60px)] font-medium leading-tight tracking-tight text-black max-w-xl">
            Open intelligence. Free to access, paid to contribute at scale.
          </h1>
          <p className="text-body text-grey-1 max-w-md">
            Only pay to publish data or run advanced AI agents. Public intelligence is free forever.
          </p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="pb-24">
        <div className="container-max grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 p-8 rounded-2xl border ${
                plan.highlighted
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-grey-3"
              }`}
            >
              <div className="flex flex-col gap-2">
                <p
                  className={`text-sub font-medium uppercase tracking-widest ${
                    plan.highlighted ? "text-grey-2" : "text-grey-1"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[42px] font-semibold leading-none">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? "text-grey-2" : "text-grey-1"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlighted ? "text-grey-2" : "text-grey-1"}`}>
                  {plan.description}
                </p>
              </div>

              <Link
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-black hover:bg-primary/80"
                    : "bg-black text-white hover:bg-black/80"
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </Link>

              <div className={`border-t ${plan.highlighted ? "border-white/10" : "border-grey-3"} pt-6 flex flex-col gap-3`}>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={14}
                      className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-primary" : "text-success"}`}
                    />
                    <span className={plan.highlighted ? "text-grey-2" : "text-grey-1"}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 bg-grey-4">
        <div className="container-max flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sub font-medium uppercase tracking-widest text-grey-1">faqs</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-tight text-black">
              Common questions
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-grey-3 rounded-2xl p-6 flex flex-col gap-3">
                <p className="text-base font-medium text-black">{faq.q}</p>
                <p className="text-sm text-grey-1 leading-relaxed">{faq.a}</p>
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
            <p className="text-sub font-medium uppercase tracking-widest text-grey-2 relative z-10">get started today</p>
            <h2 className="text-[clamp(36px,5vw,60px)] font-medium leading-tight tracking-tight text-white relative z-10 max-w-xl">
              Turn field data into global intelligence. Start free.
            </h2>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-medium rounded-xl hover:bg-primary/80 transition-colors relative z-10"
            >
              Get early access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
