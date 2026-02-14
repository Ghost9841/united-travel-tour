'use client';

import { SignIn, useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      redirect('/')
    }
  }, [isSignedIn, isLoaded])

  if (!isLoaded) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex justify-center">
            <Image src="/UNITED_Logo-01.svg" alt="Logo" width={256} height={64} />
          </div>
          <div className="h-[400px] animate-pulse bg-muted-foreground/10 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex justify-center gap-2 md:justify-start">
            <Image src="/UNITED_Logo-01.svg" alt="Logo" width={256} height={64} />
          </div>
        </a>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none bg-transparent",
              headerTitle: "text-2xl font-bold text-center",
              headerSubtitle: "text-center",
              socialButtonsBlockButton: "w-full",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footer: "hidden"
            }
          }}
          redirectUrl="/"
          signUpUrl="/signup"
        />
      </div>
    </div>
  )
}