"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validations/contact.js';
import { message } from 'antd';

/**
 * ContactForm component with Zod validation and TypeScript-like prop types
 * @param {Object} props - Component props
 * @param {string} [props.title="Get in Touch"] - Form title
 * @param {string} [props.subtitle="Send us a message and we'll respond as soon as possible"] - Form subtitle
 * @param {string} [props.submitText="Send Message"] - Submit button text
 * @param {Function} [props.onSuccess] - Callback when form is successfully submitted
 * @param {Function} [props.onError] - Callback when form submission fails
 * @param {string} [props.className=""] - Additional CSS classes
 */
const ContactForm = ({
  title = "Get in Touch",
  subtitle = "Send us a message and we'll respond as soon as possible",
  submitText = "Send Message",
  onSuccess,
  onError,
  className = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  // Watch form values for real-time validation feedback
  const watchedValues = watch();

  /**
   * Handles form submission with proper error handling and security considerations
   * @param {Object} data - Form data validated by Zod schema
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Security: Sanitize data before sending
      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim()
      };

      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Success handling
      setSubmitStatus('success');
      message.success(result.message || 'Message sent successfully!');
      
      // Reset form
      reset();
      
      // Call success callback if provided
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      setSubmitStatus('error');
      
      // Show appropriate error message
      if (error.name === 'AbortError') {
        message.error('Request timed out. Please try again.');
      } else if (error.message.includes('Validation failed')) {
        message.error('Please check your input and try again.');
      } else {
        message.error('Failed to send message. Please try again later.');
      }

      // Call error callback if provided
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Renders input field with proper styling and error handling
   * @param {string} name - Field name
   * @param {string} type - Input type
   * @param {string} placeholder - Placeholder text
   * @param {boolean} required - Whether field is required
   * @param {boolean} isTextarea - Whether to render as textarea
   */
  const renderInput = (name, type = 'text', placeholder, required = false, isTextarea = false) => {
    const hasError = errors[name];
    const isFocused = document.activeElement?.name === name;
    
    const baseClasses = `
      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
      bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
      ${hasError 
        ? 'border-red-500 focus:border-red-500' 
        : 'border-gray-600 focus:border-blue-500 hover:border-gray-500'
      }
      ${isFocused ? 'shadow-lg shadow-blue-500/10' : ''}
    `;

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
      <div className="space-y-1">
        <InputComponent
          {...register(name)}
          type={type}
          placeholder={placeholder}
          required={required}
          rows={isTextarea ? 4 : undefined}
          className={baseClasses}
          disabled={isSubmitting}
        />
        {hasError && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-300 text-lg">
          {subtitle}
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            {renderInput('name', 'text', 'Enter your full name', true)}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            {renderInput('email', 'email', 'Enter your email address', true)}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Message <span className="text-red-400">*</span>
            </label>
            {renderInput('message', 'text', 'Tell us about your project or question...', true, true)}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`
                w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                ${isSubmitting || !isValid
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }
                disabled:transform-none disabled:shadow-none
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                submitText
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2 text-green-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Failed to send message. Please try again.</span>
              </div>
            </div>
          )}
        </form>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="text-center text-gray-400 text-sm">
            <p>We typically respond within 24 hours</p>
            <p className="mt-1">For urgent matters, please call us directly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

