import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { AssignmentProvider } from "./contexts/AssignmentContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AssignmentDetail from "./pages/AssignmentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
  <QCP client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AssignmentProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/teacher"
                  element={
                    <ProtectedRoute requiredRole="teacher">
                      <TeacherDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assignment/:id"
                  element={
                    <ProtectedRoute>
                      <AssignmentDetail />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AssignmentProvider>
        </AuthProvider>
      </TooltipProvider>
  </QCP>
  );
};

export default App;
