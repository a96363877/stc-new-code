import Image from "next/image"

export function CategoryCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 text-center">
      <div className="relative h-16 mb-2 bg-gray-50 rounded-2xl p-2">
        <img
          src={image || "/placeholder.svg"}
          alt={label}
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  )
}
