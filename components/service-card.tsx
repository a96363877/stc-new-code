import type React from "react"

export function ServiceCard({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className={`${color} rounded-full p-3 text-white shadow-lg`}>{icon}</div>
      <span className="text-xs text-center font-medium text-gray-700">{title}</span>
    </div>
  )
}
