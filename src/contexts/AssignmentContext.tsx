import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeSampleData } from '@/lib/sampleData';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  teacherId: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  fileName?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

interface AssignmentContextType {
  assignments: Assignment[];
  submissions: Submission[];
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  deleteAssignment: (id: string) => void;
  submitAssignment: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  gradeSubmission: (submissionId: string, grade: number, feedback: string) => void;
  getAssignmentById: (id: string) => Assignment | undefined;
  getSubmissionsByAssignment: (assignmentId: string) => Submission[];
  getSubmissionsByStudent: (studentId: string) => Submission[];
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export const AssignmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load data from localStorage
  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
    
    const storedAssignments = localStorage.getItem('assignments');
    const storedSubmissions = localStorage.getItem('submissions');
    
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  // Save assignments to localStorage
  useEffect(() => {
    if (assignments.length > 0) {
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }, [assignments]);

  // Save submissions to localStorage
  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem('submissions', JSON.stringify(submissions));
    }
  }, [submissions]);

  const addAssignment = (assignment: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setAssignments((prev) => [...prev, newAssignment]);
  };

  const deleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    setSubmissions((prev) => prev.filter((s) => s.assignmentId !== id));
  };

  const submitAssignment = (submission: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions((prev) => [...prev, newSubmission]);
  };

  const gradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, grade, feedback } : s))
    );
  };

  const getAssignmentById = (id: string) => {
    return assignments.find((a) => a.id === id);
  };

  const getSubmissionsByAssignment = (assignmentId: string) => {
    return submissions.filter((s) => s.assignmentId === assignmentId);
  };

  const getSubmissionsByStudent = (studentId: string) => {
    return submissions.filter((s) => s.studentId === studentId);
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        submissions,
        addAssignment,
        deleteAssignment,
        submitAssignment,
        gradeSubmission,
        getAssignmentById,
        getSubmissionsByAssignment,
        getSubmissionsByStudent,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};
