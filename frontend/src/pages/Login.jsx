// Login.jsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthCard from "@/components/common/ui/AuthCard";
import Divider from "@/components/common/ui/Divider";
import FormButton from "@/components/common/ui/FormButton";
import FormField from "@/components/common/ui/FormField";
import FormInput from "@/components/common/ui/FormInput";
import PasswordInput from "@/components/common/ui/PasswordInput";
import TerminalLogo from "@/components/common/ui/TerminalLogo";
import TrustBadge from "@/components/common/ui/TrustBadge";

import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  ArrowRight,
  BadgeCheck,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

import React from "react";
import { Link, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/actions/authAction";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(result)) {
        navigate("/main");
      } else {
        setError("root", {
          message: result.payload || "Invalid credentials",
        });
      }
    } catch (error) {
      setError("root", {
        message: "Login failed",
      });
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      <AuthCard>
        <TerminalLogo
          name="DevStack"
          tagline="Authentication Gateway"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Email */}
          <FormField
            id="email"
            label="Email Address"
            icon={Mail}
          >
            <FormInput
              id="email"
              type="email"
              placeholder="dev@stack.io"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          {errors.email && (
            <p className="text-red-500 text-xs font-mono -mt-4">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
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
              className="h-11"
              {...register("password")}
            />
          </FormField>

          {errors.password && (
            <p className="text-red-500 text-xs font-mono -mt-4">
              {errors.password.message}
            </p>
          )}

          {/* Backend Error */}
          {errors.root && (
            <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2 px-3">
              <AlertDescription className="font-mono text-[11px] text-red-600 dark:text-red-400">
                {errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <FormButton but="submit" disabled={isLoading}>
            <span>
              {isLoading ? "Signing In..." : "Sign In"}
            </span>

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

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 pt-5 border-t border-gray-200 dark:border-gray-800">
            <TrustBadge icon={Shield} label="Encrypted SSL" />

            <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />

            <TrustBadge icon={BadgeCheck} label="ISO 27001" />
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;