import {Region} from './geoLocationStore';

export function geoLocationDTOToEntity(data: GeoLocationResponse): Region {
  const result = data.results[0];
  const area0 = result.region.area0.name;
  const area1 = result.region.area1.name;
  const area2 = result.region.area2.name;
  const area3 = result.region.area3.name;
  const area4 = result.region.area4.name;

  return {
    area0,
    area1,
    area2,
    area3,
    area4,
  };
}
