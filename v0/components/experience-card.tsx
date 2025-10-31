"use client"

import Link from "next/link"
import Image from "next/image"
import type { Experience } from "@/types"

interface ExperienceCardProps extends Experience {
  ratingUser?: string
  ratingValue?: number
  locationTag?: {
    label: string
    color: string
  }
  borderColor?: string
}

export function ExperienceCard({
  id,
  title,
  location,
  image,
  price,
  description,
  ratingUser = "R",
  ratingValue = 7,
  locationTag,
  borderColor,
}: ExperienceCardProps) {
  return (
    <Link href={`/experience/${id}`}>
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer h-full flex flex-col ${
          borderColor ? `border-4 ${borderColor}` : ""
        }`}
      >
        <div className="relative h-48 w-full group">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
              {ratingUser}
            </div>
            <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
              {ratingValue}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title and Location Tag */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-sm">{title}</h3>
            {locationTag && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${locationTag.color}`}
              >
                {locationTag.label}
              </span>
            )}
          </div>

          {/* Location */}
          <p className="text-xs text-gray-600 bg-gray-100 w-fit px-2 py-1 rounded mb-3">{location}</p>

          {/* Description */}
          <p className="text-xs text-gray-700 mb-4 line-clamp-2 flex-1">{description}</p>

          {/* Footer: Price and Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-600">From</span>
              <span className="font-bold text-lg">₹{price}</span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold text-xs transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
