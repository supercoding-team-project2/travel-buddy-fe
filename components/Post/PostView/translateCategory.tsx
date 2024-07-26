const category: any = {
  GUIDE: "가이드",
  REVIEW: "후기",
  COMPANION: "동행",
};

export const translateCategory = (categoryEnum: string) => {
  return category[categoryEnum] || categoryEnum;
};
