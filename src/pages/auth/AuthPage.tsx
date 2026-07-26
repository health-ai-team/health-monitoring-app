import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Heart,
  Activity,
  Brain,
  Shield,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

type AuthMode = "login" | "signup";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === "signup") {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (mode === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call — replace with real auth integration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
        </div>

        {/* Floating Health Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-[15%] left-[12%] w-8 h-8 text-white/10 animate-pulse" />
          <Activity className="absolute top-[25%] right-[20%] w-10 h-10 text-white/10" />
          <Brain className="absolute bottom-[35%] left-[20%] w-9 h-9 text-white/10 animate-pulse" />
          <Shield className="absolute bottom-[25%] right-[15%] w-11 h-11 text-white/10" />
          <Stethoscope className="absolute top-[45%] left-[8%] w-7 h-7 text-white/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                HealthMonitor
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              {mode === "login"
                ? "Welcome back to your health journey"
                : "Start your health monitoring journey"}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              {mode === "login"
                ? "Track your vitals, monitor trends, and stay connected with your healthcare team."
                : "Create an account to access personalized health insights and real-time monitoring."}
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {[
              { icon: Activity, text: "Real-time health vitals monitoring" },
              { icon: Brain, text: "AI-powered health insights" },
              { icon: Shield, text: "Secure HIPAA-compliant platform" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-200">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              HealthMonitor
            </span>
          </div>

          <Card className="glass-card shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900">
                {mode === "login" ? "Sign in" : "Create account"}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {mode === "login"
                  ? "Enter your credentials to access your dashboard"
                  : "Fill in the details below to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name Field — Signup only */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    mode === "signup" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="space-y-2 pb-4">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={cn(
                          "pl-10 transition-all duration-200",
                          errors.name && "border-red-400 focus-visible:ring-red-400"
                        )}
                        value={formData.name}
                        onChange={handleChange("name")}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.email && "border-red-400 focus-visible:ring-red-400"
                      )}
                      value={formData.email}
                      onChange={handleChange("email")}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 pr-10 transition-all duration-200",
                        errors.password && "border-red-400 focus-visible:ring-red-400"
                      )}
                      value={formData.password}
                      onChange={handleChange("password")}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password — Signup only */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    mode === "signup" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="space-y-2 pb-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={cn(
                          "pl-10 pr-10 transition-all duration-200",
                          errors.confirmPassword &&
                            "border-red-400 focus-visible:ring-red-400"
                        )}
                        value={formData.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="xl"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-200 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {mode === "login" ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === "login" ? "Sign in" : "Create account"}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                {/* Toggle Mode */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    {mode === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={switchMode}
                          className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={switchMode}
                          className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Protected by end-to-end encryption. HIPAA compliant.
          </p>
        </div>
      </div>
    </div>
  );
}
