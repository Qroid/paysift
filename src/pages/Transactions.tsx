import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  date: string;
  type: "sent" | "received" | "requested";
  contact: string;
  amount: number;
  status: "completed" | "pending";
  memo?: string;
}

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const allTransactions: Transaction[] = [
    { id: "1", date: "2025-10-02", type: "received", contact: "sarah@email.com", amount: 50.00, status: "completed", memo: "Lunch split" },
    { id: "2", date: "2025-10-01", type: "sent", contact: "john.doe", amount: 125.50, status: "completed", memo: "Movie tickets" },
    { id: "3", date: "2025-09-30", type: "received", contact: "mike@email.com", amount: 200.00, status: "completed" },
    { id: "4", date: "2025-09-29", type: "requested", contact: "emily.smith", amount: 75.00, status: "pending", memo: "Dinner split" },
    { id: "5", date: "2025-09-28", type: "sent", contact: "alex@email.com", amount: 30.00, status: "completed" },
    { id: "6", date: "2025-09-27", type: "received", contact: "lisa@email.com", amount: 150.00, status: "completed", memo: "Freelance work" },
    { id: "7", date: "2025-09-26", type: "sent", contact: "mark.johnson", amount: 85.00, status: "completed", memo: "Gym membership" },
    { id: "8", date: "2025-09-25", type: "received", contact: "kate@email.com", amount: 45.00, status: "completed" },
    { id: "9", date: "2025-09-24", type: "requested", contact: "david.brown", amount: 120.00, status: "pending", memo: "Birthday gift contribution" },
    { id: "10", date: "2025-09-23", type: "sent", contact: "anna@email.com", amount: 60.00, status: "completed", memo: "Concert tickets" },
    { id: "11", date: "2025-09-22", type: "received", contact: "tom@email.com", amount: 95.00, status: "completed" },
    { id: "12", date: "2025-09-21", type: "sent", contact: "rachel.green", amount: 110.00, status: "completed", memo: "Utilities" },
    { id: "13", date: "2025-09-20", type: "received", contact: "chris@email.com", amount: 180.00, status: "completed", memo: "Consulting fee" },
    { id: "14", date: "2025-09-19", type: "requested", contact: "julia.white", amount: 40.00, status: "pending", memo: "Coffee" },
    { id: "15", date: "2025-09-18", type: "sent", contact: "peter@email.com", amount: 75.00, status: "completed" },
  ];

  const filteredTransactions = allTransactions
    .filter(transaction => 
      transaction.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.memo?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Transaction History</h1>
          <p className="text-muted-foreground">View and manage all your transactions.</p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-6 shadow-card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by contact or memo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="shadow-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Memo</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm font-medium text-foreground">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {transaction.contact}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground italic">
                      {transaction.memo || "-"}
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-semibold ${
                      transaction.type === "received" 
                        ? "text-success" 
                        : transaction.type === "sent"
                        ? "text-destructive"
                        : "text-warning"
                    }`}>
                      {transaction.type === "received" ? "+" : transaction.type === "sent" ? "-" : ""}
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        variant={transaction.status === "completed" ? "default" : "secondary"}
                        className={
                          transaction.status === "completed" 
                            ? "bg-success/10 text-success hover:bg-success/20" 
                            : "bg-warning/10 text-warning hover:bg-warning/20"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
