"use client";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";

const AuthErrorPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold">Oops... Something went wrong</h1>

      <Button onClick={() => router.push("/")} variant="link">
        Go home
      </Button>
    </div>
  );
};

export default AuthErrorPage;
