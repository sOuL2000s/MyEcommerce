import React from 'react';

const FAQPage = () => {
  const faqs = [
    { q: "What is your return policy?", a: "You can return any item within 30 days of purchase." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide." },
    { q: "How can I track my order?", a: "You can track your order in the 'My Orders' section of your profile." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Razorpay." }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Q: {faq.q}</h3>
            <p className="text-gray-700">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;