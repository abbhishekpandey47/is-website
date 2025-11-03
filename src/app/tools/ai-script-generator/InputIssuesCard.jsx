"use client"
import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

const InputIssuesCard = ({ 
  problems = [], 
  suggestedFixes = [], 
  onFix, 
  onClose,
  className = "" 
}) => {
  if (problems.length === 0) return null;

  const handleFixClick = (fix) => {
    if (onFix) {
      onFix(fix);
    }
  };

  const getProblemIcon = (code) => {
    const iconMap = {
      'MISSING_PROMPT': '📝',
      'MISSING_TOOLS': '🔧',
      'MISSING_AUDIENCE': '👥',
      'MISSING_VIDEO_TYPE': '🎬',
      'MISSING_SECOND_TOOL': '⚖️',
      'INVALID_VIDEO_TYPE': '❌'
    };
    return iconMap[code] || '⚠️';
  };

  const getProblemColor = (code) => {
    const colorMap = {
      'MISSING_PROMPT': 'text-blue-400',
      'MISSING_TOOLS': 'text-orange-400',
      'MISSING_AUDIENCE': 'text-purple-400',
      'MISSING_VIDEO_TYPE': 'text-red-400',
      'MISSING_SECOND_TOOL': 'text-yellow-400',
      'INVALID_VIDEO_TYPE': 'text-red-400'
    };
    return colorMap[code] || 'text-gray-400';
  };

  return (
    <div className={`bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <h3 className="text-lg font-semibold text-red-100">
            Input Issues Found
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Problems List */}
        <div>
          <h4 className="text-sm font-medium text-red-200 mb-3">Issues to fix:</h4>
          <div className="space-y-2">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {getProblemIcon(problem.code)}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${getProblemColor(problem.code)}`}>
                    {problem.message}
                  </p>
                  {problem.field && (
                    <p className="text-xs text-gray-400 mt-1">
                      Field: {problem.field}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Fixes */}
        {suggestedFixes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-200 mb-3">Quick fixes:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedFixes.map((fix, index) => (
                <button
                  key={index}
                  onClick={() => handleFixClick(fix)}
                  className="group bg-green-900/30 hover:bg-green-800/40 border border-green-500/40 hover:border-green-400/60 rounded-lg px-4 py-2 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 group-hover:text-green-300" />
                    <div>
                      <p className="text-sm font-medium text-green-100 group-hover:text-white">
                        {fix.label}
                      </p>
                      <p className="text-xs text-green-300/80 group-hover:text-green-200/90">
                        {fix.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputIssuesCard;
