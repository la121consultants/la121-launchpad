import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup" | "reset";
type PortalRole = "user" | "admin" | "super_admin";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<PortalRole>("user");

  const roleOptions: { value: PortalRole; label: string; description: string }[] = [
    { value: "user", label: "User", description: "Track and manage your applications" },
    { value: "admin", label: "Admin", description: "Review candidates and assign mentors" },
    { value: "super_admin", label: "Super Admin", description: "Configure teams and permissions" },
  ];

  const modeCopy: Record<AuthMode, { title: string; description: string }> = {
    signin: {
      title: "Sign In",
      description: "Choose the portal that matches your responsibilities and continue",
    },
    signup: {
      title: "Create Account",
      description: "Join Launchpad so you can keep every application organized",
    },
    reset: {
      title: "Reset Password",
      description: "We'll email you a secure link to set a new password",
    },
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: authData.user.id,
          email: email,
          full_name: fullName,
        });

        if (profileError) throw profileError;

        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const readableRole = role.replace("_", " ");
      toast.success(`Signed in as ${readableRole}!`);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast.success("Password reset email sent! Check your inbox.");
      setResetEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="order-2 md:order-1">
            <CardHeader>
              <CardTitle>{modeCopy[authMode].title}</CardTitle>
              <CardDescription>{modeCopy[authMode].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {authMode === "signin" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select your portal</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-colors",
                          role === option.value
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <p className="text-sm font-semibold capitalize">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {authMode === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Continue"}
                  </Button>
                </form>
              )}

              {authMode === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              )}

              {authMode === "reset" && (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="order-1 md:order-2 space-y-4">
            <div className="rounded-2xl border bg-muted/40 p-6">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Quick actions
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["signin", "signup", "reset"] as const).map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={authMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthMode(mode)}
                  >
                    {mode === "signin" && "Sign In"}
                    {mode === "signup" && "Sign Up"}
                    {mode === "reset" && "Reset"}
                  </Button>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Switch between sign in, account creation, or password reset without leaving the page.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-base font-semibold">Need elevated access?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Admin and super admin logins share the same secure form. Choose your portal and use your
                assigned credentials to continue.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Users manage their own job pipeline</li>
                <li>• Admins oversee teams and review submissions</li>
                <li>• Super admins configure global settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
