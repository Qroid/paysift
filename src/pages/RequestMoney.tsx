import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RequestMoney = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipient || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Sent!",
      description: `Payment request for $${parseFloat(formData.amount).toFixed(2)} sent to ${formData.recipient}`,
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Request Money</h1>
          <p className="text-muted-foreground">Ask for payment from anyone quickly and easily.</p>
        </div>

        {/* Request Money Form */}
        <Card className="p-8 shadow-elegant">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-base font-semibold">
                Request From Email or Username *
              </Label>
              <Input
                id="recipient"
                type="text"
                placeholder="email@example.com or username"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                className="h-12 text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-semibold">
                Amount to Request ($) *
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="h-14 text-2xl font-semibold pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-base font-semibold">
                Note to Sender (Optional)
              </Label>
              <Textarea
                id="note"
                placeholder="What's this request for?"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full h-14 text-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Confirm Request
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                The recipient will be notified of your payment request
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestMoney;
