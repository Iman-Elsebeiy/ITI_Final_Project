"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Search,
  Book,
  Shield,
  CreditCard,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type SupportFormData = {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
};

const faqs = [
  {
    category: "Getting Started",
    icon: Book,
    color: "text-blue-500",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' on the login page, enter your university email, student ID, and complete the verification process. You'll need to upload your student ID card for verification.",
      },
      {
        q: "Who can use UniTool?",
        a: "UniTool is exclusively for verified university students. You must have a valid university email and student ID to register.",
      },
      {
        q: "Is UniTool free to use?",
        a: "Yes! Creating an account and browsing items is completely free. We only charge a small service fee on completed transactions.",
      },
    ],
  },
  {
    category: "Renting & Lending",
    icon: Package,
    color: "text-green-500",
    questions: [
      {
        q: "How do I list an item for rent?",
        a: "Go to 'My Items' > 'Add New Item', upload photos, set your price and rental terms, then publish. Your item will be visible to other students.",
      },
      {
        q: "How do rental periods work?",
        a: "Rental periods are set by the lender. Common options are daily, weekly, or monthly. You can extend rentals by requesting an extension before the due date.",
      },
      {
        q: "What if an item gets damaged?",
        a: "Borrowers are responsible for items during rental. Document the condition before/after with photos. Report damages immediately through the app for resolution.",
      },
      {
        q: "Can I cancel a rental?",
        a: "Cancellations must be made at least 24 hours before pickup. Late cancellations may incur a fee. Check our cancellation policy for details.",
      },
    ],
  },
  {
    category: "Payments & Fees",
    icon: CreditCard,
    color: "text-yellow-500",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept credit/debit cards, mobile wallets, and bank transfers through our secure payment partners.",
      },
      {
        q: "When do I get paid as a lender?",
        a: "Payments are released 24 hours after the borrower confirms successful return. Funds are transferred to your registered bank account or wallet.",
      },
      {
        q: "What are the service fees?",
        a: "We charge a 10% service fee on transactions. Lenders receive 90% of the rental price, and borrowers pay the listed price plus the fee.",
      },
      {
        q: "Are there any refunds?",
        a: "Refunds are available if the lender cancels or the item is not as described. Full refund policies are in our Terms of Service.",
      },
    ],
  },
  {
    category: "Safety & Security",
    icon: Shield,
    color: "text-red-500",
    questions: [
      {
        q: "How do you verify users?",
        a: "All users must verify their university email and upload a valid student ID. We manually review each submission before approval.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes! We use industry-standard encryption and never store your full payment details. All transactions are processed through PCI-compliant partners.",
      },
      {
        q: "How do I report suspicious activity?",
        a: "Use the 'Report' button on any listing or user profile. Our team reviews all reports within 24 hours and takes appropriate action.",
      },
      {
        q: "What if I get scammed?",
        a: "Contact support immediately with transaction details. We have buyer/seller protection and will investigate and resolve disputes fairly.",
      },
    ],
  },
];

const categories = [
  { value: "account", label: "Account & Login" },
  { value: "rental", label: "Rental Issues" },
  { value: "payment", label: "Payment & Billing" },
  { value: "technical", label: "Technical Problem" },
  { value: "safety", label: "Safety & Security" },
  { value: "other", label: "Other" },
];

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>();

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Support ticket:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const toggleFaq = (key: string) => {
    setOpenFaqIndex(openFaqIndex === key ? null : key);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Help Center</h1>
              <p className="text-white/80 text-sm">
                Get answers to your questions and support
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a
            href="mailto:support@unitool.com"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">Email Us</h3>
            <p className="text-sm text-[#2C2C2C]/60 mb-2">
              Get a response within 24 hours
            </p>
            <p className="text-sm font-semibold text-blue-500">
              support@unitool.com
            </p>
          </a>

          <a
            href="tel:+201234567890"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">Call Us</h3>
            <p className="text-sm text-[#2C2C2C]/60 mb-2">
              Mon-Fri, 9 AM - 6 PM
            </p>
            <p className="text-sm font-semibold text-green-500">
              +20 123 456 7890
            </p>
          </a>

          <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group text-left">
            <div className="w-12 h-12 bg-[#1DA5A6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#1DA5A6]" />
            </div>
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">Live Chat</h3>
            <p className="text-sm text-[#2C2C2C]/60 mb-2">
              Chat with our support team
            </p>
            <p className="text-sm font-semibold text-[#1DA5A6]">
              Start conversation
            </p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {filteredFaqs.map((category, catIndex) => {
                if (category.questions.length === 0) return null;

                return (
                  <div key={catIndex} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-[#2C2C2C]">
                        {category.category}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {category.questions.map((faq, faqIndex) => {
                        const key = `${catIndex}-${faqIndex}`;
                        const isOpen = openFaqIndex === key;

                        return (
                          <div
                            key={faqIndex}
                            className="border-b border-[#2C2C2C]/10 last:border-0 pb-3 last:pb-0"
                          >
                            <button
                              onClick={() => toggleFaq(key)}
                              className="w-full flex items-center justify-between gap-4 text-left py-2 group"
                            >
                              <span className="font-semibold text-[#2C2C2C] group-hover:text-[#1DA5A6] transition-colors">
                                {faq.q}
                              </span>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-[#1DA5A6] flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-[#2C2C2C]/40 flex-shrink-0" />
                              )}
                            </button>
                            {isOpen && (
                              <p className="text-sm text-[#2C2C2C]/70 mt-2 leading-relaxed animate-slide-up">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {searchQuery &&
                filteredFaqs.every((cat) => cat.questions.length === 0) && (
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-[#2C2C2C]/40 mx-auto mb-4" />
                    <p className="text-[#2C2C2C]/60">
                      No results found for "{searchQuery}"
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-sm font-semibold text-[#1DA5A6] hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-4">
                Still Need Help?
              </h3>
              <p className="text-sm text-[#2C2C2C]/60 mb-6">
                Submit a support ticket and we'll get back to you soon
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-slide-up">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      Ticket Submitted!
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your name"
                    className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="your@email.com"
                    className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Category
                  </label>
                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                      errors.category
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register("subject", { required: "Subject is required" })}
                    placeholder="Brief description"
                    className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                      errors.subject
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 20,
                        message: "Please provide more details (min 20 characters)",
                      },
                    })}
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Ticket
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}