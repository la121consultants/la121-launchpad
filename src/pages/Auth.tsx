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

type AuthMode = "signin" | "signup";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [superAdminPassword, setSuperAdminPassword] = useState("");
  const [superAdminLoading, setSuperAdminLoading] = useState(false);

  const modeCopy: Record<AuthMode, { title: string; description: string }> = {
    signin: {
      title: "Sign In",
      description: "Use your Launchpad credentials to access your workspace",
    },
    signup: {
      title: "Create Account",
      description: "Join Launchpad so you can keep every application organized",
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
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Enter your email above before requesting a reset link");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard`,
      });

      if (error) throw error;

      toast.success("Password reset link sent! Check your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleSuperAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuperAdminLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: superAdminEmail,
        password: superAdminPassword,
      });

      if (error) throw error;
      toast.success("Super admin access granted");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setSuperAdminLoading(false);
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      One secure login works for every role
                    </span>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={handlePasswordReset}
                      disabled={loading}
                    >
                      Forgot password?
                    </button>
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
            </CardContent>
          </Card>

          <div className="order-1 md:order-2 space-y-4">
            <div className="rounded-2xl border bg-muted/40 p-6">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Quick toggle
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["signin", "signup"] as const).map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={authMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAuthMode(mode)}
                  >
                    {mode === "signin" && "Sign In"}
                    {mode === "signup" && "Sign Up"}
                  </Button>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Swap between signing in and creating a new account without leaving this page.
              </p>
            </div>

            <Card className="bg-card shadow-sm">
              <CardHeader>
                <CardTitle>Super Admin Access</CardTitle>
                <CardDescription>
                  Reserved for platform owners who configure organizations and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSuperAdminSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="super-admin-email">Email</Label>
                    <Input
                      id="super-admin-email"
                      type="email"
                      value={superAdminEmail}
                      onChange={(e) => setSuperAdminEmail(e.target.value)}
                      required
                      placeholder="owner@launchpad.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="super-admin-password">Password</Label>
                    <Input
                      id="super-admin-password"
                      type="password"
                      value={superAdminPassword}
                      onChange={(e) => setSuperAdminPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={superAdminLoading}>
                    {superAdminLoading ? "Verifying..." : "Super Admin Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
