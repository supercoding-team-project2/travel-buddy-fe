export interface Board {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  likeCount: number;
  images: string[];
}

export interface Trip {
  ageMin: number;
  ageMax: number;
  targetNumber: number;
  participantCount: number;
  gender: string;
}

export interface Place {
  placeName: string;
  placeCategory: string;
}

export interface RouteDetails {
  [date: string]: Place[];
}

export interface Route {
  startAt: string;
  endAt: string;
  routeDetails: RouteDetails;
}

export interface TripData {
  tripName: string;
  board: {
    id: number;
    title: string;
    summary: string;
    content: string;
    category: string;
    author: string;
    likeCount: number;
    images: string[];
  };
  route: {
    startAt: string;
    endAt: string;
    routeDetails: RouteDetails;
  };
  trip: {
    ageMin: number;
    ageMax: number;
    targetNumber: number;
    participantCount: number;
    gender: string;
  };
}

export interface Props {
  data: TripData[]; // 여러 여행 데이터를 포함하도록 배열 타입으로 변경
}
