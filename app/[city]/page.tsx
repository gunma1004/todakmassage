import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://todakmassage.netlify.app";
const SITE_NAME = "토닥마사지";

const cityBookingPatterns = [
  '전지역 마사지 예약', '실시간 마사지예약', '마사지 코스 예약', '힐링 마사지 예약',
  '마사지 케어 추천예약', '마사지 케어 안내', '마사지 통합예약', '마사지 케어 안내'
];

const cityPlatformHooks = [
  '토닥마사지', 'TODAK', '안심 웰니스', '프라이빗 케어',
  '힐링 네트워크', '안심 후불제', '전신 피로해소', '1:1 맞춤 케어'
];

const priceHooks = [
  '건식 6만원부터 심야할증 없이 방문합니다.',
  '건식 7만원부터 심야할증 없이 방문합니다.',
  '스웨디시 8만원부터 추가비용 없이 방문합니다.',
  '아로마 7만원부터 합리적인 정찰제로 방문합니다.',
  '타이 6만원부터 현장 결제 후불제로 방문합니다.'
];

const shops = [
  { id: 1, name: "한국골든테라피", badge: "VIP 골든 힐링 케어", desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피", phone: "0507-1280-3361", image: "/shop1.jpg" },
  { id: 2, name: "한국미인테라피", badge: "재방문율 최우수", desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램", phone: "0507-1280-3303", image: "/shop2.jpg" },
  { id: 3, name: "주주테라피", badge: "만족도 1위 추천", desc: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 VIP 코스까지", phone: "0507-1280-3193", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", badge: "여왕처럼 누리는 VIP", desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 1:1 맞춤 방문 힐링", phone: "0507-1280-3334", image: "/shop4.jpg" },
  { id: 5, name: "오늘밤테라피", badge: "야간 힐링 만족 1위", desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 완벽하게", phone: "0507-1280-3223", image: "/shop5.jpg" }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const seedString = `${cityName}-${city.toLowerCase()}-todak-city-seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const part2Idx = (charSum * 3) % cityBookingPatterns.length;
  const part3Idx = (charSum * 5) % cityPlatformHooks.length;
  const priceIdx = (charSum * 7) % priceHooks.length;

  const finalTitle = `${cityName} 마사지 | ${cityName} ${cityBookingPatterns[part2Idx]} | ${cityPlatformHooks[part3Idx]}`;
  const finalDescription = `${cityName} 출장 홈케어 및 프리미엄 마사지 전문. 검증된 관리사의 100% 후불제 안심 케어. ${priceHooks[priceIdx]}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: `${SITE_URL}/${city}` },
    keywords: [`${cityName} 마사지`, `${cityName} 출장 마사지`, `${cityName} 홈타이`, `${cityName} 스웨디시`, SITE_NAME],
    openGraph: { title: finalTitle, description: finalDescription, url: `${SITE_URL}/${city}`, locale: "ko_KR", type: "website" },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districts = region?.districts || {};

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">REGIONAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{cityName} 출장 마사지 & 프리미엄 테라피</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {cityName} 전 지역 어디서나 편안하게 즐기는 100% 후불제 안심 바디케어. 원하시는 권역을 선택해 보세요.
          </p>
        </section>

        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            📍 {cityName} 세부 권역(구·시·군) 선택
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {Object.entries(districts).map(([dKey, dVal]) => (
              <Link key={dKey} href={`/${city}/${dKey}`} className="px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition text-center flex items-center justify-between">
                <span>{dVal.name}</span>
                <span className="text-sky-500">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">TOP PARTNER SHOPS</span>
            <h3 className="text-base md:text-xl font-black text-slate-900 mt-1">
              ✨ {cityName} BEST 추천 제휴 샵
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {shops.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl border bg-slate-50 border-slate-200 hover:border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">{s.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={`tel:${s.phone}`} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-xs hover:bg-sky-700 transition-all">
                    📞 전화 예약
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}