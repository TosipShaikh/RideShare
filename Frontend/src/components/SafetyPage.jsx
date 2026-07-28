import React, { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, Phone, MapPin, Users, FileText, Camera, Star, Clock, Bike, Eye, Lock } from "lucide-react";

function SafetyPage() {
  const [activeTab, setActiveTab] = useState("riders");

  const safetyFeatures = [
    {
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: "Verified Driver Licenses",
      description: "Every driver undergoes thorough license verification before being approved to offer rides."
    },
    {
      icon: <Camera className="w-8 h-8 text-indigo-600" />,
      title: "Photo Verification",
      description: "Driver and rider photos are verified to ensure you know who you're riding with."
    },
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      title: "Real-Time Tracking",
      description: "Share your live location with trusted contacts during your ride."
    },
    {
      icon: <Phone className="w-8 h-8 text-indigo-600" />,
      title: "Emergency Support",
      description: "24/7 emergency support with direct hotline access during rides."
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-600" />,
      title: "Rating System",
      description: "Comprehensive rating system helps maintain quality and safety standards."
    },
    {
      icon: <Lock className="w-8 h-8 text-indigo-600" />,
      title: "Secure Payments",
      description: "Protected payment system with no cash handling required."
    }
  ];

  const riderSafetyTips = [
    {
      title: "Before the Ride",
      tips: [
        "Verify the driver's photo and bike details match the app",
        "Check driver's rating and read recent reviews",
        "Share your ride details with a trusted contact",
        "Ensure you have a properly fitting helmet"
      ]
    },
    {
      title: "During the Ride",
      tips: [
        "Always wear the provided helmet or bring your own",
        "Hold on securely to the designated handles",
        "Avoid using phone or distracting the driver",
        "Follow traffic rules and maintain proper posture"
      ]
    },
    {
      title: "After the Ride",
      tips: [
        "Rate your experience honestly",
        "Report any safety concerns immediately",
        "Check you have all your belongings",
        "Provide feedback to help improve the service"
      ]
    }
  ];

  const driverSafetyTips = [
    {
      title: "Vehicle Requirements",
      tips: [
        "Maintain valid driving license and registration",
        "Regular bike maintenance and safety checks",
        "Provide clean, ISI-certified helmets for riders",
        "Keep first aid kit and emergency tools"
      ]
    },
    {
      title: "Before Pickup",
      tips: [
        "Verify rider's identity before starting",
        "Check weather conditions and route safety",
        "Ensure bike is in good working condition",
        "Confirm pickup location is safe and accessible"
      ]
    },
    {
      title: "During the Ride",
      tips: [
        "Follow all traffic rules and speed limits",
        "Take regular breaks on long rides",
        "Maintain safe following distance",
        "Be courteous and professional with riders"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 backdrop-blur-sm mb-6">
              <Shield className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-semibold text-indigo-700">Your Safety is Our Priority</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Ride Safe,
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ride Secure
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience the freedom of motorbike ridesharing with comprehensive safety measures, 
              verified drivers, and 24/7 support. Your security is built into every ride.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Features Grid */}
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Built-in Safety Features</h2>
            <p className="text-xl text-slate-600">Multiple layers of protection for every ride</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">{feature.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Guidelines Tabs */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Safety Guidelines</h2>
            <p className="text-xl text-slate-600">Essential tips for riders and drivers</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("riders")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "riders"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    For Riders
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("drivers")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "drivers"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bike className="w-5 h-5" />
                    For Drivers
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "riders" && (
              <div className="space-y-8">
                {riderSafetyTips.map((section, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {section.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "drivers" && (
              <div className="space-y-8">
                {driverSafetyTips.map((section, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {section.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl p-12 border border-red-200/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-100 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <span className="text-lg font-semibold text-red-700">Emergency Support</span>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Need Help? We're Here 24/7</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                In case of emergency or safety concerns, contact our support team immediately. 
                Your safety is our top priority.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+911234567890" className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center gap-3 justify-center shadow-lg">
                  <Phone className="w-5 h-5" />
                  Emergency: +91 12345 67890
                </a>
                <button className="px-8 py-4 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-3 justify-center shadow-lg border border-slate-200">
                  <Eye className="w-5 h-5" />
                  Report Safety Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyPage;