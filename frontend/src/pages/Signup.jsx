// Signup.jsx

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
  User,
} from "lucide-react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { signupUser } from "@/features/actions/authAction";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter",
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number",
      ),

    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      console.log("FORM SUBMITTED");
  console.log(data);
      const result = await dispatch(
        signupUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );

      if (signupUser.fulfilled.match(result)) {
        navigate("/");
      } else {
        setError("root", {
          message: result.payload || "Signup failed",
        });
      }
    } catch (error) {
      setError("root", {
        message: error.message || "Signup failed",
      });
    }
  };

  const Password_Requirements = [
    {
      label: "At least 6 characters",
      valid: password.length >= 6,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(password),
    },
  ];

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      <AuthCard>
        <TerminalLogo
          name="DevStack"
          tagline="Create Your Account"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <FormField id="name" label="Name" icon={User}>
            <FormInput
              id="name"
              type="text"
              placeholder="john_doe"
              autoComplete="name"
              {...register("name")}
            />
          </FormField>

          {errors.name && (
            <p className="text-red-500 text-xs font-mono -mt-3">
              {errors.name.message}
            </p>
          )}

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
            <p className="text-red-500 text-xs font-mono -mt-3">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <FormField
            id="password"
            label="Password"
            icon={Lock}
          >
            <PasswordInput
              id="password"
              className="h-11"
              {...register("password")}
            />
          </FormField>

          {errors.password && (
            <p className="text-red-500 text-xs font-mono -mt-3">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <FormField
            id="confirmPassword"
            label="Confirm Password"
            icon={Lock}
          >
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your password"
              className="h-11"
              {...register("confirmPassword")}
            />
          </FormField>

          {errors.confirmPassword && (
            <p className="text-red-500 text-xs font-mono -mt-3">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Password Strength */}
          {password && (
            <div className="rounded-xl border border-border p-4 bg-muted/30">
              <p className="text-xs font-semibold mb-3">
                Password Requirements
              </p>

              <div className="space-y-2">
                {Password_Requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`text-xs font-mono flex items-center gap-2 ${
                      req.valid
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        req.valid
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />

                    {req.label}
                  </div>
                ))}
              </div>
            </div>
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
          <FormButton type="submit" disabled={isLoading}>
            <span>
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </span>

            <ArrowRight className="w-4 h-4" />
          </FormButton>

          <Divider label="Already have an account?" />

          <FormButton
            onClick={() => navigate("/")}
            variant="outline"
            type="secondary"
          >
            <span>Sign In</span>

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

export default Signup;