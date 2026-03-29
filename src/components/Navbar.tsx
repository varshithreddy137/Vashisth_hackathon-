import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Leaf, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">FoodBridge</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#listings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Discover</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How it Works</a>
          <a href="#stats" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Impact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{profile?.name || "User"}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-muted-foreground">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#listings" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Discover</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>How it Works</a>
            <a href="#stats" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Impact</a>
            {user ? (
              <Button variant="outline" size="sm" className="w-full mt-2 gap-1.5" onClick={() => { signOut(); setMobileOpen(false); }}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
