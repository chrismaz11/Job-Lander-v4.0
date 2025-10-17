import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, User as UserIcon, LogOut, Settings, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [location] = useLocation();
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isActive = (path: string) => location === path;

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Refresh the page or redirect as needed
    window.location.reload();
  };

  return (
    <>
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
              variant={isActive("/cover-letter") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-cover-letter"
            >
              <Link href="/cover-letter">Cover Letter</Link>
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
              variant={isActive("/jobs") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-jobs"
            >
              <Link href="/jobs">Find Jobs</Link>
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
              variant={isActive("/pricing") ? "secondary" : "ghost"}
              className="font-medium"
              data-testid="link-pricing"
            >
              <Link href="/pricing">Pricing</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.firstName} />
                      <AvatarFallback>
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="secondary" className="w-fit mt-1">
                        {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setShowAuthModal(true)} data-testid="auth-button">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
