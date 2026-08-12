import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import type { LoginPayload, EducationLevel } from "@/types";

const demoCredentials: Record<EducationLevel, { email: string; pass: string; title: string; subtitle: string }> = {
  TENTH: {
    email: "tenth.demo@careerverse.com",
    pass: "Demo@123",
    title: "10th Class Demo",
    subtitle: "Explore Stream Choices (MPC, BiPC, MEC, CEC, Polytechnic)",
  },
  INTERMEDIATE: {
    email: "inter.demo@careerverse.com",
    pass: "Demo@123",
    title: "Intermediate Demo",
    subtitle: "Explore Post-Inter Options (What is BTech, Degrees, CA, Law)",
  },
  BTECH: {
    email: "btech.demo@careerverse.com",
    pass: "Demo@123",
    title: "BTech Demo",
    subtitle: "Explore Engineering Job Roles, DSA & Career Readiness",
  },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>("BTECH");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginPayload & { remember: boolean }>();

  const onSubmit = async (values: LoginPayload) => {
    setSubmitting(true);
    try {
      await login({
        email: values.email,
        password: values.password,
        educationLevel: selectedLevel,
      });
      const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    const creds = demoCredentials[selectedLevel];
    setValue("email", creds.email);
    setValue("password", creds.pass);
    toast.success(`Loaded ${creds.title} credentials! Click Sign In.`);
  };

  return (
    <section className="flex-grow flex items-center justify-center px-margin-mobile py-unit-xl">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 md:p-10 shadow-lg flex flex-col gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome to CareerVerse</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Select your student education stage to access personalized guidance.
          </p>
        </div>

        {/* Education Level Selector Tabs */}
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 font-semibold">
            Select Your Education Category:
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-surface-container-high border border-outline-variant/30">
            {(["TENTH", "INTERMEDIATE", "BTECH"] as EducationLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`py-2.5 px-2 rounded-lg font-label-sm text-label-sm transition-all text-center flex flex-col items-center justify-center ${
                  selectedLevel === level
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                <span>{level === "TENTH" ? "10th Student" : level === "INTERMEDIATE" ? "Intermediate" : "BTech Student"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Account Quick Launcher */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-label-sm text-label-sm text-primary font-bold block">
              {demoCredentials[selectedLevel].title} Account
            </span>
            <span className="font-body-xs text-[12px] text-on-surface-variant">
              {demoCredentials[selectedLevel].subtitle}
            </span>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary font-label-sm text-label-sm px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1 font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Use Demo Login
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-error font-label-sm text-label-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            {errors.password && <p className="text-error font-label-sm text-label-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <input type="checkbox" {...register("remember")} className="rounded border-outline-variant text-primary focus:ring-primary" />
              Remember me
            </label>
            <Link to="#" className="font-label-sm text-label-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full hover:bg-primary/90 transition-colors min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
          >
            {submitting && <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />}
            Sign In as {selectedLevel === "TENTH" ? "10th Student" : selectedLevel === "INTERMEDIATE" ? "Intermediate Student" : "BTech Student"}
          </button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
