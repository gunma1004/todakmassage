import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://todakmassage.netlify.app";
const SITE_NAME = "토닥마사지";

// 타이틀용 100개 순환 패턴 ('마사지' 중복 배제 및 다채로운 테라피 구성)
const title100Patterns = [
  "출장 건식 마사지 & 힐링 케어 | 전지역 안심 예약",
  "출장 스웨디시 & 프리미엄 테라피 | 100% 후불제",
  "출장 아로마 마사지 1:1 맞춤 | 프라이빗 케어",
  "출장 정통 타이 마사지 정찰제 | 힐링 네트워크",
  "출장 감성 스웨디시 테라피 | 피로해소 웰니스",
  "출장 딥티슈 테라피 케어 | 신속 방문 서비스",
  "출장 힐링 바디케어 코스 예약 | 안심 힐러 매칭",
  "출장 릴렉싱 마사지 전문 | 현장 결제 시스템",
  "출장 스포츠 마사지 피로 리셋 | 맞춤 바디케어",
  "출장 프리미엄 홈타이 테라피 | VIP 케어 코스",
  "출장 로미로미 마사지 안내 | 감성 힐링 테라피",
  "출장 림프 순환 케어 서비스 | 프라이빗 홈힐링",
  "출장 아로마 오일 테라피 코스 | 1:1 전신 케어",
  "출장 풋&바디 마사지 예약 | 안심 정찰제 안내",
  "출장 나이트 안심 케어 테라피 | 심야 방문 전문",
  "출장 전신 스트레칭 마사지 | 피로 회복 코스",
  "출장 센슈얼 스웨디시 테라피 | 프리미엄 힐링",
  "출장 딥 릴렉스 마사지 안내 | 100% 후불 케어",
  "출장 바디 밸런스 테라피 | 체형 맞춤 바디케어",
  "출장 시그니처 힐링 테라피 | VIP 전신 코스",
  "출장 클래식 타이 마사지 코스 | 신속 안심 방문",
  "출장 소프트 스웨디시 케어 | 감성 테라피 예약",
  "출장 에너제틱 스포츠 테라피 | 활력 충전 코스",
  "출장 올인원 전신 마사지 예약 | 프라이빗 케어",
  "출장 내추럴 아로마 테라피 | 순수 힐링 프로그램",
  "출장 토탈 릴렉싱 마사지 코스 | 안심 방문 보장",
  "출장 럭셔리 스웨디시 테라피 | VIP 1:1 케어",
  "출장 데일리 피로해소 마사지 | 정찰제 힐링 안내",
  "출장 젠틀 딥티슈 테라피 | 집중 힐링 바디케어",
  "출장 감성 아로마 마사지 예약 | 편안한 방문 힐링",
  "출장 힐링 마인드 테라피 코스 | 전신 피로 완화",
  "출장 정통 건식 릴렉스 케어 | 안심 후불제 예약",
  "출장 프리미엄 바디 밸런스 | 전문 힐러 1:1",
  "출장 캄 테라피 & 마사지 코스 | 조용하고 편안한 힐링",
  "출장 스페셜 홈타이 마사지 | 합리적 정찰 요금제",
  "출장 오일 바디 테라피 케어 | 감성 스웨디시 안내",
  "출장 전신 딥 릴렉싱 코스 | 전문 관리사 방문",
  "출장 포커스 힐링 마사지 예약 | 근육 피로 완화",
  "출장 릴렉스 스웨디시 테라피 | 맞춤형 프리미엄",
  "출장 퍼펙트 바디케어 코스 | 100% 현장 결제",
  "출장 수딩 아로마 마사지 안내 | 감성 릴렉싱",
  "출장 비탈리티 스포츠 테라피 | 활력 바디케어",
  "출장 심야 힐링 마사지 코스 | 늦은 밤 안심 방문",
  "출장 오가닉 오일 테라피 케어 | 정성 가득 힐링",
  "출장 마일드 스웨디시 마사지 | 프라이빗 안심 코스",
  "출장 컴포트 홈타이 테라피 | 정직한 정찰제 케어",
  "출장 힐링 바디 리셋 마사지 | 전신 피로해소",
  "출장 엑스퍼트 테라피 케어 | 검증된 관리사 매칭",
  "출장 프리미엄 딥티슈 코스 | 섬세한 바디 힐링",
  "출장 감성 릴렉싱 마사지 예약 | 1:1 후불제 방문",
  "출장 밸런스드 아로마 테라피 | 심신 안정 프로그램",
  "출장 디럭스 스웨디시 마사지 | 최고급 VIP 코스",
  "출장 리프레시 타이 테라피 | 경직된 근육 완화",
  "출장 프로페셔널 바디 마사지 | 고객 만족 맞춤 케어",
  "출장 시그니처 아로마 테라피 | 천연 오일 전신 코스",
  "출장 프라이빗 힐링 케어 예약 | 신속 방문 시스템",
  "출장 소프트 릴렉스 마사지 코스 | 부드러운 전신 힐링",
  "출장 하이엔드 테라피 서비스 | 감성 스웨디시 안내",
  "출장 바디 리바이탈 마사지 | 활력 넘치는 테라피",
  "출장 슬로우 힐링 아로마 케어 | 편안한 휴식 보장",
  "출장 올데이 안심 마사지 예약 | 언제나 신속 방문",
  "출장 럭스 스웨디시 테라피 | 품격 있는 바디 힐링",
  "출장 모빌리티 스트레칭 코스 | 전신 유연성 케어",
  "출장 에센셜 오일 마사지 예약 | 감성 아로마 테라피",
  "출장 이지 케어 홈타이 안내 | 부담 없는 정찰제",
  "출장 풀바디 릴렉싱 테라피 | 피로 싹 풀리는 코스",
  "출장 딥 릴리프 마사지 코스 | 깊은 휴식을 주는 케어",
  "출장 힐링 아우라 스웨디시 | 감성 만족 프리미엄",
  "출장 밸런싱 바디 테라피 예약 | 균형 잡힌 전신 케어",
  "출장 마인드풀 테라피 서비스 | 편안한 안심 후불제",
  "출장 퓨어 아로마 마사지 코스 | 산뜻한 힐링 바디케어",
  "출장 스트롱 스포츠 마사지 안내 | 운동 후 피로 완화",
  "출장 나이트 릴렉스 테라피 | 숙면을 돕는 안심 코스",
  "출장 VIP 시그니처 마사지 | 품격 높은 1:1 방문",
  "출장 에스테틱 바디 테라피 케어 | 감성 스웨디시 예약",
  "출장 프레시 타이 마사지 안내 | 가벼워지는 몸과 마음",
  "출장 릴렉싱 오일 테라피 코스 | 정성스러운 손길",
  "출장 젠틀 케어 마사지 서비스 | 부담 없는 현장 결제",
  "출장 컴팩트 힐링 테라피 예약 | 알찬 실속 코스",
  "출장 로열 스웨디시 마사지 코스 | 감성 테라피의 정수",
  "출장 딥 바디 스트레칭 케어 | 시원한 힐링 테라피",
  "출장 센서티브 아로마 마사지 | 은은한 감성 케어",
  "출장 홈 웰니스 테라피 안내 | 내 집에서 누리는 휴식",
  "출장 릴렉세이션 마사지 코스 | 완벽한 하루의 마무리",
  "출장 프리미엄 에센스 테라피 | 품격 있는 홈 힐링",
  "출장 클래식 바디케어 마사지 | 정통 테라피 안내",
  "출장 스무스 스웨디시 테라피 | 부드럽고 섬세한 터치",
  "출장 힐링 포레스트 마사지 | 맑고 개운한 전신 코스",
  "출장 인텐시브 딥티슈 테라피 | 확실한 피로 관리",
  "출장 캄 앤 릴렉스 마사지 안내 | 스트레스 해소 코스",
  "출장 오리엔탈 홈타이 테라피 | 안심 정찰제 방문",
  "출장 럭셔리 바디 마사지 코스 | 최상의 힐링 만족도",
  "출장 내추럴 릴렉스 테라피 케어 | 순수 아로마 코스",
  "출장 퀵 안심 방문 마사지 | 기다림 없는 신속 배차",
  "출장 프리미엄 코스 테라피 안내 | 프라이빗 안심 예약",
  "출장 리얼 힐링 마사지 프로그램 | 감동을 주는 손길",
  "출장 스페셜 바디 밸런스 코스 | 조화로운 전신 힐링",
  "출장 어반 릴렉싱 스웨디시 | 도시인을 위한 바디케어",
  "출장 힐링 모먼트 테라피 코스 | 온전한 나만의 휴식",
  "출장 퍼펙트 전신 마사지 안내 | 100% 만족 보장 케어"
];

