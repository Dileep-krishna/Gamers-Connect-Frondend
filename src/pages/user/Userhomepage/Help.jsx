import React from "react";

const Help = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 p-6">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Help & Support</h1>
          <p className="text-white text-lg">Find answers to common questions and get assistance</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {/* Search SVG Icon */}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <FAQItem 
              question="How do I change my password?" 
              answer="Go to Settings → Account → Change Password and follow the steps to update your password securely."
            />
            <FAQItem 
              question="How do I delete my account?" 
              answer="Contact our support team at support@gamersconnect.com. Your request will be processed within 24 hours."
            />
            <FAQItem 
              question="Why can't I upload images?" 
              answer="Ensure your file size is under 5MB and in PNG or JPG format. Also check your internet connection."
            />
            <FAQItem 
              question="How do I report inappropriate content?" 
              answer="Click the three dots on any post and select 'Report'. Our team will review it within 24 hours."
            />
            <FAQItem 
              question="Can I use GamersConnect on multiple devices?" 
              answer="Yes, you can access your account from multiple devices. For security, we recommend logging out from shared devices."
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Get Help</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SupportCard 
              icon="mail"
              title="Email Support"
              description="Send us an email and we'll get back to you within 24 hours"
              action="Contact Us"
            />
            <SupportCard 
              icon="bug"
              title="Report a Bug"
              description="Found an issue? Let us know so we can fix it"
              action="Report Bug"
            />
            <SupportCard 
              icon="info"
              title="About GamersConnect"
              description="Learn more about our platform and community"
              action="Learn More"
            />
            <SupportCard 
              icon="shield"
              title="Privacy & Safety"
              description="Understand how we protect your data and privacy"
              action="View Policy"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still need help?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Contact Support Team
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => (
  <div className="border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
    <details className="group">
      <summary className="p-4 cursor-pointer list-none flex justify-between items-center hover:bg-gray-50 rounded-lg">
        <span className="font-medium text-gray-900">{question}</span>
        {/* Chevron Down SVG Icon */}
        <svg 
          className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-4 pb-4">
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </details>
  </div>
);

const SupportCard = ({ icon, title, description, action }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'mail':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'bug':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 0a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6M8 12h8" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          {getIcon(icon)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
            <span>{action}</span>
            {/* Arrow Right SVG Icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;