"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { experienceService } from "@/services/api"
import { Button } from "@/components/ui/button"
import type { Experience } from "@/types"

export default function ExperienceDetail() {
  const params = useParams()
  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedDate, setSelectedDate] = useState("Oct 22")
  const [selectedTime, setSelectedTime] = useState("07:00 am")

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await experienceService.getById(params.id as string)
        setExperience(data)
      } catch (error) {
        console.error("Failed to load experience:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [params.id])

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (!experience) return <div className="flex justify-center items-center min-h-screen">Experience not found</div>

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"]
  const times = [
    { label: "07:00 am", capacity: "4 left" },
    { label: "9:00 am", capacity: "2 left" },
    { label: "11:00 am", capacity: "1 left" },
    { label: "1:00 pm", capacity: "Sold out" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-foreground hover:text-primary">
            <ChevronLeft className="w-5 h-5" />
            <span>Details</span>
          </button>
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search experiences"
              className="w-full bg-secondary border-0 px-4 py-2 text-sm rounded text-foreground placeholder-muted-foreground"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">Search</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image and Content */}
          <div className="lg:col-span-2">
            {/* Experience Image */}
            <div className="relative w-full h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src={experience.image || "/placeholder.svg"}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl font-bold text-foreground mb-4">{experience.title}</h1>
            <p className="text-muted-foreground mb-8">{experience.description}</p>

            {/* Choose Date */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Choose date</h2>
              <div className="flex gap-3">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded font-semibold transition ${
                      selectedDate === date
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Choose time</h2>
              <div className="flex gap-3 flex-wrap">
                {times.map((time) => (
                  <button
                    key={time.label}
                    onClick={() => setSelectedTime(time.label)}
                    disabled={time.capacity === "Sold out"}
                    className={`px-4 py-2 rounded font-semibold transition text-sm ${
                      selectedTime === time.label && time.capacity !== "Sold out"
                        ? "bg-primary text-primary-foreground"
                        : time.capacity === "Sold out"
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-secondary text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {time.label}
                    <span className="text-xs ml-2">{time.capacity}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About Section */}
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-xl font-bold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground text-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>

          {/* Right: Pricing Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              {/* Pricing Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground text-sm">Starts at</span>
                <span className="text-2xl font-bold text-foreground">₹{experience.price}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-sm text-foreground mb-3">Quantity</p>
                <div className="flex items-center justify-between bg-secondary rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-border transition"
                  >
                    −
                  </button>
                  <span className="font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-border transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-border pt-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="text-foreground font-semibold">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total}</span>
                </div>
              </div>

              {/* Confirm Button */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
