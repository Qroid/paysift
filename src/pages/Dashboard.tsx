import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Copy, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "sent" | "received" | "requested";
  contact: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  memo?: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [balance] = useState(2,857.56);
  
  const recentTransactions: Transaction[] = [
    { id: "1", type: "received", contact: "sarah@email.com", amount: 50.00, date: "2025-10-02", status: "completed", memo: "Lunch split" },
    { id: "2", type: "sent", contact: "john.doe", amount: 125.50, date: "2025-10-01", status: "completed", memo: "Movie tickets" },
    { id: "3", type: "received", contact: "mike@email.com", amount: 200.00, date: "2025-09-30", status: "completed" },
    { id: "4", type: "requested", contact: "emily.smith", amount: 75.00, date: "2025-09-29", status: "pending", memo: "Dinner split" },
    { id: "5", type: "sent", contact: "alex@email.com", amount: 30.00, date: "2025-09-28", status: "completed" },
  ];

  const handleCopyLink = () => {
    const link = `${window.location.origin}/pay/David Mwaura`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied!",
      description: "Your payment link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Balance Card */}
        <Card className="p-8 mb-8 border-2 border-primary shadow-elegant bg-gradient-dark">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium mb-2">Current Balance</p>
              <h2 className="text-5xl font-bold text-primary-foreground mb-4">
                ${balance.toFixed(2)}
              </h2>
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+13.5% this month</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/payment-link">
                <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow">
                  Share My Link
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="w-full md:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Payment Link
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/send">
            <Card className="p-6 hover:shadow-card transition-all cursor-pointer group border-2 hover:border-secondary">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                  <ArrowUpRight className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Send Money</h3>
                  <p className="text-muted-foreground text-sm">Transfer funds to anyone</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/request">
            <Card className="p-6 hover:shadow-card transition-all cursor-pointer group border-2 hover:border-secondary">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors">
                  <ArrowDownLeft className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Request Money</h3>
                  <p className="text-muted-foreground text-sm">Ask for payment</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Recent Activity</h3>
            </div>
            <Link to="/transactions">
              <Button variant="ghost" className="text-secondary hover:text-secondary/80">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "received" 
                      ? "bg-success/10" 
                      : transaction.type === "sent"
                      ? "bg-destructive/10"
                      : "bg-warning/10"
                  }`}>
                    {transaction.type === "received" ? (
                      <ArrowDownLeft className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpRight className={`h-4 w-4 ${
                        transaction.type === "sent" ? "text-destructive" : "text-warning"
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">{transaction.contact}</p>
                    {transaction.memo && (
                      <p className="text-xs text-muted-foreground italic">{transaction.memo}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "received" 
                      ? "text-success" 
                      : transaction.type === "sent"
                      ? "text-destructive"
                      : "text-warning"
                  }`}>
                    {transaction.type === "received" ? "+" : transaction.type === "sent" ? "-" : ""}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
