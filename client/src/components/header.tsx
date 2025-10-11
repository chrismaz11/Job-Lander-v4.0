import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 transition-all cursor-pointer" data-testid="link-home">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Job-Lander</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/create">
            <Button
              variant={isActive("/create") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-create"
            >
              Create Resume
            </Button>
          </Link>
          <Link href="/templates">
            <Button
              variant={isActive("/templates") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-templates"
            >
              Templates
            </Button>
          </Link>
          <Link href="/verify">
            <Button
              variant={isActive("/verify") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-verify"
            >
              Verify
            </Button>
          </Link>
          <Link href="/jobs">
            <Button
              variant={isActive("/jobs") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-jobs"
            >
              Find Jobs
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/create">
            <Button className="hidden sm:inline-flex" data-testid="link-get-started">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
