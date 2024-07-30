export interface ButtonOutlineProps {
  text: string;
  onClick: any;
}

export interface Post {
  id: number;
  categoryEnum: string;
  title: string;
  summary: string;
  author: string;
  startAt: string;
  endAt: string;
  representativeImage: string;
  likeCount: number;
}
