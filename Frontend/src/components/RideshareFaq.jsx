import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  CreditCard,
  Shield,
  Bike,
  User,
} from "lucide-react";

function RideShareFaq() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const supportCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: <BookOpen className="w-5 h-5" />,
      description: "New to our platform? Start here",
    },
    {
      id: "booking-rides",
      name: "Booking Rides",
      icon: <Users className="w-5 h-5" />,
      description: "How to book and manage rides",
    },
    {
      id: "offering-rides",
      name: "Offering Rides",
      icon: <Bike className="w-5 h-5" />,
      description: "Become a driver and offer rides",
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Payment methods and billing",
    },
    {
      id: "safety",
      name: "Safety & Security",
      icon: <Shield className="w-5 h-5" />,
      description: "Safety features and reporting",
    },
    {
      id: "account",
      name: "Account Management",
      icon: <User className="w-5 h-5" />,
      description: "Profile, settings, and verification",
    },
  ];

  const faqData = {
    "getting-started": [
      {
        question: "How do I sign up for RideShare?",
        answer:
          "You can sign up by downloading our app or visiting our website. Choose whether you want to register as a rider or driver, provide your basic information, and verify your phone number. For drivers, additional verification including driving license is required.",
      },
      {
        question: "Is RideShare only for motorbikes?",
        answer:
          "Yes, RideShare is specifically designed for motorbike ridesharing. This allows for more flexible routes, faster travel times, and cost-effective transportation in urban areas.",
      },
      {
        question: "What cities is RideShare available in?",
        answer:
          "We're currently available in major cities across India. Check our app or website for the complete list of supported cities. We're rapidly expanding to new locations.",
      },
      {
        question: "Do I need to pay any registration fees?",
        answer:
          "Registration is completely free for both riders and drivers. We only charge a small commission on completed rides to maintain and improve our platform.",
      },
    ],
    "booking-rides": [
      {
        question: "How do I book a ride?",
        answer:
          "Open the app, enter your pickup and drop-off locations, select your preferred time, and browse available rides. Choose a driver based on their rating, route, and price, then send a booking request.",
      },
      {
        question: "Can I cancel a booking?",
        answer:
          "Yes, you can cancel a booking up to 30 minutes before the scheduled ride time without any penalty. Cancellations within 30 minutes may incur a small fee.",
      },
      {
        question: "What if the driver doesn't show up?",
        answer:
          "If a driver doesn't arrive within 15 minutes of the scheduled time, you can cancel the ride without penalty and report the issue. We'll help you find an alternative ride quickly.",
      },
      {
        question: "How do I track my ride?",
        answer:
          "Once your ride is confirmed, you can track the driver's location in real-time through the app. You'll also receive notifications about pickup time and route updates.",
      },
    ],
    "offering-rides": [
      {
        question: "What are the requirements to become a driver?",
        answer:
          "You need a valid driving license, registered motorbike, helmet for passengers, and must pass our verification process. You should also have a good driving record and be at least 18 years old.",
      },
      {
        question: "How is my driving license verified?",
        answer:
          "We verify your driving license through official government databases and may require you to upload clear photos of your license. This ensures all drivers are properly licensed and qualified.",
      },
      {
        question: "How much can I earn as a driver?",
        answer:
          "Earnings vary based on distance, demand, and frequency of rides. On average, drivers earn ₹200-800 per day. You keep 80% of the fare, with 20% going to platform maintenance and support.",
      },
      {
        question: "Can I choose my own routes and timings?",
        answer:
          "Absolutely! You have complete flexibility to set your preferred routes and available times. You can offer rides along routes you regularly travel, making it convenient for you.",
      },
    ],
    payments: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept UPI, credit/debit cards, digital wallets (Paytm, PhonePe, Google Pay), and net banking. All transactions are secure and encrypted.",
      },
      {
        question: "When do I pay for a ride?",
        answer:
          "Payment is automatically processed after the ride is completed. You'll receive a receipt via email and SMS with the breakdown of charges.",
      },
      {
        question: "How do drivers receive payment?",
        answer:
          "Drivers receive payment directly to their registered bank account within 24-48 hours after completing a ride. We provide detailed earning reports and tax documents.",
      },
      {
        question: "What if there's a payment dispute?",
        answer:
          "Contact our support team immediately with your ride details. We'll investigate and resolve payment disputes within 2-3 business days, ensuring fair resolution for both parties.",
      },
    ],
    safety: [
      {
        question: "How do you ensure driver safety verification?",
        answer:
          "Every driver goes through a comprehensive background check, driving license verification, and vehicle inspection. We also continuously monitor driver ratings and feedback.",
      },
      {
        question: "What safety features are available during rides?",
        answer:
          "We provide real-time GPS tracking, emergency contact sharing, in-app SOS button, and 24/7 support. All rides are monitored and recorded for safety purposes.",
      },
      {
        question: "How do I report a safety concern?",
        answer:
          "Use the 'Report Issue' feature in the app immediately, or contact our emergency support line. We take all safety reports seriously and investigate promptly.",
      },
      {
        question: "Are helmets provided?",
        answer:
          "Yes, all verified drivers are required to provide ISI-certified helmets for passengers. However, we recommend bringing your own helmet for comfort and hygiene.",
      },
    ],
    account: [
      {
        question: "How do I update my profile information?",
        answer:
          "Go to 'Profile' in the app, tap 'Edit Profile', and update your information. Some changes like phone number may require verification.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "Click 'Forgot Password' on the login screen, enter your registered email or phone number, and follow the instructions sent to reset your password.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Contact our support team to request account deletion. We'll process your request within 5-7 business days after resolving any pending rides or payments.",
      },
      {
        question: "Why is my account suspended?",
        answer:
          "Accounts may be suspended for safety violations, fraudulent activity, or terms of service violations. Contact support for specific details and resolution steps.",
      },
    ],
  };

  const filteredFAQs =
    faqData[activeCategory]?.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-indigo-100 relative">
      {/* FAQ Section */}
       {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-300/10 to-pink-300/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600 mb-12">Find quick answers to common questions</p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {supportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setExpandedFAQ(null);
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-white/50"
                }`}
              >
                <div className="flex items-center gap-2">{category.icon}{category.name}</div>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            {filteredFAQs.length === 0 ? (
              <p className="text-center text-slate-500">No FAQs match your search.</p>
            ) : (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white/80 p-6 rounded-xl shadow-md border border-white/50">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full flex justify-between items-center text-lg font-semibold text-slate-800"
                  >
                    {faq.question}
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-indigo-600" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideShareFaq;
