"use client";

import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";

function ErrorDialog({ error, resetError }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    resetError();
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
  // Sentry ErrorBoundary disabled for performance optimization
  return (
    <>
      {children}
    </>
  );
}
