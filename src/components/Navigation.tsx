import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Send, Download, History, Settings } from "lucide-react";
import logo from "@/assets/paysift-logo.png";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/send", icon: Send, label: "Send" },
    { path: "/request", icon: Download, label: "Request" },
    { path: "/transactions", icon: History, label: "History" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  // Don't show navigation on payment link page
  if (location.pathname === "/payment-link") return null;

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-13">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PaySift" className="h-10" />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={isActive ? "bg-secondary hover:bg-secondary/90" : ""}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="grid grid-cols-5 gap-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full flex-col h-auto py-2 ${
                      isActive ? "bg-secondary hover:bg-secondary/90" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
