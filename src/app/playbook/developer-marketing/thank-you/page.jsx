'use client'

import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ThankYou = () => {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 md:p-12 shadow-[var(--shadow-soft)] border-border/50 relative overflow-hidden">
        {/* Decorative gradient circle */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          {/* Success icon with animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle2 
                className="w-20 h-20 text-success relative animate-in zoom-in-50 duration-500" 
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Thank You!
          </h1>

          <p className="text-center text-muted-foreground mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Download link has been sent to your email!
          </p>

          <p className="text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Please check your inbox or spam to download your resource.
          </p>

        </div>
      </Card>
    </div>
  );
};

export default ThankYou;
