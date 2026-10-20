import { ArrowRight, Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const offerings = [
  "ERPs",
  "Customised Apps",
  "Websites",
  "Edutech Courses",
  "Other Softwares",
];

const Process = () => (
  <section className="relative overflow-hidden py-10 md:py-12" id="process">
    <div className="container relative z-10 px-4">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <AnimatedSection animation="fade-right">
          <div className="sister-company-panel flex flex-col items-center justify-center rounded-xl px-6 py-7 text-center text-primary-foreground shadow-lg">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-primary-foreground/60 font-display text-2xl font-bold">
              AT
            </div>
            <p className="font-display text-2xl font-bold">Alevoor Technologies</p>
            <p className="mt-2 text-sm text-primary-foreground/90">Software &amp; technology</p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-left" delay={120}>
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Parent Company
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold leading-tight md:text-3xl">
              <span className="gradient-text">Alevoor Technologies</span>
            </h2>

            <ul className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {offerings.map((offering) => (
                <li key={offering} className="flex items-center gap-2 text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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