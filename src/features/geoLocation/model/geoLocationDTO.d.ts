type AreaN = `area${0 | 1 | 2 | 3 | 4}`;

interface GeoLocationResponse {
  results: {
    code: {
      id: string;
      type: string;
      mappingId: string;
    };
    name: string;
    region: {
      [key in AreaN]: {
        name: string;
        coords: {
          center: {
            crs: string;
            x: number;
            y: number;
          };
        };
      };
    };
  }[];
  status: {
    code: number;
    message: string;
    name: string;
  };
}
