import {XMLParser} from 'fast-xml-parser';

export function getErrorMessage(resultCode: string):
  | {
      title: string;
      message: string;
    }
  | undefined {
  switch (resultCode) {
    case '03': // NODATA_ERROR: 데이터없음 에러
    case '02': // DB_ERROR: 데이터베이스 에러
    case '04': // HTTP_ERROR: HTTP 에러
    case '05': // SERVICETIME_OUT: 서비스 연결실패 에러
    case '20': // SERVICE_ACCESS_DENIED_ERROR: 서비스 접근거부
      return {
        title: '일시적인 서비스 오류',
        message:
          '현재 날씨 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };

    case '01': // APPLICATION_ERROR: 어플리케이션 에러 base_date,base_time 형식 오류
    case '10': // INVALID_REQUEST_PARAMETER_ERROR: 잘못된 요청 파라미터 에러
    case '11': // NO_MANDATORY_REQUEST_PARAMETERS_ERROR: 필수요청 파라미터가 없음
    case '12': // NO_OPENAPI_SERVICE_ERROR: 해당 오픈API서비스가 없거나 폐기됨
      return {
        title: '서비스 오류',
        message:
          '서비스에 문제가 발생하여 현재 날씨 정보를 제공할 수 없습니다. 빠른 시일 내에 해결하도록 하겠습니다.',
      };

    // LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR: 서비스 요청제한횟수 초과에러
    case '22':
      // return {
      //   title: '서비스 요청 제한 초과',
      //   message:
      //     '기상청으로의 날씨 요청가능 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.',
      // };
      return {
        title: '서비스 오류',
        message:
          '서비스에 문제가 발생하여 현재 날씨 정보를 제공할 수 없습니다. 빠른 시일 내에 해결하도록 하겠습니다.',
      };
    // TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR: 일시적으로 사용할 수 없는 서비스 키
    case '21':
      return process.env.NODE_ENV === 'development'
        ? {
            title: '일시적인 서비스 오류',
            message:
              '현재 서비스를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.',
          }
        : undefined;
    // SERVICE_KEY_IS_NOT_REGISTERED_ERROR: 등록되지 않은 서비스키
    case '30':
      return process.env.NODE_ENV === 'development'
        ? {
            title: '일시적인 서비스 오류',
            message:
              '등록되지 않은 서비스 키입니다. 서비스 설정을 확인해주세요.',
          }
        : undefined;
    // DEADLINE_HAS_EXPIRED_ERROR: 기한만료된 서비스키
    case '31':
      return process.env.NODE_ENV === 'development'
        ? {
            title: '서비스 키 만료',
            message: '기한이 만료된 서비스 키입니다. 새로운 키로 갱신해주세요.',
          }
        : undefined;
    // UNREGISTERED_IP_ERROR: 등록되지 않은 IP
    case '32':
      return process.env.NODE_ENV === 'development'
        ? {
            title: '등록되지 않은 IP',
            message:
              '등록되지 않은 IP 주소로의 접근입니다. 서비스 제공자에게 문의해주세요.',
          }
        : undefined;
    // UNSIGNED_CALL_ERROR: 서명되지 않은 호출
    case '33':
      return process.env.NODE_ENV === 'development'
        ? {
            title: '인증되지 않은 호출',
            message:
              '인증되지 않은 호출입니다. 서비스 설정을 확인하거나 관리자에게 문의해주세요.',
          }
        : undefined;
    // UNKNOWN_ERROR: 기타에러
    case '99':
      return {
        title: '알 수 없는 오류',
        message: '예기치 않은 오류가 발생했습니다. 관리자에게 문의해주세요.',
      };
  }
}

interface ErrorHandlerProps {
  error: {
    resultCode: string;
    resultMsg: string;
  };
  apiName: string;
}
export function getApiError({error, apiName}: ErrorHandlerProps) {
  const errorInfo = getErrorMessage(error.resultCode);
  if (process.env.NODE_ENV === 'development') {
    console.log(`${apiName} 에러 발생 :`, errorInfo);
  }
  return errorInfo;
}

const xmlParser = new XMLParser();

export function parseXml(xml: string) {
  return xmlParser.parse(xml);
}

export interface WeatherXMLToJSONResponse {
  OpenAPI_ServiceResponse: {
    cmmMsgHeader: {
      errMsg: string;
      returnAuthMsg: string;
      returnReasonCode: number;
    };
  };
}
