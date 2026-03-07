
import React from 'react';
import { useSignUp } from '@clerk/clerk-react';

export default function SignupPage() {
    const { signUp, isLoaded } = useSignUp();

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;
        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/student',
            });
        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#FEFAF6] font-sans text-[#1a1a1a] p-4 box-border">
            {/* Container to center and constrain max width if needed, or full screen split */}
            <div className="flex w-full h-[calc(100vh-2rem)] bg-[#FEFAF6] rounded-3xl overflow-hidden shadow-sm border border-[#f0f0f0]">

                {/* Left Side - Orange Block */}
                <div className="hidden lg:flex w-[45%] bg-[#FF5E2B] relative flex-col p-8 rounded-3xl m-2">
                    <div className="text-white text-lg font-medium tracking-wide">Sign Up</div>
                    {/* The image shows just a big orange block. We can add subtle texture if "premium" is requested, but per image it's clean. */}
                </div>

                {/* Right Side - Content */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center items-start px-8 lg:px-24 xl:px-32 bg-[#FEFAF6]">
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-[0.95] text-black">
                        Sign Up to <br /> Rulyn
                    </h1>
                    <p className="text-xl text-muted-foreground font-semibold mb-12 tracking-tight">
                        Join the community of explorers.
                    </p>

                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full max-w-lg flex items-center justify-center gap-4 bg-white border border-gray-200 hover:bg-gray-50 text-black font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        {/* Google Icon SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.52 12.29C23.52 11.43 23.44 10.61 23.3 9.81H12V14.44H18.47C18.18 15.96 17.34 17.26 16.08 18.11V21.15H19.96C22.23 19.05 23.52 15.98 23.52 12.29Z" fill="#4285F4" />
                            <path d="M12.0001 24C15.2401 24 17.9601 22.92 19.9601 21.07L16.0801 18.03C15.0001 18.75 13.6201 19.19 12.0001 19.19C8.87006 19.19 6.22006 17.07 5.27006 14.19H1.26006V17.29C3.25006 21.24 7.30006 24 12.0001 24Z" fill="#34A853" />
                            <path d="M5.26993 14.19C5.02993 13.44 4.88993 12.63 4.88993 11.8C4.88993 10.97 5.02993 10.16 5.26993 9.40997V6.30997H1.25993C0.449926 7.91997 0.00992584 9.79997 0.00992584 11.8C0.00992584 13.8 0.449926 15.68 1.25993 17.29L5.26993 14.19Z" fill="#FBBC05" />
                            <path d="M12.0001 4.39C13.7601 4.39 15.3401 5.00003 16.5801 6.18003L19.9901 2.77C17.9501 0.880033 15.2401 -0.119967 12.0001 -0.119967C7.30006 -0.119967 3.25006 2.64003 1.26006 6.59003L5.27006 9.68003C6.22006 6.80003 8.87006 4.39 12.0001 4.39Z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="mt-16 text-xs text-gray-400 font-medium tracking-wide uppercase">
                        By connecting to Rulyn you agree to our <br className="hidden lg:block" />
                        <span className="text-black font-bold cursor-pointer hover:underline mx-1">Terms of use</span> and <span className="text-black font-bold cursor-pointer hover:underline mx-1">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
