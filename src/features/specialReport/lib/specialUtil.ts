export function getStnId(region: string) {
  switch (region) {
    case '서울특별시':
    case '인천광역시':
    case '경기도':
      return 109;
    case '부산광역시':
    case '울산광역시':
    case '경상남도':
      return 159;
    case '대구광역시':
    case '경상북도':
      return 143;
    case '광주광역시':
    case '전라남도':
      return 156;
    case '전라북도':
    case '전북특별자치도':
      return 146;
    case '대전광역시':
    case '세종특별자치시':
    case '세종시':
    case '충청남도':
      return 133;
    case '충청북도':
      return 131;
    case '강원특별자치도':
    case '강원도':
      return 105;
    case '제주특별자치도':
      return 184;
    default:
      return;
  }
}
