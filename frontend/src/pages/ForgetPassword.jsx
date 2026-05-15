// ForgotPassword.jsx

import AuthCard from "@/components/common/ui/AuthCard";
import FormButton from "@/components/common/ui/FormButton";
import FormField from "@/components/common/ui/FormField";
import FormInput from "@/components/common/ui/FormInput";
import TerminalLogo from "@/components/common/ui/TerminalLogo";
import TrustBadge from "@/components/common/ui/TrustBadge";

import { Alert, AlertDescription } from "@/components/ui/alert";

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

import { useDispatch, useSelector } from "react-redux";

import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "@/features/actions/authAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] =
    useState(0);

  // Password requirements
  const PASSWORD_REQUIREMENTS = [
    {
      label: "At least 6 characters",
      check: (pwd) => pwd.length >= 6,
    },
    {
      label: "At least one uppercase letter",
      check: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "At least one number",
      check: (pwd) => /[0-9]/.test(pwd),
    },
  ];
  // OTP Input Change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];

      newOtp[index] = value;

      setOtp(newOtp);

      // Auto focus next
      if (value && index < 5) {
        const nextInput = document.getElementById(
          `otp-${index + 1}`,
        );

        if (nextInput) nextInput.focus();
      }
    }
  };

  // OTP Key Press
  const handleOtpKeyPress = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`,
      );

      if (prevInput) prevInput.focus();
    }
  };

  // Start resend timer
  const startResendCooldown = () => {
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
  };

  // SEND OTP
  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter email");

      return;
    }

    const result = await dispatch(
      forgotPassword(email),
    );

    if (forgotPassword.fulfilled.match(result)) {
      setSuccess("OTP sent successfully");

      setStep(2);

      startResendCooldown();
    } else {
      setError(result.payload);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter 6 digit OTP");

      return;
    }

    const result = await dispatch(
      verifyOtp({
        email,
        otp: otpValue,
      }),
    );

    if (verifyOtp.fulfilled.match(result)) {
      setSuccess("OTP verified successfully");

      setStep(3);
    } else {
      setError(result.payload);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setError("");
    setSuccess("");

    const result = await dispatch(
      forgotPassword(email),
    );

    if (forgotPassword.fulfilled.match(result)) {
      setSuccess("OTP resent successfully");

      startResendCooldown();
    } else {
      setError(result.payload);
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    const failedRequirement =
      PASSWORD_REQUIREMENTS.find(
        (req) => !req.check(newPassword),
      );

    if (failedRequirement) {
      setError(failedRequirement.label);

      return;
    }

    const otpValue = otp.join("");

    const result = await dispatch(
      resetPassword({
        email,
        otp: otpValue,
        newPassword,
      }),
    );

    if (resetPassword.fulfilled.match(result)) {
      setSuccess("Password reset successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setError(result.payload);
    }
  };

  // STEP 1
  const renderEmailScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Forgot Password?
        </h2>

        <p className="text-sm text-muted-foreground">
          Enter your email to receive OTP
        </p>
      </div>

      <FormField
        id="email"
        label="Email Address"
        icon={Mail}
      >
        <FormInput
          id="email"
          type="email"
          placeholder="dev@stack.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>

      {error && (
        <Alert className="bg-red-50 border-red-200 py-2 px-3">
          <AlertDescription className="text-red-500 text-xs font-mono">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 py-2 px-3">
          <AlertDescription className="text-green-500 text-xs font-mono">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <FormButton
        onClick={handleSendOtp}
        disabled={isLoading}
      >
        <span>
          {isLoading
            ? "Sending OTP..."
            : "Send Verification Code"}
        </span>

        <ArrowRight className="w-4 h-4" />
      </FormButton>
    </div>
  );

  // STEP 2
  const renderOtpScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Verify OTP
        </h2>

        <p className="text-sm text-muted-foreground">
          Enter OTP sent to {email}
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
            onChange={(e) =>
              handleOtpChange(index, e.target.value)
            }
            onKeyDown={(e) =>
              handleOtpKeyPress(index, e)
            }
            className="w-12 h-12 text-center text-lg font-semibold border rounded-lg"
          />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleResendOtp}
          disabled={resendCooldown > 0}
          className="text-sm text-primary font-medium"
        >
          {resendCooldown > 0
            ? `Resend OTP in ${resendCooldown}s`
            : "Resend OTP"}
        </button>
      </div>

      {error && (
        <Alert className="bg-red-50 border-red-200 py-2 px-3">
          <AlertDescription className="text-red-500 text-xs font-mono">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 py-2 px-3">
          <AlertDescription className="text-green-500 text-xs font-mono">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-5">
        <FormButton
          onClick={() => setStep(1)}
          variant="outline"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />

          Back
        </FormButton>

        <FormButton
          onClick={handleVerifyOtp}
          disabled={isLoading}
        >
          {isLoading ? (
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

  // STEP 3
  const renderPasswordScreen = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-muted-foreground">
          Create your new password
        </p>
      </div>

      <FormField
        id="newPassword"
        label="New Password"
        icon={Lock}
      >
        <FormInput
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        icon={KeyRound}
      >
        <FormInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />
      </FormField>

      {/* Password Requirements */}
      {newPassword && (
        <div className="text-xs font-mono space-y-2">
          {PASSWORD_REQUIREMENTS.map((req, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                req.check(newPassword)
                  ? "text-green-500"
                  : "text-muted-foreground"
              }`}
            >
              <span>
                {req.check(newPassword) ? "✓" : "○"}
              </span>

              <span>{req.label}</span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <Alert className="bg-red-50 border-red-200 py-2 px-3">
          <AlertDescription className="text-red-500 text-xs font-mono">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 py-2 px-3">
          <AlertDescription className="text-green-500 text-xs font-mono">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-5">
        <FormButton
          onClick={() => setStep(2)}
          variant="outline"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />

          Back
        </FormButton>

        <FormButton
          onClick={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
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
        <TerminalLogo
          name="DevStack"
          tagline="Password Recovery"
        />

        {step === 1 && renderEmailScreen()}

        {step === 2 && renderOtpScreen()}

        {step === 3 && renderPasswordScreen()}

        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center gap-4">
            <TrustBadge
              icon={Shield}
              label="Secure Reset"
            />

            <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />

            <TrustBadge
              icon={BadgeCheck}
              label="256-bit SSL"
            />
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