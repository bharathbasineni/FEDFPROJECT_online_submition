import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="hero-gradient min-h-[600px] flex items-center justify-center text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          Streamline Assignment
          <br />
          <span className="text-accent">Management</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
          A modern platform for teachers and students to manage assignments, submissions, and grading with ease and efficiency.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button variant="hero" size="lg" asChild className="min-w-[200px]">
            <Link to="/signup?role=teacher">
              <GraduationCap className="mr-2" />
              Start Teaching
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="min-w-[200px] bg-primary-foreground/10 border-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/signup?role=student">
              <BookOpen className="mr-2" />
              Join as Student
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
