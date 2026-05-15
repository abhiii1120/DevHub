import AnimatedCircles from "@/components/common/ui/AnimatedCircles";
import AuthCard from "@/components/common/ui/AuthCard";
import BackgroundEffects from "@/components/common/ui/BackgroundEffects";
import Divider from "@/components/common/ui/Divider";
import FormButton from "@/components/common/ui/FormButton";
import FormField from "@/components/common/ui/FormField";
import FormInput from "@/components/common/ui/FormInput";
import PasswordInput from "@/components/common/ui/PasswordInput";
import TerminalLogo from "@/components/common/ui/TerminalLogo";
import TrustBadge from "@/components/common/ui/TrustBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BadgeCheck, Lock, Mail, Shield } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        <AuthCard>
          <TerminalLogo name="DevStack" tagline="Authentication Gateway" />
          <div className="space-y-6">
            <FormField id="email" label="Email Address" icon={Mail}>
              <FormInput
                id="email"
                type="email"
                placeholder="dev@stack.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              icon={Lock}
              rightAction={
                <Link
                  to={"/forget-password"}
                  className="font-mono text-[11px] text-primary hover:text-primary/80 tracking-widest uppercase transition-colors"
                >
                  Forgot Password?
                </Link>
              }
            >
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </FormField>

            {error && (
              <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2 px-3">
                <AlertDescription className="font-mono text-[11px] text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <FormButton onClick={handleSignIn} disabled={loading}>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </FormButton>
            <Divider label="Don't have an account" />
            <FormButton
              onClick={() => navigate("/signup")}
              variant="outline"
              type="secondary"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </FormButton>

            <div className="flex items-center justify-center gap-4 pt-5 border-t border-gray-200 dark:border-gray-800">
              <TrustBadge icon={Shield} label="Encrypted SSL" />
              <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />
              <TrustBadge icon={BadgeCheck} label="ISO 27001" />
            </div>
          </div>
        </AuthCard>
      </div>
    </>
  );
};

export default Login;
