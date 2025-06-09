import Image from "next/image"

export function GiftCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
      <div className="relative h-24 mb-3 bg-gray-50 rounded-2xl p-2">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={100}
          height={60}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-semibold text-gray-800 text-center text-sm">{title}</h3>
    </div>
  )
}
