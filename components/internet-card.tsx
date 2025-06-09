import Image from "next/image"

export function InternetCard({
  title,
  subtitle,
  bgColor,
  image,
}: {
  title: string
  subtitle: string
  bgColor: string
  image: string
}) {
  return (
    <div className={`${bgColor} rounded-3xl p-6 text-center`}>
      <div className="mb-3 flex justify-center">
        <img src={image || "/placeholder.svg"} alt={title} width={32} height={32} />
      </div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}
