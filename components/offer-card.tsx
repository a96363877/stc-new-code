import { Button } from "@/components/ui/button"

export function OfferCard({
  title,
  subtitle,
  bgColor,
  buttonText,
}: {
  title: string
  subtitle: string
  bgColor: string
  buttonText: string
}) {
  return (
    <div className={`${bgColor} rounded-3xl p-6 text-white relative overflow-hidden`}>
      <div className="relative z-10">
        <p className="text-sm opacity-90 mb-1">{subtitle}</p>
        <h3 className="font-bold text-lg mb-4 leading-tight">{title}</h3>
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-4 py-2 text-sm">{buttonText}</Button>
      </div>
    </div>
  )
}
