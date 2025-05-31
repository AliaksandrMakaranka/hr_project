export interface City {
  id: number;
  name: string;
  vacanciesCount: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
} 