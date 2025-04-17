const CHARACTER_TYPES = [
  {
    type: 1 as const,
    title: '28도 이상',
    description: '민소매, 반팔, 반바지, 짧은 치마 등',
  },
  {
    type: 2 as const,
    title: '23~27도',
    description: '반팔, 반바지, 얇은 셔츠, 면바지 등',
  },
  {
    type: 3 as const,
    title: '20~22도',
    description: '블라우스, 긴팔 티, 면바지, 슬랙스 등',
  },
  {
    type: 4 as const,
    title: '17~19도',
    description: '얇은 가디건, 니트, 맨투맨, 후드, 긴바지 등',
  },
  {
    type: 5 as const,
    title: '12~16도',
    description: '자켓, 가디건, 청자켓, 니트, 스타킹, 청바지 등',
  },
  {
    type: 6 as const,
    title: '9~11도',
    description: '트렌치 코드, 야상, 점퍼, 스타킹, 기모바지 등',
  },
  {
    type: 7 as const,
    title: '5~8도',
    description: '울 코드, 히트텍, 가죽자켓, 레깅스 등',
  },
  {
    type: 8 as const,
    title: '5도 미만',
    description: '패딩, 두꺼운 코트, 기모제품, 목도리 등',
  },
];

export {CHARACTER_TYPES};
