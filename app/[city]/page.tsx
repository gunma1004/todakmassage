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

// 60개의 타이틀 코스 패턴 ('마사지 마사지' 중복 배제 및 다채로운 키워드 배치)
const cityCoursePatterns = [
  '출장 건식 마사지 & 힐링 케어',
  '출장 아로마 마사지 1:1 맞춤',
  '출장 스웨디시 & 프리미엄 테라피',
  '출장 타이 마사지 정찰제 안내',
  '출장 힐링 바디케어 코스 예약',
  '출장 딥티슈 테라피 & 안심 서비스',
  '출장 릴렉싱 마사지 안심 후불제',
  '출장 감성 스웨디시 테라피 케어',
  '출장 스포츠 마사지 피로해소 코스',
  '출장 전신 테라피 & 1:1 힐링 코스',
  '출장 로미로미 마사지 전문 안내',
  '출장 아로마 테라피 감성 힐링 케어',
  '출장 풋&바디 마사지 맞춤 코스',
  '출장 림프 순환 테라피 안심 서비스',
  '출장 프리미엄 홈타이 테라피 안내',
  '출장 건식 릴렉싱 마사지 예약',
  '출장 오일 바디케어 1:1 전문 테라피',
  '출장 힐링 테라피 정찰제 케어',
  '출장 스웨디시 마사지 VIP 코스',
  '출장 감성 테라피 & 프라이빗 힐링',
  '출장 전신 릴렉스 마사지 추천 코스',
  '출장 바디 밸런스 테라피 맞춤 케어',
  '출장 아로마 오일 마사지 안심 안내',
  '출장 딥 릴렉싱 테라피 전문 코스',
  '출장 타이 테라피 피로 완화 케어',
  '출장 시그니처 마사지 VIP 힐링',
  '출장 프리미엄 바디 테라피 예약',
  '출장 힐링 아로마 마사지 후불제',
  '출장 나이트 케어 테라피 신속 안내',
  '출장 전신 스트레칭 마사지 코스',
  '출장 센슈얼 스웨디시 테라피 케어',
  '출장 림프 릴렉싱 마사지 맞춤형',
  '출장 홈 웰니스 테라피 정찰제',
  '출장 건식 테라피 & 힐링 바디케어',
  '출장 스위트 아로마 마사지 안내',
  '출장 정통 타이 마사지 피로 리셋',
  '출장 VIP 전신 테라피 1:1 예약',
  '출장 감성 바디케어 마사지 코스',
  '출장 심야 안심 테라피 신속 방문',
  '출장 프라이빗 힐링 마사지 추천',
  '출장 딥티슈 바디케어 전문 테라피',
  '출장 프리미엄 스웨디시 마사지 케어',
  '출장 오일 테라피 & 릴렉싱 바디',
  '출장 전신 순환 마사지 맞춤 관리',
  '출장 로맨틱 아로마 테라피 코스',
  '출장 에너제틱 스포츠 마사지 예약',
  '출장 힐링 후불제 테라피 전문 케어',
  '출장 클래식 타이 마사지 안내',
  '출장 소프트 스웨디시 힐링 테라피',
  '출장 1:1 맞춤 바디케어 마사지',
  '출장 감성 릴렉스 테라피 정찰제',
  '출장 올인원 전신 마사지 예약 안내',
  '출장 럭셔리 아로마 테라피 케어',
  '출장 밸런스 힐링 마사지 코스',
  '출장 프리미엄 홈케어 테라피 안내',
  '출장 데일리 피로해소 마사지 케어',
  '출장 젠틀 딥티슈 테라피 맞춤 코스',
  '출장 내추럴 아로마 마사지 예약',
  '출장 토탈 릴렉싱 테라피 안심 서비스',
  '출장 힐링 마인드 & 바디 마사지'
];

const cityPlatformHooks = [
  '토닥 전지역 예약',
  '100% 안심 후불제',
  '프라이빗 홈케어',
  '신속 방문 힐링망',
  '피로해소 웰니스'
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
  const lowerCity = city.toLowerCase();

  const cityName = lowerCity === "seoul" ? "서울" : lowerCity === "incheon" ? "인천" : "경기";

  // 구·동 명칭을 가져와 '출장 마사지' 바로 앞에 위치하도록 세팅
  const currentRegion = regionData[lowerCity];
  const sampleDistricts = currentRegion?.districts
    ? Object.values(currentRegion.districts).slice(0, 3).map((d: any) => d.name).join("·")
    : "";

  const districtPrefix = sampleDistricts 
    ? `${cityName} 전역 및 ${sampleDistricts} 구·동 출장 마사지 전문.` 
    : `${cityName} 전지역 구·동 출장 마사지 전문.`;

  // 60개 패턴 순차 순환 로직 (일자 + 도시 고유값 결합)
  const today = new Date().getDate();
  const cityCode = lowerCity.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const courseIdx = (today + cityCode) % cityCoursePatterns.length;
  const hookIdx = (cityCode * 3) % cityPlatformHooks.length;
  const priceIdx = (cityCode * 7) % priceHooks.length;

  // 타이틀 생성: [도시명] [60개 코스 패턴 중 1개] | [플랫폼 훅] | [사이트명]
  let finalTitle = `${cityName} ${cityCoursePatterns[courseIdx]} | ${cityPlatformHooks[hookIdx]} | ${SITE_NAME}`;
  
  // 혹시 모를 '마사지 마사지' 중복 키워드 자동 압축 방어 코드
  finalTitle = finalTitle.replace(/마사지\s*마사지/g, '마사지');

  const finalDescription = `${districtPrefix} 검증된 한국인 관리사의 100% 후불제 홈케어. ${priceHooks[priceIdx]}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: `${SITE_URL}/${city}` },
    keywords: [
      `${cityName} 출장 건식 마사지`,
      `${cityName} 출장 아로마 마사지`,
      `${cityName} 출장 마사지`,
      `${cityName} 홈타이`,
      `${cityName} 스웨디시`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}`,
      locale: "ko_KR",
      type: "website"
    },
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