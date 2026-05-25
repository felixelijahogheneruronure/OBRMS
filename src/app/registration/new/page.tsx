
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Registration is now handled inside the Admin Dashboard
    router.replace("/dashboard/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Redirecting to Registration Portal...</p>
      </div>
    </div>
  );
}
