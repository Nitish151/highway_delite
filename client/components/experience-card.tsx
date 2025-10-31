"use client";

import Link from "next/link";
import Image from "next/image";
import type { Experience } from "@/types";

interface ExperienceCardProps extends Experience {
  ratingUser?: string;
  ratingValue?: number;
  locationTag?: {
    label: string;
    color: string;
  };
  borderColor?: string;
}

export function ExperienceCard({
  id,
  title,
  location,
  image,
  price,
  description,
  locationTag,
  borderColor,
}: ExperienceCardProps) {
  return (
    <Link href={`/experience/${id}`}>
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col border border-gray-100 ${
          borderColor ? `border-4 ${borderColor}` : ""
        }`}
      >
        <div className="relative h-48 w-full group overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {locationTag && (
            <div className="absolute top-3 right-3 ">
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${locationTag.color}`}
              >
                {locationTag.label}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5 flex-1 flex flex-col" style={{ backgroundColor: '#F0F0F0' }}>
          {/* Title */}
          <div className="flex items-start justify-between mb-2.5">
            <h3 className="font-bold text-[13px] leading-tight" style={{ color: '#161616' }}>{title}</h3>
            <p className="text-[11px] text-[#161616] w-fit px-2 py-0.5 rounded" style={{ backgroundColor: '#D6D6D6' }}>
              {location}
            </p>
          </div>

          {/* Description */}
          <p className="text-[11px] text-[#6C6C6C] leading-relaxed mb-3 line-clamp-2 flex-1">{description}</p>

          {/* Footer: Price and Button */}
          <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px]" style={{ color: '#161616' }}>From</span>
              <span className="font-bold text-base" style={{ color: '#161616' }}>₹{price}</span>
            </div>
            <button className="bg-[#FCD34D] hover:bg-[#FDE047] px-3.5 py-1.5 rounded-md font-semibold text-[11px] transition-colors shadow-sm" style={{ color: '#161616' }}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
