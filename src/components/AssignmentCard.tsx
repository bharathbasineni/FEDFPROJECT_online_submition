import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/contexts/AssignmentContext';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  role?: 'teacher' | 'student';
}

export const AssignmentCard = ({ assignment, onDelete, showActions = true, role }: AssignmentCardProps) => {
  const dueDate = new Date(assignment.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <Card className="hover:shadow-md transition-all duration-300 animate-scale-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{assignment.title}</CardTitle>
            <CardDescription className="mt-2">{assignment.description}</CardDescription>
          </div>
          {isOverdue && <Badge variant="destructive">Overdue</Badge>}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(dueDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{format(dueDate, 'hh:mm a')}</span>
          </div>
          <Badge variant="secondary">{assignment.points} points</Badge>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="gap-2">
          <Button asChild className="flex-1">
            <Link to={`/assignment/${assignment.id}`}>View Details</Link>
          </Button>
          {role === 'teacher' && onDelete && (
            <Button variant="destructive" size="icon" onClick={() => onDelete(assignment.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
