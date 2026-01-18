import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingBookButton = () => {
  return (
    <a
      href="https://topmate.io/rishabh269/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        variant="hero"
        size="lg"
        className="shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 gap-2"
      >
        <Calendar className="h-5 w-5" />
        <span className="hidden sm:inline">Book a Call</span>
      </Button>
    </a>
  );
};

export default FloatingBookButton;
