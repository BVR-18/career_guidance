import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import type { RegisterPayload } from "@/types";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>({ defaultValues: { role: "student" } });

  const password = watch("password");

  const onSubmit = async (values: RegisterPayload) => {
    setSubmitting(true);
    try {
      await registerUser(values);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Couldn't create your account. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex-grow flex items-center justify-center px-margin-mobile py-unit-xl">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8 md:p-10 shadow-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Create your account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Start with a quick assessment, get a roadmap in minutes.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Full Name</label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Jordan Rivera"
            />
            {errors.fullName && <p className="text-error font-label-sm text-label-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-error font-label-sm text-label-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Education Stage</label>
            <select
              {...register("educationLevel", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-label-md text-label-md"
            >
              <option value="TENTH">10th Class Student (Choosing Post-10th Stream)</option>
              <option value="INTERMEDIATE">Intermediate Student (Choosing BTech / Degree / Career)</option>
              <option value="BTECH">BTech Student (Job Readiness & Career Roadmap)</option>
            </select>
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-error font-label-sm text-label-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords don't match",
              })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-error font-label-sm text-label-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full hover:bg-primary/90 transition-colors min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting && <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />}
            Create Account
          </button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant text-center mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
