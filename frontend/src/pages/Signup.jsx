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
import {  } from "react-redux";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupUser } from "@/features/actions/authAction";
import {
  ArrowRight,
  BadgeCheck,
  Lock,
  Mail,
  Shield,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    try {
      const result = await dispatch(
        signupUser({
          name: name,
          email,
          password,
        }),
      );

      if (signupUser.fulfilled.match(result)) {
        navigate("/");
      } else {
        setError(result.payload);
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  const Password_Requirements = [
    { label: "At least 6 characters", check: (pwd) => pwd.length >= 6 },
    {
      label: "At least one uppercase letter",
      check: (pwd) => /[A-Z]/.test(pwd),
    },
    { label: "At least one number", check: (pwd) => /[0-9]/.test(pwd) },
  ];

  return (
    <>
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        <AuthCard>
          <TerminalLogo name="DevStack" tagline="Create Your Account" />
          <div className="space-y-5">
            <FormField id="name" label="name" icon={User}>
              <FormInput
                id="name"
                type="text"
                placeholder="john_doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </FormField>
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
            {/* Password */}
            <FormField id="password" label="Password" icon={Lock}>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="h-11"
              />
            </FormField>
            {/* Confirm Password */}
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              icon={Lock}
            >
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-11"
              />
            </FormField>
            {password && (
              <div className="text-[11px] font-mono text-muted-foreground space-y-1.5">
                <p className="text-xs font-semibold mb-1.5">
                  Password requirements:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {Password_Requirements.map((req, index) => (
                    <li
                      key={index}
                      className={
                        req.check(password)
                          ? "text-green-500"
                          : "text-muted-foreground"
                      }
                    >
                      ✓ {req.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {error && (
              <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2 px-3">
                <AlertDescription className="font-mono text-[11px] text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <FormButton onClick={handleSignUp} disabled={isLoading}>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </FormButton>
            <Divider label="have an account" />
            <FormButton
              onClick={() => navigate("/")}
              variant="outline"
              type="secondary"
            >
              <span>Sign In</span>
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

export default Signup;
