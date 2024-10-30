'use client'
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pt-36 text-justify max-w-[90%] mx-auto leading-tight tracking-tight sm:tracking-normal">
      <h1 className="text-2xl sm:text-3xl quicksand-bold mb-4 sm:mb-6">Privacy Policy</h1>
      <p className="mb-3 sm:mb-4 quicksand-light">
        This Privacy Policy explains how Infrasity collects, uses, maintains, and discloses information collected from users of our content marketing platform. This policy applies to all services offered by Infrasity.
      </p>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">Personal Identification Information</h2>
      <p className="mb-3 sm:mb-4 quicksand-light">
        Infrasity may collect personal identification information in various ways, such as when users subscribe to newsletters, request information, or use services on our platform. Users may visit the site anonymously, and we only collect personal information when it is voluntarily submitted. However, refusing to provide certain information may limit access to some of our services.
      </p>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">How We Use Collected Information</h2>
      <p className="mb-3 sm:mb-4">
        Infrasity may use personal information for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-3 sm:mb-4 pl-5 sm:pl-6">
        <li><strong>To enhance customer service:</strong> Information helps us respond more effectively to customer service requests and support needs.</li>
        <li><strong>To personalize user experience:</strong> We analyze aggregated information to understand how users interact with our platform, helping us improve service delivery.</li>
        <li><strong>To send periodic communications:</strong> We may use email addresses to send updates about our services, respond to inquiries, or provide information based on user preferences.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">Sharing Your Personal Information</h2>
      <p className="mb-3 sm:mb-4 quicksand-light">
        Infrasity does not sell, trade, or rent user personal identification information to others. Information may be shared with trusted partners who assist us in operating our business, provided they agree to keep the information confidential.
      </p>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">Third-Party Websites</h2>
      <p className="mb-3 sm:mb-4">
        Our website may contain links to third-party sites. We are not responsible for the content or practices of these sites, which may have their own privacy policies. Browsing and interaction on these sites are subject to the site's terms and policies.
      </p>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-3 sm:mb-4 quicksand-light">
        Infrasity reserves the right to update this Privacy Policy at any time. We encourage users to check this page frequently for any updates. By continuing to use our services, you acknowledge and agree to review the policy periodically and become aware of modifications.
      </p>

      <h2 className="text-xl sm:text-2xl quicksand-semibold mb-3 sm:mb-4">Your Acceptance of These Terms</h2>
      <p className="mb-3 sm:mb-4 quicksand-light">
        By using Infrasity's services, you signify your acceptance of this Privacy Policy. If you do not agree, please refrain from using our platform. Your continued use following policy changes will be considered acceptance of those changes.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
