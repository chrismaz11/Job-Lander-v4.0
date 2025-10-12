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
        <Link href="/" className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-testid="link-home">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Job-Lander</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Button
            asChild
            variant={isActive("/create") ? "secondary" : "ghost"}
            className="font-medium"
            data-testid="link-create"
          >
            <Link href="/create">Create Resume</Link>
          </Button>
          <Button
            asChild
            variant={isActive("/templates") ? "secondary" : "ghost"}
            className="font-medium"
            data-testid="link-templates"
          >
            <Link href="/templates">Templates</Link>
          </Button>
          <Button
            asChild
            variant={isActive("/verify") ? "secondary" : "ghost"}
            className="font-medium"
            data-testid="link-verify"
          >
            <Link href="/verify">Verify</Link>
          </Button>
          <Button
            asChild
            variant={isActive("/jobs") ? "secondary" : "ghost"}
            className="font-medium"
            data-testid="link-jobs"
          >
            <Link href="/jobs">Find Jobs</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex" data-testid="link-get-started">
            <Link href="/create">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
