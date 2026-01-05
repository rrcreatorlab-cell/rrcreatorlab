import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, categoryColors, getBlogPostBySlug } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || "");
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
          
          <Badge className={`mb-4 ${categoryColors[post.category]}`}>
            {post.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video rounded-xl overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-foreground">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-foreground">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('- **')) {
                const match = paragraph.match(/- \*\*(.+?)\*\*:? ?(.+)?/);
                if (match) {
                  return (
                    <li key={index}>
                      <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}
                    </li>
                  );
                }
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index}>{paragraph.replace('- ', '')}</li>;
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return <li key={index}>{paragraph.replace(/^\d+\. /, '')}</li>;
              }
              if (paragraph.trim() === '') {
                return null;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </article>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-4 py-8 border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevPost ? (
              <Button 
                variant="outline" 
                className="gap-2 flex-1 justify-start"
                onClick={() => navigate(`/blog/${prevPost.slug}`)}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="truncate">{prevPost.title}</span>
              </Button>
            ) : <div className="flex-1" />}
            
            {nextPost ? (
              <Button 
                variant="outline" 
                className="gap-2 flex-1 justify-end"
                onClick={() => navigate(`/blog/${nextPost.slug}`)}
              >
                <span className="truncate">{nextPost.title}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card 
                  key={relatedPost.id}
                  className="overflow-hidden cursor-pointer hover:border-primary/30 transition-all"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                >
                  <div className="aspect-video">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Grow Your Channel?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized strategies and expert guidance to take your YouTube channel to the next level.
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

export default BlogPost;
