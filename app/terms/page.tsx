import Link from "next/link";
import { ArrowLeft, Scale, Shield, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
              <p className="text-white/80 text-sm">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Please read carefully:</strong> By using UniTool, you
              agree to be bound by these Terms of Service. If you do not agree,
              please do not use our platform.
            </p>
          </div>

          {/* 1. Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">1.</span> Acceptance of Terms
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                Welcome to UniTool ("we," "our," or "us"). By accessing or
                using our platform, you agree to comply with and be bound by
                these Terms of Service ("Terms").
              </p>
              <p>
                UniTool is a peer-to-peer marketplace designed exclusively for
                university students to share, rent, and save money on academic
                tools and equipment.
              </p>
            </div>
          </section>

          {/* 2. Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">2.</span> Eligibility
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>To use UniTool, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be currently enrolled in an accredited university</li>
                <li>Be at least 18 years of age</li>
                <li>
                  Provide accurate and valid university email and student ID
                </li>
                <li>Not have been previously banned from the platform</li>
              </ul>
            </div>
          </section>

          {/* 3. User Accounts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">3.</span> User Accounts
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                <strong className="text-[#2C2C2C]">Account Security:</strong>{" "}
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities under your account.
              </p>
              <p>
                <strong className="text-[#2C2C2C]">
                  Accurate Information:
                </strong>{" "}
                You agree to provide truthful, accurate, and complete
                information during registration and to update it as necessary.
              </p>
              <p>
                <strong className="text-[#2C2C2C]">Account Suspension:</strong>{" "}
                We reserve the right to suspend or terminate accounts that
                violate these Terms.
              </p>
            </div>
          </section>

          {/* 4. Platform Usage */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">4.</span> Platform Usage
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                <strong className="text-[#2C2C2C]">Permitted Use:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Listing academic tools, equipment, and educational items</li>
                <li>Renting items from other verified students</li>
                <li>
                  Communicating respectfully with other users via our messaging
                  system
                </li>
              </ul>

              <p className="mt-4">
                <strong className="text-[#2C2C2C]">Prohibited Activities:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Listing illegal, stolen, or prohibited items</li>
                <li>Fraudulent transactions or scamming other users</li>
                <li>Harassment, hate speech, or abusive behavior</li>
                <li>Creating fake accounts or impersonating others</li>
                <li>Using the platform for non-educational purposes</li>
              </ul>
            </div>
          </section>

          {/* 5. Transactions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">5.</span> Transactions
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                <strong className="text-[#2C2C2C]">Rental Agreements:</strong>{" "}
                All rental transactions are agreements between individual users.
                UniTool acts as a facilitator and is not a party to these
                transactions.
              </p>
              <p>
                <strong className="text-[#2C2C2C]">Payment Processing:</strong>{" "}
                We use secure third-party payment processors. You agree to
                comply with their terms of service.
              </p>
              <p>
                <strong className="text-[#2C2C2C]">Disputes:</strong> Users are
                encouraged to resolve disputes directly. UniTool provides a
                mediation system but is not liable for transaction outcomes.
              </p>
            </div>
          </section>

          {/* 6. Item Condition & Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">6.</span> Item Condition &
              Liability
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                <strong className="text-[#2C2C2C]">Lenders Must:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accurately describe item condition</li>
                <li>Provide functional and safe equipment</li>
                <li>Set fair rental prices and terms</li>
              </ul>

              <p className="mt-4">
                <strong className="text-[#2C2C2C]">Borrowers Must:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Return items in the same condition</li>
                <li>Pay for any damage caused during rental period</li>
                <li>Return items on time</li>
              </ul>
            </div>
          </section>

          {/* 7. Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">7.</span> Intellectual Property
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                All content on UniTool, including logos, design, text, and
                software, is owned by UniTool or its licensors and protected by
                copyright and trademark laws.
              </p>
              <p>
                Users retain ownership of content they upload but grant UniTool
                a license to display and promote such content on the platform.
              </p>
            </div>
          </section>

          {/* 8. Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">8.</span> Limitation of
              Liability
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                UniTool is provided "as is" without warranties of any kind. We
                are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Losses resulting from user transactions</li>
                <li>Damages to rented items</li>
                <li>User conduct or interactions</li>
                <li>
                  Service interruptions, data loss, or technical issues
                </li>
              </ul>
            </div>
          </section>

          {/* 9. Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">9.</span> Termination
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                We reserve the right to suspend or terminate your account at
                any time for violations of these Terms, fraudulent activity, or
                any other reason at our sole discretion.
              </p>
            </div>
          </section>

          {/* 10. Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">10.</span> Changes to Terms
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                We may update these Terms from time to time. Continued use of
                the platform after changes constitutes acceptance of the updated
                Terms.
              </p>
            </div>
          </section>

          {/* 11. Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">11.</span> Governing Law
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                These Terms are governed by the laws of Egypt. Any disputes
                shall be resolved in the courts of Cairo.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">12.</span> Contact Us
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>If you have questions about these Terms, please contact us:</p>
              <ul className="space-y-2">
                <li>
                  <strong className="text-[#2C2C2C]">Email:</strong>{" "}
                  legal@unitool.com
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Support:</strong>{" "}
                  support@unitool.com
                </li>
              </ul>
            </div>
          </section>

          {/* Agreement Notice */}
          <div className="bg-[#1DA5A6]/5 border-2 border-[#1DA5A6]/20 rounded-xl p-6 mt-8">
            <p className="text-sm text-[#2C2C2C] text-center">
              By clicking "I Agree" or using UniTool, you acknowledge that you
              have read, understood, and agree to be bound by these Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}