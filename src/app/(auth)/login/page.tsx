"use client";

import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn afterSignOutUrl={"/"} />
    </div>
  );
};

export default LoginPage;
