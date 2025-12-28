import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, TrendingUp, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const successStories = [
    {
      channelName: "Currency India Official",
      handle: "@TheCurrencyIndiaofficial420",
      niche: "Currency & Numismatics",
      channelUrl: "https://www.youtube.com/@TheCurrencyIndiaofficial420",
      thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop",
      beforeStats: {
        subscribers: "8",
        views: "2K",
      },
      afterStats: {
        subscribers: "4.17K",
        views: "47 Videos",
      },
      growth: "520x",
      services: ["Content Strategy", "Video Editing", "SEO Optimization"],
      testimonial: "Share the growth story and we'll add it here!",
    },
    {
      channelName: "Sambodhi Mechanical Engineering Coaching",
      handle: "@smecoching2070",
      niche: "Education & Engineering",
      channelUrl: "https://www.youtube.com/@smecoching2070",
      thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop",
      beforeStats: {
        subscribers: "28",
        views: "3K",
      },
      afterStats: {
        subscribers: "473",
        views: "1.1K+ Views",
      },
      growth: "17x",
      services: ["Content Strategy", "Shorts Creation", "Channel Optimization"],
      testimonial: "Share the growth story and we'll add it here!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Success{" "}
              <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from real creators. See how we've helped channels grow their audience and reach.
            </p>
          </div>

          {/* Success Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Channel Thumbnail */}
                <div className="relative aspect-video">
                  <img
                    src={story.thumbnail}
                    alt={story.channelName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {story.niche}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{story.channelName}</h3>

                  {/* Stats Comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Before</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{story.beforeStats.subscribers}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{story.beforeStats.views}</span>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-primary mb-1">After</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{story.afterStats.subscribers}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Eye className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{story.afterStats.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Growth Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-accent font-bold">{story.growth} Subscriber Growth</span>
                  </div>

                  {/* Services Provided */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <p className="text-sm text-muted-foreground italic">
                    "{story.testimonial}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Be Our Next Success Story?
              </h2>
              <p className="text-muted-foreground mb-6">
                Let's work together to grow your channel and reach your goals.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/#contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;
