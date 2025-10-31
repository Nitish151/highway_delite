"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft } from "lucide-react";
import { experienceService, bookingService, promoService } from "@/services/api";
import type { Experience, Slot } from "@/types";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const experienceId = searchParams.get("id") || "";
  const slotId = searchParams.get("slotId") || "";
  const qty = Number(searchParams.get("qty")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getById(experienceId);
        setExperience(data.experience);
        const foundSlot = data.slots.find((s) => s.id === slotId);
        setSlot(foundSlot || null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (experienceId && slotId) {
      fetchData();
    }
  }, [experienceId, slotId]);

  const subtotal = experience ? experience.price * qty : 0;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      setPromoError("");
      const promoData = await promoService.validate(promoCode);
      
      let discountAmount = 0;
      if (promoData.type === "percentage") {
        discountAmount = Math.round((subtotal * promoData.discount) / 100);
      } else {
        discountAmount = promoData.discount;
      }
      
      setDiscount(discountAmount);
      setPromoApplied(true);
    } catch (error: any) {
      setPromoError(error.message || "Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !agreed) return;

    try {
      setSubmitting(true);
      const bookingData = {
        experienceId,
        slotId,
        fullName,
        email,
        quantity: qty,
        promoCode: promoApplied ? promoCode : undefined,
        subtotal,
        discount,
        taxes,
        total,
      };

      const result = await bookingService.create(bookingData);
      router.push(`/confirmation?ref=${result.referenceId}&status=success`);
    } catch (error) {
      console.error("Booking failed:", error);
      router.push(`/confirmation?status=failed`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!experience || !slot) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Booking information not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/experience/${experienceId}`} className="flex items-center gap-2 text-black mb-6 hover:underline text-sm">
          <ChevronLeft className="w-4 h-4" />
          Checkout
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2 bg-gray-100 border-0 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2 bg-gray-100 border-0 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Promo code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoError("");
                      setPromoApplied(false);
                      setDiscount(0);
                    }}
                    placeholder=""
                    className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    disabled={promoApplied}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
                {promoApplied && <p className="text-green-600 text-xs mt-1">Promo code applied!</p>}
              </div>

              <div className="flex items-start gap-2 mb-0">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the terms and conditions and safety policy
                </label>
              </div>
            </form>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{slot.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{slot.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span className="font-semibold">{qty}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 pt-4 border-t border-gray-300">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">₹{total}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !agreed}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Spinner size="sm" />
                    Processing...
                  </>
                ) : (
                  "Pay and Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
