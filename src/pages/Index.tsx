import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      
      <section className="py-20">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of educators and students already using GradeBuddy
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-12 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">For Teachers</h3>
                <p className="text-muted-foreground mb-6">
                  Create assignments, manage submissions, and provide detailed feedback to your students.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link to="/signup?role=teacher">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-12 pb-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">For Students</h3>
                <p className="text-muted-foreground mb-6">
                  Submit assignments, track your grades, and stay organized with all your coursework.
                </p>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/signup?role=student">Join Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
