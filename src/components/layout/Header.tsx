import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Men's Hair", href: "/mens-hair" },
    { name: "Women's Beauty", href: "/womens-beauty" },
    { name: "Nail Studios", href: "/nail-studios" },
    { name: "Makeup Artists", href: "/makeup-artists" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-white" />
            <span className="text-xl font-bold tracking-tight text-white">BeautySalon</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-medium transition-colors hover:underline hover:text-blue-100 ${active ? "font-semibold underline text-blue-100" : "text-white"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/all-stores">
              <Button size="sm" className="rounded-full bg-white text-[#1d4ed8] hover:bg-blue-50">Book Now</Button>
            </Link>
            {!user ? (
              <>
                <Button variant="ghost" size="sm" className="text-sm text-white hover:bg-white/10" onClick={() => setAuthOpen(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
                <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10"><User className="w-4 h-4 mr-2" /> Account</Button>
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
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <nav className="py-4 space-y-2 text-white">
              <div className="px-4 grid gap-2">
                {navItems.map((item) => {
                  const active = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-2 text-sm hover:underline hover:text-blue-100 ${active ? "font-semibold underline text-blue-100" : "text-white"}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <Link to="/all-stores" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full rounded-full bg-white text-[#1d4ed8] hover:bg-blue-50">Book Now</Button>
                </Link>
              </div>
              <div className="px-4 pt-2 flex items-center gap-2">
                {!user ? (
                  <Button variant="ghost" size="sm" className="flex-1 justify-start text-white hover:bg-white/10" onClick={() => { setAuthOpen(true); setIsMenuOpen(false); }}>
                    <User className="w-4 h-4 mr-2" /> Login / Sign Up
                  </Button>
                ) : (
                  <>
                    {role === "owner" ? (
                      <Link to="/store-owner-dashboard" className="flex-1" onClick={() => setIsMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">Owner Dashboard</Button></Link>
                    ) : role === "freelancer" ? (
                      <Link to="/freelancer-dashboard" className="flex-1" onClick={() => setIsMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">Freelancer Dashboard</Button></Link>
                    ) : (
                      <Link to="/user-dashboard" className="flex-1" onClick={() => setIsMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">User Dashboard</Button></Link>
                    )}
                    <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white" onClick={() => { signOut(); setIsMenuOpen(false); }}>Sign out</Button>
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
