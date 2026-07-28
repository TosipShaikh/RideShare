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

function SupportPage() {

  return (
    <div className="min-h-screen bg-indigo-100 relative">
      {/* Header */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 backdrop-blur-sm mb-6">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-semibold text-indigo-700">We're Here to Help</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Support<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Center</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions, get help with your rides, and connect with our support team.
            We're committed to making your ridesharing experience smooth and enjoyable.
          </p>

          
        </div>
      </div>

      {/* Contact Options */}
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6 max-w-4xl">
          {/* Call */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Call Support</h3>
            <p className="text-slate-600 mb-4">Speak directly with our support team</p>
            <a href="tel:+911234567890" className="text-indigo-600 font-semibold">
              +91 12345 67890
            </a>
            <p className="text-sm text-slate-500 mt-2">Available 24/7</p>
          </div>

          {/* Chat */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Live Chat</h3>
            <p className="text-slate-600 mb-4">Get instant help through chat</p>
            <button className="text-indigo-600 font-semibold">Start Chat</button>
            <p className="text-sm text-slate-500 mt-2">Response in 2-3 minutes</p>
          </div>

          {/* Email */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Email Support</h3>
            <p className="text-slate-600 mb-4">Send us your detailed queries</p>
            <a href="mailto:support@rideshare.com" className="text-indigo-600 font-semibold">
              support@rideshare.com
            </a>
            <p className="text-sm text-slate-500 mt-2">Response in 2-4 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
