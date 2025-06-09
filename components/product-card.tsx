import Image from "next/image"

export function ProductCard({
  image,
  title,
  price,
  badge,
}: {
  image: string
  title: string
  price: string
  badge?: string
}) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 min-w-[160px]">
      {badge && <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">{badge}</div>}
      <div className="relative h-32 mb-3 bg-gray-50 rounded-2xl p-2">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 text-sm">{title}</h3>
      <div className="font-bold text-gray-900 text-sm">{price}</div>
    </div>
  )
}
