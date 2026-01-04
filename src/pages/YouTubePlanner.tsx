import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Sparkles,
  Lightbulb,
  Type,
  FileText,
  Calendar,
  LogOut,
  Copy,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface VideoIdea {
  id: number;
  idea: string;
}

interface SEOTitle {
  id: number;
  title: string;
}

interface Description {
  id: number;
  description: string;
}

interface WeeklyPlanDay {
  day: string;
  contentType: string;
  focus: string;
}

interface PlannerResult {
  videoIdeas: VideoIdea[];
  seoTitles: SEOTitle[];
  descriptions: Description[];
  weeklyPlan: WeeklyPlanDay[];
}

const YouTubePlanner = () => {
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlannerResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!niche.trim() || !goal.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both your channel niche and primary goal.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-planner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ niche, goal }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 429) {
          toast({
            title: "Rate limited",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive",
          });
        } else if (response.status === 402) {
          toast({
            title: "Usage limit reached",
            description: "AI usage limit reached. Please try again later.",
            variant: "destructive",
          });
        } else {
          throw new Error(error.error || "Failed to generate plan");
        }
        return;
      }

      const data = await response.json();
      setResult(data);
      toast({
        title: "Plan generated!",
        description: "Your YouTube content plan is ready.",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                YouTube Content Planner
              </h1>
              <p className="text-muted-foreground">
                AI-powered content strategy for your channel
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleGenerate} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="niche" className="text-foreground">
                  Channel Niche
                </Label>
                <Input
                  id="niche"
                  placeholder="e.g., Personal Finance, Gaming, Cooking..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-foreground">
                  Primary Goal
                </Label>
                <Input
                  id="goal"
                  placeholder="e.g., Grow to 10K subscribers, Monetization..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="hero"
              className="mt-6 w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content Plan
                </>
              )}
            </Button>
          </form>

          {/* Results */}
          {result && (
            <div className="space-y-8 animate-slide-up">
              {/* Video Ideas */}
              <section className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Video Ideas ({result.videoIdeas.length})
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.videoIdeas.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50 group"
                    >
                      <span className="text-foreground text-sm">{item.idea}</span>
                      <button
                        onClick={() => copyToClipboard(item.idea, `idea-${item.id}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        {copiedId === `idea-${item.id}` ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SEO Titles */}
              <section className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Type className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    SEO-Optimized Titles ({result.seoTitles.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {result.seoTitles.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50 group"
                    >
                      <span className="text-foreground font-medium">{item.title}</span>
                      <button
                        onClick={() => copyToClipboard(item.title, `title-${item.id}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        {copiedId === `title-${item.id}` ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sample Descriptions */}
              <section className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Sample Descriptions ({result.descriptions.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {result.descriptions.map((item) => (
                    <div
                      key={item.id}
                      className="relative p-4 rounded-lg bg-secondary/50 border border-border/50 group"
                    >
                      <p className="text-foreground text-sm whitespace-pre-wrap pr-8">
                        {item.description}
                      </p>
                      <button
                        onClick={() => copyToClipboard(item.description, `desc-${item.id}`)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedId === `desc-${item.id}` ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Weekly Plan */}
              <section className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Weekly Upload Plan
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Day
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Content Type
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Focus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.weeklyPlan.map((day, index) => (
                        <tr
                          key={index}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="py-3 px-4 font-medium text-foreground">
                            {day.day}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                day.contentType.toLowerCase().includes("short")
                                  ? "bg-primary/10 text-primary"
                                  : "bg-accent/10 text-accent"
                              }`}
                            >
                              {day.contentType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {day.focus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YouTubePlanner;
