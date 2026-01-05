import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "10 Proven Strategies to Grow Your YouTube Channel in 2025",
    excerpt: "Discover the most effective tactics that successful creators use to grow their audience and increase engagement on YouTube.",
    category: "Growth",
    author: "RR Creator Lab",
    date: "Jan 3, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "How to Create Viral Thumbnails That Get Clicks",
    excerpt: "Learn the psychology behind high-converting thumbnails and how to design ones that make viewers want to click.",
    category: "Design",
    author: "RR Creator Lab",
    date: "Dec 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "YouTube Algorithm Secrets: What Actually Works",
    excerpt: "Understand how the YouTube algorithm works and learn actionable tips to get your videos recommended to more viewers.",
    category: "Algorithm",
    author: "RR Creator Lab",
    date: "Dec 20, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "The Perfect YouTube Posting Schedule for Maximum Views",
    excerpt: "Find out the best times to post on YouTube and how to create a consistent upload schedule that keeps your audience engaged.",
    category: "Strategy",
    author: "RR Creator Lab",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "How to Write YouTube Titles That Rank and Convert",
    excerpt: "Master the art of writing compelling titles that rank well in search and entice viewers to click on your videos.",
    category: "SEO",
    author: "RR Creator Lab",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Building a Loyal YouTube Community: A Complete Guide",
    excerpt: "Learn how to foster engagement, respond to comments effectively, and build a community that supports your channel's growth.",
    category: "Community",
    author: "RR Creator Lab",
    date: "Dec 5, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
];

const categoryColors: Record<string, string> = {
  Growth: "bg-green-500/10 text-green-500 border-green-500/20",
  Design: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Algorithm: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Strategy: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  SEO: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Community: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Creator Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              YouTube Growth{" "}
              <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Expert tips, strategies, and insights to help you grow your YouTube channel 
              and build a thriving creator business.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <Badge className={`w-fit mb-4 ${categoryColors[blogPosts[0].category]}`}>
                  {blogPosts[0].category}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button className="w-fit gap-2 group">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <Badge className={`w-fit mb-2 ${categoryColors[post.category]}`}>
                    {post.category}
                  </Badge>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want Personalized Growth Strategies?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of experts can help you create a custom growth plan tailored to your channel's unique needs and goals.
            </p>
            <Link to="/lets-connect">
              <Button size="lg" className="gap-2">
                Get a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
