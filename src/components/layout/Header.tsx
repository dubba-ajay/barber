import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Men's Hair", href: "/mens-hair" },
    { name: "Women's Beauty", href: "/womens-beauty" },
    { name: "Nail Studios", href: "/nail-studios" },
    { name: "Makeup Artists", href: "/makeup-artists" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">BeautySalon</span>
          </Link>

          <nav className="hidden xl:flex items-center space-x-6">
            {(role !== "owner" ? navItems : []).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" className="text-sm" onClick={() => setAuthOpen(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
                <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm"><User className="w-4 h-4 mr-2" /> Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {role === "owner" ? (
                    <DropdownMenuItem asChild>
                      <Link to="/store-owner-dashboard">Store Owner Dashboard</Link>
                    </DropdownMenuItem>
                  ) : role === "freelancer" ? (
                    <DropdownMenuItem asChild>
                      <Link to="/freelancer-dashboard">Freelancer Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to="/user-dashboard">User Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="py-4 space-y-2">
              <div className="px-4 pt-2 flex items-center gap-2">
                {!user ? (
                  <Button variant="ghost" size="sm" className="flex-1 justify-start" onClick={() => { setAuthOpen(true); setIsMenuOpen(false); }}>
                    <User className="w-4 h-4 mr-2" /> Login / Sign Up
                  </Button>
                ) : (
                  <>
                    {role === "owner" ? (
                      <Link to="/store-owner-dashboard" className="flex-1"><Button variant="ghost" size="sm" className="w-full justify-start">Owner Dashboard</Button></Link>
                    ) : role === "freelancer" ? (
                      <Link to="/freelancer-dashboard" className="flex-1"><Button variant="ghost" size="sm" className="w-full justify-start">Freelancer Dashboard</Button></Link>
                    ) : (
                      <Link to="/user-dashboard" className="flex-1"><Button variant="ghost" size="sm" className="w-full justify-start">User Dashboard</Button></Link>
                    )}
                    <Button size="sm" className="flex-1" onClick={() => signOut()}>Sign out</Button>
                  </>
                )}
              </div>
              <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
