import { ArrowRight, Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const offerings = [
  "Banking software",
  "Billing software",
  "E-commerce software",
  "Account management services",
];

const Process = () => (
  <section className="relative overflow-hidden py-20 md:py-24" id="process">
    <div className="container relative z-10 px-4">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <AnimatedSection animation="fade-right">
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent px-6 py-12 text-center text-primary-foreground shadow-lg md:min-h-[360px]">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-xl border border-primary-foreground/60">
              <Building2 className="h-10 w-10" aria-hidden="true" />
            </div>
            <p className="font-display text-3xl font-bold md:text-4xl">Alevoor Technologies</p>
            <p className="mt-3 text-base text-primary-foreground/90">Software &amp; technology studio</p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-left" delay={120}>
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Sister Company
            </span>
            <h2 className="mb-5 font-display text-3xl font-bold leading-tight md:text-4xl">
              Meet our technology powerhouse, <span className="gradient-text">Alevoor Technologies</span>
            </h2>
            <p className="mb-6 text-base leading-7 text-muted-foreground">
              While RR Creator Lab helps brands tell their story, Alevoor Technologies builds practical software for the businesses behind them.
            </p>

            <ul className="mb-8 space-y-3">
              {offerings.map((offering) => (
                <li key={offering} className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{offering}</span>
                </li>
              ))}
            </ul>

            <Button variant="gradient" size="lg" asChild>
              <a href="https://alevoortechnologies.lovable.app" target="_blank" rel="noopener noreferrer">
                Explore Alevoor Technologies
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default Process;