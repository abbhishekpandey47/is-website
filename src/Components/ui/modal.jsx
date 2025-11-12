"use client";

import { ErrorBoundary } from "@sentry/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

function ErrorDialog({ error, resetError }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    resetError(); // Optional: Reset error boundary after closing
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Something went wrong</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{error?.message ?? "An unexpected error occurred."}</p>
        <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PlatformLayout({ children }) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorDialog error={error} resetError={resetError} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
