import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#194774] to-[#1DA5A6] text-white py-16">
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
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
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
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-[#2C2C2C]/70 leading-relaxed">
              At UniTool, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, share, and protect your personal
              information when you use our platform.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-[#1DA5A6]" />
              <span className="text-[#1DA5A6]">1.</span> Information We Collect
            </h2>
            <div className="space-y-4 text-[#2C2C2C]/70 leading-relaxed">
              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-2">
                  Personal Information:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full name and contact details</li>
                  <li>University email address</li>
                  <li>Student ID number and verification documents</li>
                  <li>University name and major/faculty</li>
                  <li>Profile picture (optional)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-2">
                  Transaction Information:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Items listed for rent or borrowed</li>
                  <li>Rental history and transaction details</li>
                  <li>Payment information (processed by third parties)</li>
                  <li>Reviews and ratings</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-2">
                  Usage Information:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device information (IP address, browser type)</li>
                  <li>Log data (access times, pages viewed)</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#1DA5A6]" />
              <span className="text-[#1DA5A6]">2.</span> How We Use Your
              Information
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create and manage your account</li>
                <li>Verify your student status</li>
                <li>Facilitate transactions between users</li>
                <li>Process payments securely</li>
                <li>Send notifications about your account and transactions</li>
                <li>Improve our platform and user experience</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </div>
          </section>

          {/* 3. Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">3.</span> Information Sharing
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                <strong className="text-[#2C2C2C]">
                  We do NOT sell your personal information.
                </strong>
              </p>
              <p>We may share your information with:</p>

              <div className="ml-4 space-y-3">
                <div>
                  <p className="font-bold text-[#2C2C2C]">Other Users:</p>
                  <p>
                    Your name, university, and profile details are visible to
                    facilitate transactions.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#2C2C2C]">
                    Service Providers:
                  </p>
                  <p>
                    Payment processors, cloud hosting, and analytics services
                    that help us operate.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#2C2C2C]">Legal Authorities:</p>
                  <p>
                    When required by law, to protect our rights, or prevent
                    fraud.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#2C2C2C]">
                    Business Transfers:
                  </p>
                  <p>
                    In case of merger, acquisition, or sale of assets, your data
                    may be transferred.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#1DA5A6]" />
              <span className="text-[#1DA5A6]">4.</span> Data Security
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>We implement industry-standard security measures including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure password hashing</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Secure cloud storage</li>
              </ul>
              <p className="mt-4">
                <strong className="text-[#2C2C2C]">Note:</strong> While we
                strive to protect your data, no method of transmission over the
                internet is 100% secure.
              </p>
            </div>
          </section>

          {/* 5. Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">5.</span> Your Rights
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-[#2C2C2C]">Access:</strong> Request a
                  copy of your personal data
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Correction:</strong> Update
                  or correct inaccurate information
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Deletion:</strong> Request
                  deletion of your account and data
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Data Portability:</strong>{" "}
                  Receive your data in a structured format
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Opt-Out:</strong>{" "}
                  Unsubscribe from marketing communications
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@unitool.com"
                  className="text-[#1DA5A6] font-semibold hover:underline"
                >
                  privacy@unitool.com
                </a>
              </p>
            </div>
          </section>

          {/* 6. Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">6.</span> Cookies & Tracking
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>We use cookies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage</li>
                <li>Improve user experience</li>
              </ul>
              <p>
                You can disable cookies in your browser settings, but this may
                affect functionality.
              </p>
            </div>
          </section>

          {/* 7. Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">7.</span> Third-Party Services
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>We may integrate with third-party services such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google Authentication</li>
                <li>Facebook Login</li>
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Analytics tools (Google Analytics)</li>
              </ul>
              <p>
                These services have their own privacy policies. We encourage you
                to review them.
              </p>
            </div>
          </section>

          {/* 8. Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">8.</span> Data Retention
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p>
                After account deletion, we may retain certain information for
                legal and security purposes.
              </p>
            </div>
          </section>

          {/* 9. Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">9.</span> Children's Privacy
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                UniTool is not intended for users under 18. We do not knowingly
                collect information from children.
              </p>
            </div>
          </section>

          {/* 10. Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">10.</span> Changes to This
              Policy
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                We may update this Privacy Policy periodically. We will notify
                you of significant changes via email or platform notification.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <span className="text-[#1DA5A6]">11.</span> Contact Us
            </h2>
            <div className="space-y-3 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                If you have questions about this Privacy Policy or your data:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong className="text-[#2C2C2C]">Email:</strong>{" "}
                  privacy@unitool.com
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Support:</strong>{" "}
                  support@unitool.com
                </li>
                <li>
                  <strong className="text-[#2C2C2C]">Address:</strong> Cairo,
                  Egypt
                </li>
              </ul>
            </div>
          </section>

          {/* Agreement Notice */}
          <div className="bg-[#194774]/5 border-2 border-[#194774]/20 rounded-xl p-6 mt-8">
            <p className="text-sm text-[#2C2C2C] text-center">
              By using UniTool, you acknowledge that you have read and
              understood this Privacy Policy and agree to our data practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}