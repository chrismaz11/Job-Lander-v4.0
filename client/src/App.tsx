import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

// AWS Amplify configuration
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplifyconfiguration';

// Configure Amplify
Amplify.configure(amplifyConfig);
import Home from "@/pages/home";
import CreateResume from "@/pages/create-resume";
import Templates from "@/pages/templates";
import Verify from "@/pages/verify";
import Jobs from "@/pages/jobs";
import Dashboard from "@/pages/dashboard";
import CoverLetter from "@/pages/cover-letter";
import Portfolio from "@/pages/portfolio";
import HealthDashboard from "@/pages/health";
import Pricing from "@/pages/pricing";
import AuthExample from "@/pages/auth-example";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/create" component={CreateResume} />
      <Route path="/create-resume" component={CreateResume} />
      <Route path="/cover-letter" component={CoverLetter} />
      <Route path="/templates" component={Templates} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/verify" component={Verify} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/health" component={HealthDashboard} />
      <Route path="/auth-example" component={AuthExample} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen">
            <Router />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
