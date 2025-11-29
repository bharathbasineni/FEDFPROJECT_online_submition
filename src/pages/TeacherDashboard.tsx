import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { AssignmentCard } from '@/components/AssignmentCard';
import { useAssignments } from '@/contexts/AssignmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, FileText, CheckCircle, Users } from 'lucide-react';

export default function TeacherDashboard() {
  const { assignments, addAssignment, deleteAssignment, submissions } = useAssignments();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('100');

  const teacherAssignments = assignments.filter((a) => a.teacherId === user?.id);
  const totalSubmissions = submissions.filter((s) =>
    teacherAssignments.some((a) => a.id === s.assignmentId)
  ).length;
  const gradedSubmissions = submissions.filter(
    (s) => teacherAssignments.some((a) => a.id === s.assignmentId) && s.grade !== undefined
  ).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !points) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    addAssignment({
      title,
      description,
      dueDate,
      points: parseInt(points),
      teacherId: user?.id || '',
    });

    toast({
      title: 'Success',
      description: 'Assignment created successfully',
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPoints('100');
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteAssignment(id);
    toast({
      title: 'Success',
      description: 'Assignment deleted successfully',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your assignments and track student progress</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherAssignments.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubmissions}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradedSubmissions}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Assignments</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Add a new assignment for your students to complete
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Assignment title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Assignment description and instructions"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Assignment</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherAssignments.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No assignments yet</p>
                <p className="text-sm text-muted-foreground">Create your first assignment to get started</p>
              </CardContent>
            </Card>
          ) : (
            teacherAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onDelete={handleDelete}
                role="teacher"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
