export interface Experience {
  id: string
  title: string
  location: string
  image: string
  price: number
  description: string
  ratingUser?: string
  ratingValue?: number
  locationTag?: {
    label: string
    color: string
  }
  borderColor?: string
}
