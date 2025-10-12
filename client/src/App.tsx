import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import Home from "@/pages/home";
import CreateResume from "@/pages/create-resume";
import Templates from "@/pages/templates";
import Verify from "@/pages/verify";
import Jobs from "@/pages/jobs";
import Dashboard from "@/pages/dashboard";
import CoverLetter from "@/pages/cover-letter";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/create" component={CreateResume} />
      <Route path="/cover-letter" component={CoverLetter} />
      <Route path="/templates" component={Templates} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/verify" component={Verify} />
      <Route path="/jobs" component={Jobs} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
