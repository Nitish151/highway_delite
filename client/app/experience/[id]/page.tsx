"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft } from "lucide-react";
import { experienceService } from "@/services/api";
import type { Experience, Slot } from "@/types";

export default function ExperiencePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getById(params.id);
        setExperience(data.experience);
        setSlots(data.slots);
        
        // Set default selections
        if (data.slots.length > 0) {
          const firstSlot = data.slots[0];
          setSelectedDate(firstSlot.date);
          setSelectedTime(firstSlot.time);
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

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

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Experience not found</p>
        </div>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const uniqueDates = [...new Set(slots.map((s) => s.date))];
  const availableTimes = slots.filter((s) => s.date === selectedDate);

  const selectedSlot = slots.find((s) => s.date === selectedDate && s.time === selectedTime);
  const isAvailable = selectedSlot && selectedSlot.availableSpots >= quantity;

  const handleConfirm = () => {
    if (!isAvailable) return;
    
    router.push(
      `/checkout?id=${params.id}&slotId=${selectedSlot?.id}&qty=${quantity}`
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EEEEEE' }}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline" 
          style={{ color: '#161616' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold mb-4" style={{ color: '#161616' }}>
              {experience.title}
            </h1>
            <p className="mb-8" style={{ color: '#6C6C6C' }}>
              {experience.fullDescription || experience.description}
            </p>

            <div className="mb-8">
              <h2 className="mb-4" style={{ color: '#161616', fontFamily: 'Inter', fontWeight: 500, fontSize: '18px', lineHeight: '22px', letterSpacing: '0%' }}>
                Choose date
              </h2>
              <div className="flex gap-3">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      const firstTimeForDate = slots.find((s) => s.date === date);
                      if (firstTimeForDate) setSelectedTime(firstTimeForDate.time);
                    }}
                    className="px-4 py-2 rounded font-semibold transition"
                    style={{
                      backgroundColor: selectedDate === date ? '#FFD643' : '#EEEEEE',
                      color: '#161616'
                    }}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4" style={{ color: '#161616', fontFamily: 'Inter', fontWeight: 500, fontSize: '18px', lineHeight: '22px', letterSpacing: '0%' }}>
                Choose time
              </h2>
              <div className="flex gap-3 flex-wrap">
                {availableTimes.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={slot.availableSpots === 0}
                    className="px-4 py-2 rounded font-semibold transition text-sm"
                    style={{
                      backgroundColor: selectedTime === slot.time && slot.availableSpots !== 0
                        ? '#FFD643'
                        : slot.availableSpots === 0
                        ? '#CCCCCC'
                        : '#EEEEEE',
                      color: slot.availableSpots === 0 ? '#838383' : '#161616',
                      cursor: slot.availableSpots === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {slot.time}
                    {slot.availableSpots < 5 && slot.availableSpots > 0 && (
                      <span className="text-xs ml-2" style={{ color: '#FF4C0A' }}>({slot.availableSpots} left)</span>
                    )}
                    {slot.availableSpots === 0 && (
                      <span className="text-xs ml-2">(Sold out)</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: '#838383' }}>
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {experience.about && (
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#EEEEEE' }}>
                <h2 className="mb-3" style={{ color: '#161616', fontFamily: 'Inter', fontWeight: 500, fontSize: '18px', lineHeight: '22px', letterSpacing: '0%' }}>
                  About
                </h2>
                <p className="text-sm" style={{ color: '#6C6C6C' }}>
                  {experience.about}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div 
              className="rounded-lg p-6 sticky top-8" 
              style={{ backgroundColor: '#EEEEEE' }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm" style={{ color: '#838383' }}>
                  Starts at
                </span>
                <span className="text-2xl font-bold" style={{ color: '#161616' }}>
                  ₹{experience.price}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm mb-3" style={{ color: '#161616' }}>
                  Quantity
                </p>
                <div 
                  className="flex items-center justify-between rounded" 
                  style={{ backgroundColor: '#EEEEEE' }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center transition"
                    style={{ color: '#161616' }}
                  >
                    −
                  </button>
                  <span className="font-semibold" style={{ color: '#161616' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={selectedSlot && quantity >= selectedSlot.availableSpots}
                    className="w-10 h-10 flex items-center justify-center transition disabled:opacity-50"
                    style={{ color: '#161616' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3 border-t pt-6 mb-6" style={{ borderColor: '#CCCCCC' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#6C6C6C' }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: '#161616' }}>
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#6C6C6C' }}>Taxes</span>
                  <span className="font-semibold" style={{ color: '#161616' }}>
                    ₹{taxes}
                  </span>
                </div>
                <div 
                  className="flex justify-between text-lg font-bold pt-3 border-t" 
                  style={{ borderColor: '#CCCCCC' }}
                >
                  <span style={{ color: '#161616' }}>Total</span>
                  <span style={{ color: '#161616' }}>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!isAvailable}
                className="w-full py-3 rounded font-bold transition disabled:opacity-50"
                style={{
                  backgroundColor: !isAvailable ? '#CCCCCC' : '#FFD643',
                  color: '#161616'
                }}
              >
                {!isAvailable ? "Not Available" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}