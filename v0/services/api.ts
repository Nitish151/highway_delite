import type { Experience } from "@/types"

// Mock data for experiences
const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "Kayaking",
    location: "Udapi",
    image: "/kayaking-mangrove-river.jpg",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Udapi", color: "bg-gray-100 text-gray-800" },
  },
  {
    id: "2",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    image: "/nandi-hills-sunrise.jpg",
    price: 899,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Bangalore", color: "bg-pink-100 text-pink-800" },
  },
  {
    id: "3",
    title: "Coffee Trail",
    location: "Coorg",
    image: "/coffee-plantation-coorg.jpg",
    price: 1299,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Coorg", color: "bg-gray-100 text-gray-800" },
  },
  {
    id: "4",
    title: "Kayaking",
    location: "Udapi, Karnataka",
    image: "/kayaking-tropical-waters.jpg",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Udapi, Karnataka", color: "bg-gray-100 text-gray-800" },
  },
  {
    id: "5",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    image: "/mountain-sunset-bangalore.jpg",
    price: 899,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Bangalore", color: "bg-pink-100 text-pink-800" },
  },
  {
    id: "6",
    title: "Boat Cruise",
    location: "Sunderban",
    image: "/boat-cruise-water.jpg",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Sunderban", color: "bg-gray-100 text-gray-800" },
  },
  {
    id: "7",
    title: "Bunjee Jumping",
    location: "Manali",
    image: "/bungee-jumping-adventure.jpg",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Manali", color: "bg-gray-100 text-gray-800" },
  },
  {
    id: "8",
    title: "Coffee Trail",
    location: "Coorg",
    image: "/coffee-forest-nature.jpg",
    price: 1299,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    ratingUser: "R",
    ratingValue: 7,
    locationTag: { label: "Coorg", color: "bg-gray-100 text-gray-800" },
    borderColor: "border-red-500",
  },
]

export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockExperiences
  },

  getById: async (id: string): Promise<Experience | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockExperiences.find((exp) => exp.id === id) || null
  },

  search: async (query: string): Promise<Experience[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockExperiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(query.toLowerCase()) ||
        exp.location.toLowerCase().includes(query.toLowerCase()),
    )
  },
}
