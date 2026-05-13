"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  Upload,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { updateProfile } from "@/lib/data/profile";

type SetupFormData = {
  university: string;
  major: string;
  role: "borrower" | "lender" | "both";
  studentId: FileList;
};

const universities = [
  "Cairo University",
  "Ain Shams University",
  "Alexandria University",
  "American University in Cairo (AUC)",
  "German University in Cairo (GUC)",
  "British University in Egypt (BUE)",
  "Nile University",
  "Future University in Egypt (FUE)",
  "Other",
];

const majors = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Medicine",
  "Pharmacy",
  "Arts & Design",
  "Law",
  "Mass Communication",
  "Other",
];

const roles = [
  { id: "borrower", title: "Borrower", description: "I want to rent tools from others", icon: "🎒", color: "from-blue-500 to-cyan-500" },
  { id: "lender", title: "Lender", description: "I want to lend my tools to earn", icon: "💼", color: "from-green-500 to-emerald-500" },
  { id: "both", title: "Both", description: "I want to rent and lend tools", icon: "🤝", color: "from-[#1DA5A6] to-[#194774]" },
];

export default function SetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetupFormData>();

  const selectedUniversity = watch("university");
  const selectedMajor = watch("major");
  const selectedRole = watch("role");

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const onSubmit = async (data: SetupFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    const result = await updateProfile({
      university: data.university,
      faculty: data.major,
      role: data.role,
    });

    setIsSubmitting(false);

    if (result.error) {
      setSubmitError(result.error);
      return;
    }

    router.push("/home");
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedUniversity;
      case 2: return selectedMajor;
      case 3: return selectedRole;
      case 4: return uploadedFile;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            <span className="text-[#1DA5A6]">Complete</span>
            <span className="text-[#2C2C2C]"> Your Profile</span>
          </h1>
          <p className="text-[#2C2C2C]/60 text-sm">Step {currentStep} of {totalSteps}</p>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-900 font-semibold">
            {submitError}
          </div>
        )}

        <div className="mb-8">
          <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-[#1DA5A6] to-[#194774] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`text-xs font-semibold transition-colors ${step <= currentStep ? "text-[#1DA5A6]" : "text-[#2C2C2C]/30"}`}>
                {step === 1 && "University"}
                {step === 2 && "Major"}
                {step === 3 && "Role"}
                {step === 4 && "Verify"}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[400px] flex flex-col">
            {currentStep === 1 && (
              <div className="flex-1">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Select Your University</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Choose the university you&apos;re currently enrolled in</p>
                </div>
                <div className="space-y-3">
                  {universities.map((uni) => (
                    <label key={uni} className={`block p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedUniversity === uni ? "border-[#1DA5A6] bg-[#1DA5A6]/5 shadow-md" : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"}`}>
                      <input type="radio" value={uni} {...register("university", { required: "Please select a university" })} className="sr-only" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#2C2C2C]">{uni}</span>
                        {selectedUniversity === uni && <CheckCircle2 className="w-5 h-5 text-[#1DA5A6]" />}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.university && <p className="text-red-500 text-sm mt-2">{errors.university.message}</p>}
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex-1">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">What&apos;s Your Major?</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">This helps us show you relevant tools</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {majors.map((major) => (
                    <label key={major} className={`block p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedMajor === major ? "border-[#1DA5A6] bg-[#1DA5A6]/5 shadow-md" : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"}`}>
                      <input type="radio" value={major} {...register("major", { required: "Please select your major" })} className="sr-only" />
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#2C2C2C]">{major}</span>
                        {selectedMajor === major && <CheckCircle2 className="w-5 h-5 text-[#1DA5A6] flex-shrink-0" />}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.major && <p className="text-red-500 text-sm mt-2">{errors.major.message}</p>}
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex-1">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Choose Your Role</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">How do you plan to use UniTool?</p>
                </div>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <label key={role.id} className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedRole === role.id ? "border-[#1DA5A6] bg-gradient-to-br from-[#1DA5A6]/5 to-[#194774]/5 shadow-lg" : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"}`}>
                      <input type="radio" value={role.id} {...register("role", { required: "Please select a role" })} className="sr-only" />
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-2xl shadow-md`}>{role.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">{role.title}</h3>
                          <p className="text-sm text-[#2C2C2C]/60">{role.description}</p>
                        </div>
                        {selectedRole === role.id && <CheckCircle2 className="w-6 h-6 text-[#1DA5A6] flex-shrink-0" />}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>}
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex-1">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Verify Your Identity</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Upload your student ID (Karnay) for verification</p>
                </div>
                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                  uploadedFile ? "border-[#1DA5A6] bg-[#1DA5A6]/5" : "border-[#2C2C2C]/20 hover:border-[#1DA5A6]/50"}`}>
                  <input type="file" {...register("studentId", { required: "Student ID is required" })}
                    onChange={handleFileChange} accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#1DA5A6]/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-[#1DA5A6]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#2C2C2C]">{uploadedFile.name}</p>
                            <p className="text-xs text-[#2C2C2C]/60">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setUploadedFile(null)}
                          className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors">
                          <X className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-sm text-green-700 font-medium">Ready to submit! Click &quot;Complete Setup&quot; below.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-[#2C2C2C]/40 mx-auto mb-4" />
                      <p className="text-base font-semibold text-[#2C2C2C] mb-2">Upload Student ID</p>
                      <p className="text-sm text-[#2C2C2C]/60 mb-4">Drag and drop or click to browse</p>
                      <p className="text-xs text-[#2C2C2C]/40">PNG, JPG or PDF (max. 5MB)</p>
                    </div>
                  )}
                </div>
                {errors.studentId && <p className="text-red-500 text-sm mt-2">{errors.studentId.message}</p>}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Your information is secure and will only be used for verification purposes.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack}
                className="flex-1 h-14 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] font-semibold rounded-xl hover:border-[#1DA5A6]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5" />Back
              </button>
            )}
            {currentStep < totalSteps ? (
              <button type="button" onClick={handleNext} disabled={!canProceed()}
                className="flex-1 h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                Next<ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button type="submit" disabled={!canProceed() || isSubmitting}
                className="flex-1 h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up...
                  </span>
                ) : "Complete Setup"}
              </button>
            )}
          </div>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => router.push("/home")} className="text-sm text-[#2C2C2C]/60 hover:text-[#2C2C2C] transition-colors">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