// 메타 디스크립션용 100개 순환 패턴 (구·동 바로 뒤에 '출장 마사지' 키워드 배치)
const desc100Patterns = [
  "출장 마사지 및 프리미엄 홈타이 전문. 검증된 관리사의 100% 후불제 안심 케어.",
  "출장 마사지 전문 플랫폼. 선입금 전혀 없는 현장 결제로 편안하게 즐기는 테라피.",
  "출장 마사지 추천 코스. 지친 하루의 피로를 풀어주는 1:1 맞춤형 방문 힐링.",
  "출장 마사지 스웨디시 & 아로마 전문. 정찰제 요금으로 부담 없이 이용하세요.",
  "출장 마사지 신속 방문 케어. 전문 자격을 갖춘 한국인 관리사의 명품 바디테라피.",
  "출장 마사지 100% 후불 보장제. 내 집에서 편안하게 누리는 감성 스웨디시 힐링.",
  "출장 마사지 예약 안내. 건식, 아로마, 타이 등 다채로운 코스를 합리적으로.",
  "출장 마사지 프라이빗 케어. 고객 만족도 높은 검증된 제휴 샵 맞춤 매칭.",
  "출장 마사지 안심 방문 서비스. 늦은 심야 시간에도 할증 걱정 없는 정찰제 힐링.",
  "출장 마사지 힐링 테라피 안내. 뭉친 근육을 부드럽게 이완하는 프리미엄 프로그램.",
  "출장 마사지 최고급 아로마 오일 케어. 편안한 공간에서 누리는 VIP 전신 관리.",
  "출장 마사지 홈타이 & 스웨디시 추천. 안전하고 투명한 100% 현장 결제 방식.",
  "출장 마사지 맞춤 바디 솔루션. 하루의 스트레스를 날려주는 정성스러운 손길.",
  "출장 마사지 빠른 배차 안내. 전화 한 통으로 신속하게 찾아가는 방문 테라피.",
  "출장 마사지 전문 힐러들의 밀착 케어. 위생과 퀄리티를 최우선으로 생각합니다.",
  "출장 마사지 정통 힐링 바디 테라피. 품격 있는 관리로 몸과 마음에 활력을 충전.",
  "출장 마사지 실시간 예약 시스템. 선입금 사기 걱정 없는 완벽한 안심 후불제.",
  "출장 마사지 딥티슈 & 림프 순환 케어. 묵은 피로를 말끔하게 날려드립니다.",
  "출장 마사지 VIP 스웨디시 안내. 섬세하고 부드러운 테크닉으로 극상의 힐링 선사.",
  "출장 마사지 홈케어 서비스. 내가 원하는 시간과 장소에서 누리는 고품격 휴식.",
  "출장 마사지 정찰제 가격 안내. 추가 비용 일체 없이 투명하게 진행되는 바디케어.",
  "출장 마사지 맞춤형 안심 케어. 프라이빗한 개인 공간에서 경험하는 최고의 휴식.",
  "출장 마사지 전신 피로해소 코스. 전문적인 테크닉으로 개운한 일상을 선사합니다.",
  "출장 마사지 스웨디시 테라피 추천. 은은한 향기와 함께 즐기는 감성 바디케어.",
  "출장 마사지 1:1 예약 안내. 친절하고 숙련된 관리사가 꼼꼼하게 케어해 드립니다.",
  "출장 마사지 안전 후불 결제. 예약금 요구 없는 투명하고 정직한 테라피 플랫폼.",
  "출장 마사지 힐링 코스 모음. 나에게 딱 맞는 맞춤형 프로그램으로 힐링하세요.",
  "출장 마사지 홈타이 전문. 경직된 몸을 시원하게 풀어주는 정통 스트레칭 케어.",
  "출장 마사지 프리미엄 서비스. 번거로운 이동 없이 집에서 편안하게 받는 바디케어.",
  "출장 마사지 전문점 안내. 청결하고 안전한 관리로 쾌적한 힐링을 보장합니다.",
  "출장 마사지 바디 릴렉싱 케어. 일상에 지친 현대인을 위한 맞춤 힐링 솔루션.",
  "출장 마사지 추천 제휴 샵 안내. 후기와 만족도가 증명하는 고품격 테라피.",
  "출장 마사지 심야 안심 방문. 늦은 시간에도 언제든 부담 없이 연락해 보세요.",
  "출장 마사지 감성 아로마 코스. 천연 에센셜 오일로 피부와 마음을 촉촉하게.",
  "출장 마사지 스피드 방문 예약. 전화 상담 후 가장 빠르게 도착하는 홈케어.",
  "출장 마사지 힐링의 새로운 기준. 편안함과 전문성을 모두 갖춘 프리미엄 서비스.",
  "출장 마사지 현장 카드/현금 후불제. 믿고 이용할 수 있는 투명한 케어 시스템.",
  "출장 마사지 림프 순환 테라피. 가벼워진 몸으로 일상에 활력을 더해드립니다.",
  "출장 마사지 1인 맞춤 케어. 고객님의 컨디션에 맞춘 맞춤형 압과 테크닉 적용.",
  "출장 마사지 쾌적한 홈테라피. 편안한 침대나 소파에서 안심하고 케어 받으세요.",
  "출장 마사지 명품 스웨디시 코스. 따뜻한 온기로 온몸을 녹여주는 감성 바디케어.",
  "출장 마사지 실속형 정찰제 안내. 거품 없는 착한 가격으로 만나는 고품격 테라피.",
  "출장 마사지 바디 밸런스 교정 케어. 균형 잡힌 바디 라인을 위한 힐링 프로그램.",
  "출장 마사지 믿을 수 있는 플랫폼. 검증된 한국인 테라피스트의 정성스러운 관리.",
  "출장 마사지 타이 & 아로마 복합 코스. 뭉친 근육 이완과 심신 안정을 동시에.",
  "출장 마사지 프리미엄 방문 서비스. 나만을 위한 가장 안락한 힐링 스튜디오.",
  "출장 마사지 빠른 도착 보장. 전지역 네트워크망으로 빠르게 방문합니다.",
  "출장 마사지 릴렉싱 테라피 예약. 피로에 지친 당신을 위한 완벽한 휴식 시간.",
  "출장 마사지 감동 서비스. 작은 부분까지 세심하게 배려하는 고품격 힐링 케어.",
  "출장 마사지 100% 현장 정산. 사기 걱정 없는 가장 신뢰할 수 있는 테라피 안내.",
  "출장 마사지 토탈 바디 솔루션. 하루 한 시간의 여유로 건강한 활력을 충전하세요.",
  "출장 마사지 감성 스웨디시 안내. 깃털처럼 부드러운 터치로 전신 긴장 해소.",
  "출장 마사지 전문 출장 방문. 원하는 시간대에 맞춰 방문하는 맞춤 테라피.",
  "출장 마사지 힐링 네트워크. 지역 최고 수준의 테라피스트들이 찾아갑니다.",
  "출장 마사지 순수 힐링 프로그램. 조용하고 차분한 분위기에서 즐기는 휴식.",
  "출장 마사지 스트레스 완화 코스. 뇌와 몸의 긴장을 풀어주는 명품 케어.",
  "출장 마사지 간편 예약 안내. 복잡한 절차 없이 터치 몇 번으로 손쉬운 예약.",
  "출장 마사지 바디 리셋 프로그램. 찌뿌둥한 하루를 활기차게 바꿔주는 손길.",
  "출장 마사지 안심 홈케어. 철저한 위생 관리로 늘 쾌적함을 선물합니다.",
  "출장 마사지 스웨디시 & 타이 안내. 취향에 따라 자유롭게 선택하는 힐링 코스.",
  "출장 마사지 VIP 고객 맞춤 케어. 오직 한 사람만을 위한 스페셜 테라피.",
  "출장 마사지 합리적인 가격 정책. 투명한 정찰제로 편안하게 경험하세요.",
  "출장 마사지 피로 회복의 명가. 숙련된 테크닉으로 묵은 결림을 말끔히 해결.",
  "출장 마사지 친절 방문 서비스. 밝은 미소와 정성으로 편안함을 드립니다.",
  "출장 마사지 딥티슈 테라피. 속근육까지 시원하게 풀어주는 집중 케어.",
  "출장 마사지 감성 힐링 스웨디시. 감각을 깨우는 프리미엄 전신 바디케어.",
  "출장 마사지 즉시 출발 서비스. 기다리는 지루함 없이 신속하게 방문합니다.",
  "출장 마사지 정직한 홈케어. 예약부터 방문까지 투명하게 안심하고 이용하세요.",
  "출장 마사지 수면 개선 힐링 코스. 깊은 숙면을 유도하는 릴렉싱 아로마 케어.",
  "출장 마사지 활력 충전 바디테라피. 무거운 어깨와 허리를 가볍게 케어합니다.",
  "출장 마사지 후불제 전문 플랫폼. 안전과 신뢰를 가장 중요하게 여깁니다.",
  "출장 마사지 프리미엄 홈타이 예약. 집에서도 수준 높은 타이 관리를 누려보세요.",
  "출장 마사지 맞춤 아로마 블렌딩. 피부 보습과 릴렉스를 함께 선사합니다.",
  "출장 마사지 신속 매칭 시스템. 계신 곳에서 가장 가까운 베스트 샵 안내.",
  "출장 마사지 명품 바디 솔루션. 하루하루 지친 당신을 위한 프라이빗 힐링.",
  "출장 마사지 스웨디시 정찰제 코스. 군더더기 없는 깔끔하고 품격 있는 케어.",
  "출장 마사지 전문 힐링 안내. 언제나 최상의 만족을 제공하는 방문 테라피.",
  "출장 마사지 야간 힐링 서비스. 밤낮 가리지 않고 고객님의 피로를 덜어드립니다.",
  "출장 마사지 투명한 후불 안내. 선입금 요구가 전혀 없는 정직한 시스템.",
  "출장 마사지 릴렉싱 케어의 정석. 몸의 균형을 되찾아주는 특별한 테라피.",
  "출장 마사지 웰니스 방문 프로그램. 일상의 질을 높여주는 건강한 바디케어.",
  "출장 마사지 스피드 힐링 예약. 계신 곳으로 바로 찾아가는 감동 서비스.",
  "출장 마사지 감성 테라피 코스. 섬세한 케어로 하루의 스트레스를 씻어내세요.",
  "출장 마사지 전신 풀케어 안내. 발끝부터 머리까지 가벼워지는 놀라운 경험.",
  "출장 마사지 홈 웰니스 1:1 방문. 쾌적한 나만의 쉼터에서 즐기는 테라피.",
  "출장 마사지 안심 예약 플랫폼. 정직하고 검증된 관리사들만 함께합니다.",
  "출장 마사지 프리미엄 감성 스웨디시. 하루를 완벽하게 보상받는 힐링 시간.",
  "출장 마사지 속근육 릴렉스 케어. 굳어있던 관절과 근육을 유연하게 풀어드립니다.",
  "출장 마사지 정통 아로마 테라피. 고급 천연 오일로 피부에 활력을 부여합니다.",
  "출장 마사지 100% 현장 결제 시스템. 처음부터 끝까지 안심할 수 있는 케어.",
  "출장 마사지 감동 힐링 파트너. 매일매일 상쾌한 아침을 맞이할 수 있도록 돕습니다.",
  "출장 마사지 힐링 라이프 안내. 내 손안에서 시작되는 가장 편안한 휴식.",
  "출장 마사지 고품격 방문 케어. 호텔 부럽지 않은 프리미엄 테라피를 집에서.",
  "출장 마사지 맞춤 압 조절 테라피. 나에게 꼭 맞는 최적의 힐링을 선사합니다.",
  "출장 마사지 스웨디시 & 홈타이 코스. 만족도 1위 제휴 샵에서 확인하세요.",
  "출장 마사지 안전 케어 솔루션. 고객님의 소중한 프라이버시를 철저히 지킵니다.",
  "출장 마사지 힐링 리포트. 매일매일 더 가볍고 활기찬 몸을 만들어 드립니다.",
  "출장 마사지 투명 정찰 방문제. 숨은 추가금 없이 정직하게 운영됩니다.",
  "출장 마사지 감성 전신 케어. 은은한 향과 따뜻한 손길로 전하는 감동의 휴식.",
  "출장 마사지 프리미엄 힐링 서비스. 100% 후불제로 부담 없이 예약해 보세요."
];

