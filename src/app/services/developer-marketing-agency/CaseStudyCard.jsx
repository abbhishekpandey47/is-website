"use client";

import Link from "next/link";
import Image from "next/image";

export default function CaseStudyCard({ study, isAdsVariant = false }) {
  const CardWrapper = isAdsVariant ? "div" : Link;
  const wrapperProps = isAdsVariant 
    ? {} 
    : { href: `/case-studies/${study.slug}` };

  return (
    <div
      className="respond-case-study-card flex-wrap md:flex-nowrap"
      style={{
        background: '#0d0a1a',
        borderRadius: 24,
        position: 'relative',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        minHeight: 400,
      }}
    >
      {/* Left Section */}
      <div
        className="flex flex-col justify-between align-start respond-case-left"
        style={{
          flex: '1 1 50%',
          minWidth: 320,
          maxWidth: '50%',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Logo and Company Name */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #d6d6d6',
              borderRadius: 12,
              width: 48,
              height: 48,
              boxShadow: '20px 20px 40px 0px rgba(0,0,0,0.12),10px 10px 25px 0px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Figma gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 12,
                background: 'linear-gradient(0deg, rgb(225, 225, 225) 0%, rgba(225, 225, 225, 0.6) 30%, rgba(225, 225, 225, 0.2) 50%, rgba(225, 225, 225, 0) 70%)',
                zIndex: 1,
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Image
                src={study.logo}
                alt={study.logoAlt}
                width={27}
                height={27}
              />
            </div>
          </div>
          <div style={{ color: '#f2f2f2', fontWeight: 600, fontSize: 30, fontFamily: 'Inter, sans-serif' }}>
            {study.company}
          </div>
        </div>

        {/* Stars and Testimonial Section */}
        <div className="flex flex-col justify-start align-start">
          {/* 5 Star Rating */}
          <div style={{ height: 24, width: 85, marginBottom: 8, marginTop: 8 }}>
            <img src="/reddit/star.svg" alt="5 stars" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Testimonial Quote */}
          <div style={{ color: '#ebebeb', fontWeight: 500, fontSize: 16.7, fontFamily: 'Inter, sans-serif', marginBottom: 24, maxWidth: 400 }}>
            "{study.testimonial}"
          </div>

          {/* Author Profile */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ position: 'relative', width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', marginRight: 12, objectFit: 'cover', background: '#222' }}>
              <img src={study.testimonialImage} alt={study.testimonialAuthor} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ color: '#f2f2f2', fontWeight: 600, fontSize: 14.6, fontFamily: 'Inter, sans-serif' }}>
                {study.testimonialAuthor} <span style={{ color: '#999', fontWeight: 400 }}>| {study.company}</span>
              </div>
              <div style={{ color: '#999', fontWeight: 400, fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
                {study.testimonialRole}
              </div>
              {study.companyLogo2 && (
                <div style={{ height: 20, width: 140, marginTop: 6 }}>
                  <img src={study.companyLogo2} alt={`${study.company} logo`} style={{ width: '100%', height: '100%' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <CardWrapper
        {...wrapperProps}
        className="respond-case-right"
        style={{
          flex: '1 1 50%',
          minWidth: 320,
          maxWidth: '50%',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxSizing: 'border-box',
          textDecoration: 'none',
          color: 'inherit',
          cursor: isAdsVariant ? 'default' : 'pointer',
        }}
      >
        <style>{`
          @media (max-width: 900px) {
            .respond-case-study-card {
              flex-direction: column !important;
            }
            .respond-case-left, .respond-case-right {
              max-width: 100% !important;
            }
          }
        `}</style>

        {/* Image */}
        <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden', width: '100%', minHeight: 200, maxHeight: 340, background: '#222' }}>
          <img src={`/PostImages/${study.slug}/0.${study.imageExt}`} alt="Case study visual" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
        </div>

        {/* Details Box */}
        <div style={{ background: '#0e0b1b', border: '1px solid rgba(119,119,119,0.5)', borderRadius: 22.95, padding: 24, marginTop: -50, minHeight: 150, boxSizing: 'border-box' }}>
          <div style={{ color: '#f2f2f2', fontWeight: 600, fontSize: 19.5, fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
            {study.caseStudyTitle}
          </div>
          <div style={{ color: '#ebebeb', fontWeight: 500, fontSize: 14.6, fontFamily: 'Inter, sans-serif' }}>
            {study.caseStudyDesc}
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}
