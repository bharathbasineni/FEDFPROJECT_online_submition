// Sample data for demo purposes - can be loaded via API integration
export const initializeSampleData = () => {
  const existingAssignments = localStorage.getItem('assignments');
  const existingSubmissions = localStorage.getItem('submissions');

  // Only initialize if no data exists
  if (!existingAssignments) {
    const sampleAssignments = [
      {
        id: 'sample-1',
        title: 'React Fundamentals Essay',
        description: 'Write a comprehensive essay about React hooks, their usage, and best practices. Include examples and code snippets.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        points: 100,
        teacherId: 'demo-teacher',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sample-2',
        title: 'TypeScript Types Project',
        description: 'Create a small TypeScript project demonstrating advanced types, generics, and type inference.',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        points: 150,
        teacherId: 'demo-teacher',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sample-3',
        title: 'State Management Analysis',
        description: 'Compare and contrast different state management solutions in React (Context API, Redux, Zustand). Provide code examples.',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
        points: 120,
        teacherId: 'demo-teacher',
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem('assignments', JSON.stringify(sampleAssignments));
  }

  // Initialize sample submissions if needed
  if (!existingSubmissions) {
    localStorage.setItem('submissions', JSON.stringify([]));
  }
};
