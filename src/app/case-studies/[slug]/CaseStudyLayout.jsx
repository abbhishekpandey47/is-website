"use client";

import React from "react";

/**
 * CaseStudyLayout - Global layout component for all case study pages
 * 
 * Enforces consistent 3-column grid (TOC | Article | Right Rail) across all case studies
 * with proper sticky behavior, full-bleed right rail on wide screens, and graceful stacking.
 */
export default function CaseStudyLayout({
  children, // Article content
  toc, // Table of Contents component
  sidebar, // Right rail component (Company Highlights + CTA)
  className = "",
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Content wrapper - contains TOC + Article + Full-bleed Sidebar */
        .case-study-content-wrapper {
          width: 100%;
          max-width: 100vw;
          overflow: visible !important;
          position: relative;
        }
        
        /* Centered container for TOC + Article */
        .case-study-grid-container {
          max-width: clamp(1320px, 90vw, 1440px);
          margin: 0 auto;
          padding-inline: clamp(24px, 2vw, 32px);
          overflow: visible !important;
        }
        
        @media (min-width: 1280px) and (max-width: 1439px) {
          .case-study-grid-container {
            max-width: calc(100vw - 48px);
            padding-inline: 24px;
          }
        }
        
        /* At ≥1440px, keep container centered - sidebar breaks out */
        @media (min-width: 1440px) {
          .case-study-grid-container {
            max-width: clamp(1320px, 90vw, 1440px);
            padding-inline: clamp(24px, 2vw, 32px);
          }
        }
        
        .case-study-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          overflow: visible !important;
        }
        
        @media (min-width: 1280px) {
          .case-study-main-grid {
            grid-template-columns: clamp(220px, 16vw, 280px) minmax(0, 1fr);
            gap: 32px;
          }
          
          .toc-column {
            position: sticky;
            top: 96px;
            align-self: start;
            z-index: 10;
            max-height: calc(100vh - 112px);
            overflow-y: auto;
            overflow-x: visible !important;
          }
        }
        
        /* Full-bleed sidebar - breaks out of container */
        .sidebar-wrapper {
          display: none;
        }
        
        @media (min-width: 1280px) {
          .sidebar-wrapper {
            display: block;
            position: absolute;
            top: 0;
            right: 24px;
            width: 360px;
            z-index: 10;
            pointer-events: none;
            height: 100%;
          }
          
          .sidebar-inner {
            position: sticky;
            top: 96px;
            pointer-events: auto;

            width: 100%;
          }
        }
        
        @media (min-width: 1440px) {
          .sidebar-wrapper {
            right: clamp(24px, 2vw, 32px);
          }
          
          /* Add padding to content wrapper to prevent overlap */
          .case-study-content-wrapper {
            padding-right: calc(360px + 32px + clamp(24px, 2vw, 32px));
          }
        }
        
        @media (min-width: 1600px) {
          .case-study-main-grid {
            gap: 40px;
          }
        }
        
        .article-column {
          min-width: 0;
          width: 100%;
          z-index: 1;
          padding-bottom: 72px;
          overflow: visible !important;
        }
        
        .article-column article h2,
        .article-column article h3,
        .article-column article h4 {
          scroll-margin-top: 120px;
        }
        
        .article-column img,
        .article-column figure,
        .article-column canvas {
          max-width: 100%;
          height: auto;
        }
        
        /* Ensure all parent wrappers allow overflow */
        .case-study-grid-container *,
        .case-study-content-wrapper * {
          box-sizing: border-box;
        }
      `}} />
      
      <div className={`case-study-content-wrapper ${className}`} style={{ overflow: 'visible', width: '100%', position: 'relative' }}>
        <div className="case-study-grid-container" style={{ overflow: 'visible', width: '100%' }}>
          <div className="case-study-main-grid" data-test="layout-grid" style={{ overflow: 'visible', width: '100%' }}>
            {/* TOC Column - Left */}
            {toc && (
              <div className="toc-column hidden xl:block" data-test="toc" style={{ overflow: 'visible', width: '100%' }}>
                <div style={{ width: '100%', minWidth: '220px', maxWidth: '280px' }}>
                  {toc}
                </div>
              </div>
            )}

            {/* Article Column - Center */}
            <div className="article-column" data-test="article" style={{ overflow: 'visible', width: '100%', minWidth: 0 }}>
              {children}
            </div>
          </div>
        </div>

        {/* Full-bleed Sidebar - Right Rail (≥1280px) */}
        {sidebar && (
          <div className="sidebar-wrapper" data-test="sidebar">
            <div className="sidebar-inner">
              {sidebar}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

