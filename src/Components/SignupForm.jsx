import { Check, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "react-toastify";
import { signinWithGoogle, signUpWithEmail } from "../service/firebase-auth-service";


const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      const res = await signinWithGoogle();
      if (res === true) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/crm");
        }, 2000); // Adjust the delay as needed
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/crm");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof FireBaseErrors.EMAIL_EXISTS) {
        toast.error("Email already exists. Please sign in with email.");
      } else if (error instanceof FireBaseErrors.CREDENTIAL_ALREADY_IN_USE) {
        toast.error("Credential already in use. Please sign in with email.");
      } else if (error instanceof FireBaseErrors.INVALID_PASSWORD) {
        toast.error("Invalid password. Please try again.");
      } else if (error instanceof FireBaseErrors.NO_AUTH_EVENT) {
        toast.error("Auth event not found. Please try again.");
      } else if (error instanceof FireBaseErrors.OPERATION_NOT_ALLOWED) {
        toast.error("Operation not allowed. Please try again.");
      } else if (error instanceof FireBaseErrors.OPERATION_NOT_SUPPORTED) {
        toast.error(
          "Operation not supported in this environment. Please try again."
        );
      } else if (error instanceof FireBaseErrors.USER_DELETED) {
        toast.error("User not found. Please try again.");
      } else if (error instanceof FireBaseErrors.REJECTED_CREDENTIAL) {
        toast.error("Rejected credential. Please try again.");
      } else if (error instanceof FireBaseErrors.POPUP_CLOSED_BY_USER) {
        return;
      } else if (error instanceof FireBaseErrors.EXPIRED_POPUP_REQUEST) {
        return;
      } else if (error instanceof FireBaseErrors.POPUP_BLOCKED) {
        toast.error("Popup blocked by browser. Please try again.");
      } else {
        toast.error("Unknown error. Please try again.");
      }
      setLoading(false);
      setShowSuccess(false);
    } finally {
      setLoading(false);
    }
  };


  const handleEmailSignup = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await signUpWithEmail(email, password, firstName, lastName);
      if (res === true) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/crm");
        }, 2000); // Adjust the delay as needed
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/crm");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof FireBaseErrors.EMAIL_EXISTS) {
        toast.error("Email already exists. Please sign in with email.");
      } else if (error instanceof FireBaseErrors.CREDENTIAL_ALREADY_IN_USE) {
        toast.error("Credential already in use. Please sign in with email.");
      } else if (error instanceof FireBaseErrors.INVALID_PASSWORD) {
        toast.error("Invalid password. Please try again.");
      } else if (error instanceof FireBaseErrors.NO_AUTH_EVENT) {
        toast.error("Auth event not found. Please try again.");
      } else if (error instanceof FireBaseErrors.OPERATION_NOT_ALLOWED) {
        toast.error("Operation not allowed. Please try again.");
      } else if (error instanceof FireBaseErrors.OPERATION_NOT_SUPPORTED) {
        toast.error(
          "Operation not supported in this environment. Please try again."
        );
      } else if (error instanceof FireBaseErrors.USER_DELETED) {
        toast.error("User not found. Please try again.");
      } else if (error instanceof FireBaseErrors.REJECTED_CREDENTIAL) {
        toast.error("Rejected credential. Please try again.");
      } else if (error instanceof FireBaseErrors.POPUP_CLOSED_BY_USER) {
        return;
      } else if (error instanceof FireBaseErrors.EXPIRED_POPUP_REQUEST) {
        return;
      } else if (error instanceof FireBaseErrors.POPUP_BLOCKED) {
        toast.error("Popup blocked by browser. Please try again.");
      } else {
        toast.error("Unknown error. Please try again.");
      }
      setLoading(false);
      setShowSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-white text-sm">Signing up...</p>
          </div>
        </div>
      )}

      {/* Left Column - Signup Form */}
      <div className="flex-1 border border-white/15 mx-10 mr-28 rounded-xl flex items-center justify-center p-4 my-14">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image src="/CommLogo/infrasity-small-logo.svg" alt="logo" width={28} height={28} />
            </div>
            <h1 className="text-xl font-semibold text-white mb-1">
              Create your Infrasity account
            </h1>
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleSignin}
            className="w-full mb-4 bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border border-gray-300"
            disabled={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gray-950 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-3">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1 opacity-0">Last</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="e.g name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {password.length > 0 && password.length < 6 && (
              <p className="text-red-400 text-xs">Password must be at least 6 characters</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={password.length < 6 || loading}
              className="w-full font-medium py-2.5 px-4 rounded-lg transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: (password.length >= 6 && firstName && lastName && email) ? 'linear-gradient(135deg, #1966ff, #8c1eff)' : '#374151',
                color: 'white'
              }}
            >
              Create your account
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-4 mb-6">
            Already have an account?{" "}
            <Link
            href="/auth/signin"
            className="text-blue-400 hover:text-blue-300 font-medium">
              Log In
            </Link>
          </p>

          <p className="text-center text-xs text-gray-600">
            By logging in, you agree to our{" "}
            <Link href="/terms-of-services" className="text-gray-400 hover:text-gray-300 underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 underline">Privacy Policy</Link>
          </p>

          <p className="text-center text-xs text-gray-600 mt-4">
            © Infrasity Pvt. Ltd. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Column - Hero Content */}
<div className="flex-1 bg-gray-900 relative flex items-center justify-center p-8 border-l border-gray-800 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#1966ff]/30 via-[#d129ff]/20 to-[#8c1eff]/30 blur-2xl opacity-60 animate-pulse" />

        <div className="max-w-4xl text-left">
          <div className="mb-8">
            <h2 className="text-3xl font-[quicksand] font-bold text-white mb-4">
              Composable auth for humans + AI without the heavy lift
            </h2>
          </div>

          <div className="space-y-3 text-left mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 stroke-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">Drop in modular components for AI agents, APIs, and users</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 stroke-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">Use built-in org, user and session management, or bring your own stack</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 stroke-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">Go live in days with no big-bang migration or complex rewrites</span>
            </div>
          </div>

          <div className="text-left mb-8">
            <p className="text-sm font-medium text-white mb-4">Start free today. No feature gating</p>
            <p className="text-xs text-gray-500 mb-4">Trusted by</p>
            <div className="grid grid-cols-4 gap-0 opacity-60">
             <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/aviator.png`}
                                            alt="Company Logo"
                                        />
                <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/mocha.png`}
                                            alt="Company Logo"
                                        />
                                          <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/cedana.png`}
                                            alt="Company Logo"
                                        />
                                          <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`object-contain opacity-90 -mt-8`}
                                            src={`/trustedby-bw/bw/dhiwise.png`}
                                            alt="Company Logo"
                                        />
                                          <Image
                                            loading="lazy"
                                            width={160}
                                            height={80}
                                            className={`object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/tracetest.png`}
                                            alt="Company Logo"
                                        />
                                          <Image
                                            loading="lazy"
                                            width={60}
                                            height={80}
                                            className={`ml-6 object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/oso.png`}
                                            alt="Company Logo"
                                        />
                                         <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/firefly.png`}
                                            alt="Company Logo"
                                        />
                                         <Image
                                            loading="lazy"
                                            width={100}
                                            height={80}
                                            className={`ml-4 object-contain opacity-90`}
                                            src={`/trustedby-bw/bw/kapstan.png`}
                                            alt="Company Logo"
                                        />

            </div>
          </div>

          <div className="text-left">
            <p className="text-xs text-gray-500">
              Want to learn more?{" "}
              <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 underline">
                Schedule a demo
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
