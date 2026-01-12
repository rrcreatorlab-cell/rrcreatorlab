import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "How quickly will I see results?",
    answer:
      "Most clients start seeing noticeable improvements within 30-60 days. However, significant growth typically happens over 3-6 months as we implement and optimize our strategies. YouTube's algorithm rewards consistency, which we help you maintain.",
  },
  {
    question: "Do you guarantee subscriber growth?",
    answer:
      "While we can't guarantee specific numbers (no one honestly can), our proven strategies have helped creators achieve 200-500%+ growth. We focus on sustainable, organic growth through content optimization, SEO, and audience engagement strategies.",
  },
  {
    question: "What platforms do you work with?",
    answer:
      "We specialize in YouTube and Instagram management. For each plan, you choose one platform to focus on. This allows us to dedicate our expertise and resources to maximizing your growth on that specific platform.",
  },
  {
    question: "Do I need to have an existing audience?",
    answer:
      "Not at all! We work with creators at all stages - from those just starting out to established channels looking to accelerate growth. Our strategies are customized based on where you are in your creator journey.",
  },
  {
    question: "What's included in the video editing service?",
    answer:
      "Our editing service includes cutting and trimming, color correction, audio enhancement, transitions, text overlays, thumbnails, and platform-specific optimizations. The number of videos per month depends on your chosen plan.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades will apply from your next billing cycle. We're flexible and want to match our services to your current needs.",
  },
  {
    question: "How do we communicate and collaborate?",
    answer:
      "We use a combination of WhatsApp for quick updates, email for detailed reports, and video calls for strategy sessions. You'll have direct access to your dedicated manager who knows your channel inside-out.",
  },
  {
    question: "What makes RR Creator Lab different?",
    answer:
      "Unlike agencies that treat you as just another number, we limit our client roster to ensure personalized attention. Our founder personally oversees every account, and we treat your channel's growth as if it were our own.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container px-4 relative">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for,
            feel free to reach out directly.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQ;
