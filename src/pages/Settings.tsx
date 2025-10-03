import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Camera, CreditCard, Plus, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    username: "AwesomeUser",
    email: "john@email.com",
  });

  const linkedAccounts = [
    { id: "1", bank: "Chase Checking", last4: "1234", type: "Bank Account" },
    { id: "2", bank: "Visa", last4: "5678", type: "Credit Card" },
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled for enhanced security.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Camera className="h-5 w-5 text-secondary" />
              Profile
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=AwesomeUser" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveProfile} className="bg-secondary hover:bg-secondary/90">
                  Save Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Section */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              Security
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>

              <Button variant="outline">Change Password</Button>

              <Separator className="my-6" />

              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="space-y-1">
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <p className={`text-sm font-medium ${twoFactorEnabled ? "text-success" : "text-muted-foreground"}`}>
                    Status: {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                  className="data-[state=checked]:bg-success"
                />
              </div>
            </div>
          </Card>

          {/* Funding Section */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-secondary" />
              Funding Sources
            </h2>

            <div className="space-y-4 mb-6">
              {linkedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <CreditCard className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{account.bank}</h3>
                      <p className="text-sm text-muted-foreground">
                        {account.type} •••• {account.last4}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90">
              <Plus className="mr-2 h-4 w-4" />
              Link New Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
