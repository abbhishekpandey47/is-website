"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signinWithGoogle, signinWithEmail } from "@/service/firebase-auth-service";
import { FireBaseErrors } from "@/errors/firebase-errors";
import Image from "next/image";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

const SuccessMessage = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 z-50">
      <Oval color="#6b5be5" secondaryColor="#8380eb" height={80} width={80} />
      <p className="mt-4 text-lg font-medium text-gray-200">Redirecting...</p>
    </div>
  );
};

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      const res = await signinWithGoogle();
      setShowSuccess(true);
      setTimeout(() => {
        router.push(res === true ? "/crm" : "/crm");
      }, 2000);
    } catch (error) {
      if (error instanceof FireBaseErrors.INVALID_PASSWORD) {
        toast.error("Invalid password. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signinWithEmail(email, password);
      setShowSuccess(true);
      setTimeout(() => {
        router.push(res === true ? "/crm" : "/crm");
      }, 2000);
    } catch (error) {
      if (error instanceof FireBaseErrors.INVALID_PASSWORD) {
        toast.error("Invalid password. Please try again.");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center w-80 min-[480px]:w-[28rem] h-[90%] text-sm px-8 rounded-2xl relative shadow-lg border border-gray-800 overflow-y-auto">
      {showSuccess && <SuccessMessage />}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <Oval color="#6b5be5" secondaryColor="#8380eb" height={80} width={80} />
          <p className="mt-4 text-lg font-medium text-gray-200">Signing in...</p>
        </div>
      )}

      {!loading && (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          {/* Logo */}
          <Image
            src="/icons/infrasity-small-logo.svg"
            alt="logo"
            width={28}
            height={28}
            priority
          />

          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl min-[480px]:text-3xl font-semibold text-white">
              Log in to <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Infrasity</span>
            </h1>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignin}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-gray-800 text-gray-200 font-medium border border-gray-700 hover:bg-gray-700 transition"
          >
            <Image src="/icons/google-icon.svg" alt="google" width={16} height={16} priority />
            Continue with Google
          </button>

          {/* Divider */}
          <p className="text-center text-gray-400 text-sm w-full border-b border-gray-700 leading-[0.1em] my-2">
            <span className="bg-gray-900 px-2">Or</span>
          </p>

          {/* Form */}
          <form onSubmit={handleEmailSignin} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-gray-200 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="e.g. name@company.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-gray-200 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 cursor-pointer rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Log In
            </button>
          </form>

          {/* Footer links */}
          <div className="text-gray-400 text-sm">
            New to Infrasity?{" "}
            <Link href="/auth/signup" className="text-indigo-400 hover:underline">
              Create account
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-[10px] absolute left-1/2 -translate-x-1/2 bottom-2 text-center">
            &copy; Infrasity Pvt. Ltd. All Rights Reserved
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
