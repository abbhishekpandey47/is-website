"use client";

import React from "react";
import Link from "next/link";
import CompanyHighlights from "../../../Components/CompanyHighlights";

/**
 * CaseStudySidebar - Reusable right rail component for case studies
 * 
 * Displays Company Highlights (from frontmatter) and "Book a demo" CTA
 * Always renders both cards, even if company highlights data is missing
 */
export default function CaseStudySidebar({
  companyHighlights,
  title, // Post title for fallback company name extraction
}) {
  // Helper function to extract company name from title for fallback
  const extractCompanyName = (title) => {
    if (!title) return "Company";
    const match = title.match(/([^:]+?)\s+(?:and|&|with)\s+Infrasity/i) || 
                  title.match(/([^:]+?)\s+Case\s+Study/i) ||
                  title.match(/^([^:]+?):/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return title.split(':')[0].split('and')[0].trim().substring(0, 50);
  };

  return (
    <>
      {/* Company Highlights - Always show */}
      <CompanyHighlights 
        highlights={companyHighlights} 
        fallbackTitle={companyHighlights?.company || extractCompanyName(title)}
      />
      
      {/* Book a Demo CTA Card - Always visible */}
      <div className="demo-cta-card" data-test="sidebar-cta" style={{ marginTop: '24px' }}>
        <h3 className="demo-cta-heading" data-test="sidebar-title">
          Ready to achieve similar results?
        </h3>
        <p className="demo-cta-description">
          Let's discuss how we can help you scale through technical content and developer marketing.
        </p>
        <Link href="/contact" className="demo-cta-button">
          Book a demo
        </Link>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .demo-cta-card {
          margin-top: 24px;
          background: #0E0E17;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02);
          width: 100%;
          background-image: linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(14,14,23,1) 2%);
        }
        
        .demo-cta-heading {
          font-size: clamp(1.125rem, 1.2vw + 0.875rem, 1.375rem);
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.3;
          margin: 0 0 12px 0;
        }
        
        .demo-cta-description {
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.5;
          margin: 0 0 20px 0;
        }
        
        .demo-cta-button {
          display: block;
          width: 100%;
          background: #7C3AED;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 24px;
          border: 1px solid #7C3AED;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
        }
        
        .demo-cta-button:hover {
          background: rgba(124, 58, 237, 0.9);
          border-color: #8B5CF6;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(124, 58, 237, 0.2);
        }
        
        .demo-cta-button:active {
          transform: translateY(0);
        }
        
        .demo-cta-button:focus {
          outline: none;
          ring: 2px;
          ring-color: rgba(124, 58, 237, 0.5);
        }
        
        /* Ensure both cards have identical styling */
        .sidebar-inner .demo-cta-card,
        .sidebar-inner aside,
        .demo-cta-card {
          background: #0E0E17 !important;
          background-image: linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(14,14,23,1) 2%) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
          border-radius: 16px !important;
        }
      `}} />
    </>
  );
}

