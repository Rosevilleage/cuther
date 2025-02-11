interface PlaceNameResponse {
  name: string;
  code: {
    id: string;
    type: 'L' | 'A' | 'S';
    mappingId: string;
  };
  region: {};
}
