import api from "@/app/api/api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchRecommendedPosts = async ({
  category,
  startDate,
  endDate,
  sortBy,
  order,
}: {
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const params: Record<string, string> = {};

    if (category && category !== "전체") {
      params.category = encodeURIComponent(category.trim());
    }
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const token = getToken();
    console.log("🚀 ~ token:", token);

    const response = await api.get("/api/boards/liked", {
      params,
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const fetchParticipatedPosts = async ({
  category = "GUIDE", // 기본값을 "review"로 설정
  startDate,
  endDate,
  sortBy,
  order,
}: {
  category?: string | null;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const params: Record<string, string> = {};

    params.category =
      category && category !== "GUIDE"
        ? encodeURIComponent(category.trim())
        : "GUIDE";

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const token = getToken();

    const response = await api.get("/api/boards/participated", {
      params,
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

/* 기본 api 함수 */
export const fetchData = async ({
  category,
  startDate,
  endDate,
  sortBy,
  order,
}: {
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const params: Record<string, string> = {};

    if (category && category !== "전체") {
      params.category = encodeURIComponent(category.trim());
    }
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const response = await api.get("/api/boards", { params });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
