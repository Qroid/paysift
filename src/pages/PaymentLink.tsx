import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Check, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// App ID: 100634
const PaymentLink = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const username = "AwesomeUser";
  const paymentUrl = `${window.location.origin}/pay/${username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Your payment link has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast({
        title: "Amount Required",
        description: "Please enter an amount to send.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Processing",
      description: `Sending $${parseFloat(amount).toFixed(2)} to ${username}`,
    });

    // Reset form
    setAmount("");
    setMemo("");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Profile Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary-foreground/20 shadow-glow">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=AwesomeUser" />
                <AvatarFallback className="text-3xl">AU</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Active
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-2">
              {username}
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Send money instantly
            </p>
          </div>

          {/* Payment Link Display */}
          <Card className="p-4 bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="flex-1 text-left">
                <p className="text-xs text-primary-foreground/60 mb-1">Your Payment Link</p>
                <p className="text-primary-foreground font-mono text-sm truncate">
                  {paymentUrl}
                </p>
              </div>
              <Button
                onClick={handleCopyLink}
                size="sm"
                className={`shrink-0 transition-all ${
                  copied 
                    ? "bg-success hover:bg-success/90" 
                    : "bg-secondary hover:bg-secondary/90"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Payment Form */}
        <Card className="p-8 shadow-elegant bg-card">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            Send Payment
          </h2>
          
          <form onSubmit={handleSendPayment} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-semibold text-foreground">
                Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-16 text-3xl font-bold pl-12 text-center"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="memo" className="text-sm font-semibold text-foreground">
                Add a Note (Optional)
              </label>
              <Textarea
                id="memo"
                placeholder="What's this for?"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <Button 
              type="submit"
              className="w-full h-14 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg font-semibold"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Payment
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Powered by PayFlow • Secure & Instant Transfer
            </p>
          </form>
        </Card>

        <div className="text-center">
          <a href="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentLink;
