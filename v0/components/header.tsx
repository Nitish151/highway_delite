"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🚩</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black leading-none">highway</span>
                <span className="text-xs text-gray-600 leading-none">detour</span>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border-0 text-sm rounded-md"
              />
              <Button
                onClick={handleSearch}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 text-sm flex-shrink-0 rounded-md"
              >
                Search
              </Button>
            </div>
          </div>

          {/* User Profile Icon */}
          <button className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 rounded-full p-2 transition">
            <User className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </header>
  )
}
