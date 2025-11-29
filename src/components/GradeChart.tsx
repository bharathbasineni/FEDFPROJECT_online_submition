import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface GradeData {
  name: string;
  grade: number;
  maxPoints: number;
}

interface GradeChartProps {
  data: GradeData[];
}

export const GradeChart = ({ data }: GradeChartProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Grade Overview</CardTitle>
        <CardDescription>Your performance across all assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="grade" fill="hsl(var(--primary))" name="Your Grade" />
            <Bar dataKey="maxPoints" fill="hsl(var(--accent))" name="Max Points" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
