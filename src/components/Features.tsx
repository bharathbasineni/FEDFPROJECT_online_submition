import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileCheck, GraduationCap, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Assignment Creation',
    description: 'Create and manage assignments with due dates, instructions, and point values.',
    color: 'text-primary',
  },
  {
    icon: FileCheck,
    title: 'File Submission',
    description: 'Students can easily upload and submit their work with file attachments.',
    color: 'text-accent',
  },
  {
    icon: GraduationCap,
    title: 'Grading System',
    description: 'Comprehensive grading with feedback and point allocation for each submission.',
    color: 'text-warning',
  },
  {
    icon: Users,
    title: 'Role Management',
    description: 'Separate interfaces and permissions for teachers and students.',
    color: 'text-success',
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage assignments and track student progress effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
