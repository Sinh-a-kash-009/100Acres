'use client'
import React from 'react'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()

   useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);
  return (
    <><div>Login</div>
   <SignInButton mode="modal">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Custom sign in button
      </button>
    </SignInButton>
      
      </>
  )
}

export default page