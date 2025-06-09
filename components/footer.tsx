export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-right">
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
