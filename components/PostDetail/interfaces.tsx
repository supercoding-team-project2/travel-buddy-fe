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

export interface Props {
  data: {
    board: Board;
    trip: Trip;
    route: Route;
  };
}
