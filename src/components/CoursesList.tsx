import { GraduationCap, Youtube, Sparkles, Bot } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";

const courses = [
  { title: "Entrepreneurship & Digital Growth Masterclass", icon: GraduationCap, gradient: "from-primary to-blue-400" },
  { title: "YouTube Management & Growth Mastery", icon: Youtube, gradient: "from-red-500 to-orange-500" },
  { title: "Content Marketing & Personal Branding", icon: Sparkles, gradient: "from-pink-500 via-purple-500 to-indigo-500" },
  { title: "AI Tools For Business & Creators", icon: Bot, gradient: "from-green-400 to-emerald-500" },
];

const CoursesList = () => {
  return (
    <section className="relative py-16" id="courses-list">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Courses
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Our <span className="gradient-text">Courses</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {courses.map((c, i) => {
            const Icon = c.icon;
            return (
              <AnimatedSection key={c.title} animation="fade-up" delay={i * 80}>
                <div className="h-full gradient-border rounded-xl p-5 flex items-center gap-3 hover:shadow-lg hover:shadow-primary/10 transition-all">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${c.gradient} flex-shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-sm font-semibold leading-tight">{c.title}</h3>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/pricing#courses" className="inline-block text-primary font-medium hover:underline">
            View course details &amp; pricing →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;