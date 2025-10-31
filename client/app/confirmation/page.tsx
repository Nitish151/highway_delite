"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle, XCircle } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const referenceId = searchParams.get("ref");

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-96">
          {isSuccess ? (
            <>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <h1 className="text-3xl font-bold mb-3">Booking Confirmed</h1>
              {referenceId && (
                <p className="text-sm text-gray-600 mb-8">
                  Ref ID: <span className="font-semibold">{referenceId}</span>
                </p>
              )}
              <Link href="/">
                <button className="bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Back to Home
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <h1 className="text-3xl font-bold mb-3">Booking Failed</h1>
              <p className="text-gray-600 mb-8">
                Unfortunately, your booking could not be processed. Please try again.
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <button className="bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Back to Home
                  </button>
                </Link>
                <Link href="/checkout">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition">
                    Try Again
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