const priceHooks = [
  "건식 6만원부터 심야할증 없이 방문합니다.",
  "건식 7만원부터 심야할증 없이 방문합니다.",
  "스웨디시 8만원부터 추가비용 없이 방문합니다.",
  "아로마 7만원부터 합리적인 정찰제로 방문합니다.",
  "타이 6만원부터 현장 결제 후불제로 방문합니다."
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
  const { city, district, dong } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);

  // 100개 순환 인덱스 계산 (1년 중 현재 날짜 번호 + 지역 고유 문자코드 합산)
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)); // 1 ~ 365

  const locationKeyword = `${cityName}-${districtName}-${dongName}`;
  const charSum = locationKeyword.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // 0 ~ 99번까지 100개가 순차적으로 순환
  const titleIdx = (dayOfYear + charSum) % title100Patterns.length;
  const descIdx = (dayOfYear + charSum * 3) % desc100Patterns.length;
  const priceIdx = (dayOfYear + charSum * 7) % priceHooks.length;

  // 타이틀 구성: [동이름] [100개 타이틀 패턴 중 하나] | [사이트명]
  let finalTitle = `${dongName} ${title100Patterns[titleIdx]} | ${SITE_NAME}`;

  // '마사지'가 연속으로 중복되는 현상을 원천 방어
  finalTitle = finalTitle.replace(/(마사지\s*)+마사지/g, "마사지");

  // 디스크립션 구성: [시/도 구 동] 바로 뒤에 '출장 마사지'가 자연스럽게 연결
  const finalDescription = `${cityName} ${districtName} ${dongName} ${desc100Patterns[descIdx]} ${priceHooks[priceIdx]}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: `${SITE_URL}/${city}/${district}/${dong}` },
    keywords: [
      `${dongName} 마사지`,
      `${dongName} 출장 타이 마사지`,
      `${dongName} 스웨디시`,
      `${dongName} 홈타이`,
      `${districtName} 출장 아로마 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${dong}`,
      locale: "ko_KR",
      type: "website"
    }
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);
  const fullLocation = `${cityName} ${districtName} ${dongName}`;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 지역으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{dongName} 출장 마사지 & 프리미엄 테라피</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullLocation} 고객님을 위한 엄선된 출장 테라피 제휴 샵 안내입니다. 원하시는 샵을 선택해 코스 및 요금을 확인해 보세요.
          </p>
        </section>

        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">TOP PARTNER SHOPS</span>
            <h3 className="text-base md:text-xl font-black text-slate-900 mt-1">
              ✨ {dongName} BEST 추천 제휴 샵 (총 5곳)
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
                      <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold">{s.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/${city}/${district}/${dong}/shop/${s.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all"
                  >
                    상세 보기 &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}