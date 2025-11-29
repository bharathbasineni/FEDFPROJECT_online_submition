import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { AssignmentCard } from '@/components/AssignmentCard';
import { GradeChart } from '@/components/GradeChart';
import { useAssignments } from '@/contexts/AssignmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function StudentDashboard() {
  const { assignments, submissions } = useAssignments();
  const { user } = useAuth();

  const studentSubmissions = submissions.filter((s) => s.studentId === user?.id);
  const submittedAssignments = studentSubmissions.length;
  const gradedAssignments = studentSubmissions.filter((s) => s.grade !== undefined).length;
  const pendingAssignments = assignments.length - submittedAssignments;

  const averageGrade =
    gradedAssignments > 0
      ? studentSubmissions
          .filter((s) => s.grade !== undefined)
          .reduce((sum, s) => sum + (s.grade || 0), 0) / gradedAssignments
      : 0;

  const chartData = studentSubmissions
    .filter((s) => s.grade !== undefined)
    .slice(-5)
    .map((s) => {
      const assignment = assignments.find((a) => a.id === s.assignmentId);
      return {
        name: assignment?.title.substring(0, 15) || 'Assignment',
        grade: s.grade || 0,
        maxPoints: assignment?.points || 100,
      };
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your assignments and grades</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                  <p className="text-2xl font-bold">{assignments.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-2xl font-bold">{submittedAssignments}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingAssignments}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                  <p className="text-2xl font-bold">{averageGrade.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {chartData.length > 0 && (
          <div className="mb-8">
            <GradeChart data={chartData} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6">Available Assignments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">No assignments available</p>
                </CardContent>
              </Card>
            ) : (
              assignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
