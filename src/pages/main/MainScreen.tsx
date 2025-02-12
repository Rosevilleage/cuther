import React, {useEffect} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import CurrentDisplay from './CurrentDisplay';
// import {getPlaceName, getWetherData} from '../../services/fetcher';

export default function MainScreen() {
  // const [region, setRegion] = useState('');
  useEffect(() => {
    Geolocation.getCurrentPosition(async position => {
      try {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        if (latitude && longitude) {
          //   const params = {
          //     serviceKey: process.env.API_KEY as string,
          //     numOfRows: 10,
          //     pageNo: 1,
          //     dataType: 'JSON',
          //     base_date: '20250203',
          //     base_time: '2030',
          //     nx: 55,
          //     ny: 127,
          //   };
          //   console.log(params);
          //   const data = await fetcher.get('/getUltraSrtFcst', {params});
          // console.log('fetch');
          // const wetherData = await getWetherData('/getUltraSrtFcst', {
          //   base_date: '20250203',
          //   base_time: '2030',
          //   nx: 55,
          //   ny: 127,
          // });
          // console.log(wetherData.data);
          // const placeData = await getPlaceName(latitude, longitude).then(res=>res.data);
          // console.log(placeData);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const {width, height} = useWindowDimensions();
  return (
    <ScrollView style={{width, height}}>
      {/* currentDisplay */}
      <CurrentDisplay />
      {/* 초단기 */}
      {/* <ScrollView horizontal>{}</ScrollView> */}
      {/* 단기 */}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {},
// });
