import { Switch, Route } from "wouter";
import { ClerkProvider, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

// Layouts
import StudentLayout from "@/layouts/StudentLayout";
import TeacherLayout from "@/layouts/TeacherLayout";

// Student Pages
import LandingPage from "@/pages/LandingPage";
import StudentHome from "@/pages/StudentHome";
import StoryReader from "@/pages/StoryReader";
import StoryList from "@/pages/StoryList";
import QuizEngine from "@/pages/QuizEngine";
import AchievementsPage from "@/pages/AchievementsPage";
import StudentProfile from "@/pages/StudentProfile";
import StudentSettings from "@/pages/StudentSettings";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";

// Teacher Pages
import TeacherLogin from "@/pages/TeacherLogin";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherAnalytics from "@/pages/TeacherAnalytics";
import TeacherStudents from "@/pages/TeacherStudents";
import TeacherContentStudio from "@/pages/TeacherContentStudio";
import TeacherSchedule from "@/pages/TeacherSchedule";
import TeacherMessages from "@/pages/TeacherMessages";
import TeacherReports from "@/pages/TeacherReports";
import TeacherSettings from "@/pages/TeacherSettings";

// Common
import NotFound from "@/pages/not-found";

function StudentRoutes() {
  return (
    <StudentLayout>
      <Switch>
        <Route path="/student" component={StudentHome} />
        <Route path="/student/learn" component={StoryList} />
        <Route path="/student/stories/:id" component={StoryReader} />
        <Route path="/student/quiz/:id" component={QuizEngine} />
        <Route path="/student/achievements" component={AchievementsPage} />
        <Route path="/student/profile" component={StudentProfile} />
        <Route path="/student/settings" component={StudentSettings} />
        <Route component={NotFound} />
      </Switch>
    </StudentLayout>
  );
}

function TeacherRoutes() {
  return (
    <TeacherLayout>
      <Switch>
        <Route path="/teacher" component={TeacherDashboard} />
        <Route path="/teacher/analytics" component={TeacherAnalytics} />
        <Route path="/teacher/students" component={TeacherStudents} />
        <Route path="/teacher/content" component={TeacherContentStudio} />
        <Route path="/teacher/schedule" component={TeacherSchedule} />
        <Route path="/teacher/messages" component={TeacherMessages} />
        <Route path="/teacher/reports" component={TeacherReports} />
        <Route path="/teacher/settings" component={TeacherSettings} />
        <Route component={NotFound} />
      </Switch>
    </TeacherLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/sso-callback" component={AuthenticateWithRedirectCallback} />

      {/* Student Routes */}
      <Route path="/student" component={StudentRoutes} />
      <Route path="/student/:rest*" component={StudentRoutes} />

      {/* Teacher Routes */}
      <Route path="/teacher/login" component={TeacherLogin} />
      <Route path="/teacher" component={TeacherRoutes} />
      <Route path="/teacher/:rest*" component={TeacherRoutes} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <SettingsProvider>
            <Router />
          </SettingsProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
