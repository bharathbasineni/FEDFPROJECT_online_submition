import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/Navbar';
import { useAssignments } from '@/contexts/AssignmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, FileText, Upload, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    getAssignmentById, 
    submitAssignment, 
    gradeSubmission, 
    getSubmissionsByAssignment,
    getSubmissionsByStudent 
  } = useAssignments();

  const assignment = getAssignmentById(id || '');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!assignment) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Assignment Not Found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const isTeacher = user?.role === 'teacher';
  const submissions = isTeacher 
    ? getSubmissionsByAssignment(assignment.id)
    : getSubmissionsByStudent(user?.id || '').filter(s => s.assignmentId === assignment.id);
  const userSubmission = submissions.find(s => s.studentId === user?.id);
  const hasSubmitted = !!userSubmission;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast({
        title: 'Error',
        description: 'Please provide your submission content',
        variant: 'destructive',
      });
      return;
    }

    submitAssignment({
      assignmentId: assignment.id,
      studentId: user?.id || '',
      studentName: user?.name || '',
      content,
      fileName,
    });

    toast({
      title: 'Success',
      description: 'Assignment submitted successfully',
    });

    setContent('');
    setFileName('');
  };

  const handleGrade = (submissionId: string) => {
    if (!grade || !feedback) {
      toast({
        title: 'Error',
        description: 'Please provide both grade and feedback',
        variant: 'destructive',
      });
      return;
    }

    gradeSubmission(submissionId, parseInt(grade), feedback);

    toast({
      title: 'Success',
      description: 'Submission graded successfully',
    });

    setSelectedSubmissionId('');
    setGrade('');
    setFeedback('');
  };

  const dueDate = new Date(assignment.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">{assignment.title}</CardTitle>
                <CardDescription className="text-base">{assignment.description}</CardDescription>
              </div>
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(dueDate, 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(dueDate, 'hh:mm a')}</span>
              </div>
              <Badge variant="secondary" className="text-base">
                {assignment.points} points
              </Badge>
            </div>
          </CardContent>
        </Card>

        {!isTeacher && (
          <Card className="mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle>Your Submission</CardTitle>
            </CardHeader>
            <CardContent>
              {hasSubmitted ? (
                <div className="space-y-4">
                  <div>
                    <Label>Submitted Content</Label>
                    <p className="mt-2 p-4 bg-secondary rounded-md">{userSubmission.content}</p>
                  </div>
                  {userSubmission.fileName && (
                    <div>
                      <Label>File</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <FileText className="h-4 w-4" />
                        <span>{userSubmission.fileName}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label>Submitted At</Label>
                    <p className="mt-2">{format(new Date(userSubmission.submittedAt), 'MMMM dd, yyyy hh:mm a')}</p>
                  </div>
                  {userSubmission.grade !== undefined && (
                    <>
                      <Separator />
                      <div>
                        <Label>Grade</Label>
                        <p className="mt-2 text-2xl font-bold text-primary">
                          {userSubmission.grade} / {assignment.points}
                        </p>
                      </div>
                      {userSubmission.feedback && (
                        <div>
                          <Label>Feedback</Label>
                          <p className="mt-2 p-4 bg-secondary rounded-md">{userSubmission.feedback}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">Submission Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter your submission here..."
                      rows={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fileName">File Name (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fileName"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="document.pdf"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Assignment
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {isTeacher && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Student Submissions ({submissions.length})</h2>
            {submissions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">No submissions yet</p>
                </CardContent>
              </Card>
            ) : (
              submissions.map((submission) => (
                <Card key={submission.id} className="animate-scale-in">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{submission.studentName}</CardTitle>
                        <CardDescription>
                          Submitted {format(new Date(submission.submittedAt), 'MMM dd, yyyy hh:mm a')}
                        </CardDescription>
                      </div>
                      {submission.grade !== undefined && (
                        <Badge variant="secondary" className="text-lg">
                          {submission.grade} / {assignment.points}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Content</Label>
                      <p className="mt-2 p-4 bg-secondary rounded-md">{submission.content}</p>
                    </div>
                    {submission.fileName && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{submission.fileName}</span>
                      </div>
                    )}
                    {submission.feedback && (
                      <div>
                        <Label>Your Feedback</Label>
                        <p className="mt-2 p-4 bg-secondary rounded-md">{submission.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {selectedSubmissionId === submission.id ? (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`grade-${submission.id}`}>Grade</Label>
                            <Input
                              id={`grade-${submission.id}`}
                              type="number"
                              min="0"
                              max={assignment.points}
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              placeholder={`Out of ${assignment.points}`}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`feedback-${submission.id}`}>Feedback</Label>
                          <Textarea
                            id={`feedback-${submission.id}`}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Provide feedback for the student..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleGrade(submission.id)} className="flex-1">
                            Submit Grade
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmissionId('');
                              setGrade('');
                              setFeedback('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setSelectedSubmissionId(submission.id);
                          setGrade(submission.grade?.toString() || '');
                          setFeedback(submission.feedback || '');
                        }}
                        variant={submission.grade !== undefined ? 'outline' : 'default'}
                        className="w-full"
                      >
                        {submission.grade !== undefined ? 'Update Grade' : 'Grade Submission'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
