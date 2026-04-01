import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">About MERNShop</h1>
      <p className="text-gray-700 leading-relaxed">
        Welcome to MERNShop, your premier destination for high-quality electronics and lifestyle products. 
        Founded in 2024, our mission is to provide a seamless shopping experience powered by the latest web technologies.
      </p>
      <h2 className="text-2xl font-semibold">Our Values</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Customer First:</strong> We prioritize your satisfaction above all else.</li>
        <li><strong>Innovation:</strong> Constantly evolving our platform for a better user experience.</li>
        <li><strong>Quality:</strong> Partnering with top brands like Apple and Sony to deliver excellence.</li>
      </ul>
      <p className="text-gray-700">
        Our team consists of passionate developers and retail experts working together to bridge the gap between 
        premium technology and consumer accessibility.
      </p>
    </div>
  );
};

export default AboutPage;
