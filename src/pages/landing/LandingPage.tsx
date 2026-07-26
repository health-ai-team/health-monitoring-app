import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Activity,
  Brain,
  Shield,
  TrendingUp,
  Clock,
  Users,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Smartphone,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Vitals",
    description: "Continuous monitoring of heart rate, blood pressure, oxygen levels, and more with instant updates.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Machine learning algorithms detect anomalies and predict health trends before they become critical.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade encryption and security measures keep your health data safe and private.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Intelligent notification system alerts you and your healthcare providers when action is needed.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Care Team Access",
    description: "Seamlessly share your health data with doctors, specialists, and family members.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your health dashboard from any device with our fully responsive design.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const stats = [
  { label: "Active Users", value: "12,000+", icon: Users },
  { label: "Alerts Sent", value: "50,000+", icon: Bell },
  { label: "Avg. Response", value: "< 2 min", icon: Clock },
  { label: "Accuracy", value: "99.2%", icon: TrendingUp },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-50/50" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal-50/30" />
          <Heart className="absolute top-1/4 right-1/4 w-16 h-16 text-teal-100/50" />
          <Activity className="absolute bottom-1/4 left-1/3 w-12 h-12 text-teal-100/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6">
              <Heart className="w-3.5 h-3.5 mr-1.5" />
              AI-Powered Health Monitoring
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Your Health,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                Always Monitored
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Real-time health tracking powered by AI. Get instant alerts, 
              personalized insights, and seamless connectivity with your 
              healthcare team — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-200 w-full sm:w-auto"
                >
                  Start Monitoring
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  <Stethoscope className="mr-2 w-4 h-4" />
                  Doctor Portal
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                End-to-End Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                FDA Registered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-teal-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay healthy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              From real-time vitals monitoring to AI-powered insights, we provide 
              the tools you need to take control of your health.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-md hover:border-teal-100 transition-all duration-300 border-gray-200"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-10 left-10 w-20 h-20 text-white/5" />
          <Activity className="absolute bottom-10 right-10 w-24 h-24 text-white/5" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your health monitoring?
          </h2>
          <p className="text-lg text-teal-100 mb-8 max-w-xl mx-auto">
            Join thousands of patients and healthcare providers who trust HealthMonitor AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button
                size="xl"
                className="bg-white text-teal-700 hover:bg-teal-50 shadow-xl shadow-teal-900/20"
              >
                Get Started Free
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="xl"
                variant="outline"
                className="border-teal-400 text-white hover:bg-teal-500"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
