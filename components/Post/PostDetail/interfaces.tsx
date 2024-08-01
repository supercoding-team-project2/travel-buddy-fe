export interface Board {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  likeCount: number;
  images: string[];
  userId: number; //유저 아이디가 넘버로 설정... 나중에 스트링으로 올 수도 있음
  userPhoto: string;
}

export interface Trip {
  ageMin: number;
  ageMax: number;
  targetNumber: number;
  participantCount: number;
  gender: string;
  userId: number; //유저 아이디가 넘버로 설정... 나중에 스트링으로 올 수도 있음
  id: number;
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

export interface ClientComponentProps {
  postId: number;
}
