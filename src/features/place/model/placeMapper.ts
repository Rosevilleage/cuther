import {Place} from '../../../entitites/place';

export function placeDTOToEntity(data: PlaceResponse): Place {
  const result = data.results[0];
  const rootRegion = result.region.area0.name;
  const topRegion = result.region.area1.name;
  const middleRegion = result.region.area2.name;

  return {
    rootRegion,
    topRegion,
    middleRegion,
  };
}
