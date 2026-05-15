import AuthCard from "@/components/common/ui/AuthCard";
import Divider from "@/components/common/ui/Divider";
import FormButton from "@/components/common/ui/FormButton";
import FormField from "@/components/common/ui/FormField";
import FormInput from "@/components/common/ui/FormInput";
import PasswordInput from "@/components/common/ui/PasswordInput";
import TerminalLogo from "@/components/common/ui/TerminalLogo";
import TrustBadge from "@/components/common/ui/TrustBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  Shield,
  Lock,
  KeyRound,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  let navigate = useNavigate();

  // Password requirements
  const PASSWORD_REQUIREMENTS = [
    { label: "At least 6 characters", check: (pwd) => pwd.length >= 6 },
    {
      label: "At least one uppercase letter",
      check: (pwd) => /[A-Z]/.test(pwd),
    },
    { label: "At least one number", check: (pwd) => /[0-9]/.test(pwd) },
  ];

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle OTP key press
  const handleOtpKeyPress = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("OTP sent to your email address!");
      setStep(2);

      // Start resend cooldown
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("OTP verified successfully!");
      setStep(3);
    }, 1500);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("OTP resent to your email!");
      setResendCooldown(30);

      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  // Step 3: Reset Password
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const failedRequirement = PASSWORD_REQUIREMENTS.find(
      (req) => !req.check(newPassword),
    );
    if (failedRequirement) {
      setError(failedRequirement.label);
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1500);
  };

  // Step 1: Email Screen
  const renderEmailScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Forgot Password?
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a verification code
        </p>
      </div>

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

      {error && (
        <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2 px-3">
          <AlertDescription className="font-mono text-[11px] text-red-600 dark:text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 py-2 px-3">
          <AlertDescription className="font-mono text-[11px] text-green-600 dark:text-green-400">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <FormButton onClick={handleSendOtp} disabled={loading}>
        <span>Send Verification Code</span>
        <ArrowRight className="w-4 h-4" />
      </FormButton>
    </div>
  );

  // Step 2: OTP Screen
  const renderOtpScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Verify Your Identity
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {email}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyPress(index, e)}
            className="w-12 h-12 text-center text-lg font-mono font-semibold bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-gray-100"
          />
        ))}
      </div>

      <div className="text-center">
        <FormButton onClick={handleResendOtp} disabled={resendCooldown > 0}>
          {resendCooldown > 0
            ? `Resend code in ${resendCooldown}s`
            : "Resend code"}
        </FormButton>
      </div>

      {error && (
        <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2 px-3">
          <AlertDescription className="font-mono text-[11px] text-red-600 dark:text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 py-2 px-3">
          <AlertDescription className="font-mono text-[11px] text-green-600 dark:text-green-400">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-5">
        <FormButton
          onClick={() => setStep(1)}
          variant="outline"
          type="secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </FormButton>
        <FormButton onClick={handleVerifyOtp} disabled={loading}>
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify OTP</span>
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </FormButton>
      </div>
    </div>
  );

  // Step 3: New Password Screen
  const renderPasswordScreen = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Create New Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>

      <FormField id="newPassword" label="New Password" icon={Lock}>
        <FormInput
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FormField>

      <FormField id="confirmPassword" label="Confirm Password" icon={KeyRound}>
        <FormInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormField>

      {/* Password Requirements */}
      {newPassword && (
        <div className="text-[11px] font-mono text-muted-foreground space-y-1.5">
          <p className="text-xs font-semibold mb-1.5">Password requirements:</p>
          <ul className="space-y-1">
            {PASSWORD_REQUIREMENTS.map((req, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 ${
                  req.check(newPassword)
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              >
                <span>{req.check(newPassword) ? "✓" : "○"}</span>
                <span>{req.label}</span>
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

      {success && (
        <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 py-2 px-3">
          <AlertDescription className="font-mono text-[11px] text-green-600 dark:text-green-400">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-5">
        <FormButton
          onClick={() => setStep(2)}
          variant="outline"
          type="secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </FormButton>
        <FormButton onClick={handleResetPassword} disabled={loading}>
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Reset Password</span>
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </FormButton>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      <AuthCard>
        <TerminalLogo name="DevStack" tagline="Password Recovery" />

        {step === 1 && renderEmailScreen()}
        {step === 2 && renderOtpScreen()}
        {step === 3 && renderPasswordScreen()}

        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center gap-4">
            <TrustBadge icon={Shield} label="Secure Reset" />
            <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />
            <TrustBadge icon={BadgeCheck} label="256-bit SSL" />
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            to="/"
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Back to SignIn
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default ForgotPassword;
