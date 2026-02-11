import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  // const { user, signOut } = useAuth();
  const user = null; // Temporary - no auth
  const signOut = async () => {}; // Temporary
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/how-it-works", label: t("nav.howItWorks") },
    { path: "/pricing", label: t("nav.pricing") },
    { path: "/about", label: t("nav.about") },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo size="sm" showText={true} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path.split("#")[0] ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link to="/dashboard">{t('nav.dashboard')}</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      {t('nav.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/brief">{t("nav.getStarted")}</Link>
                </Button>
              </>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.dashboard')}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.settings')}
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.login')}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/brief" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.getStarted')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
