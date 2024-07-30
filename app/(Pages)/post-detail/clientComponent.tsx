'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/Post/PostDetail/breadcrumb';
import useModal from '@/components/Post/PostDetail/modal/modal';
import { useRouter } from 'next/navigation';
import TravelBar from '@/components/Post/PostDetail/TravelBar';
import { ProfilePost } from '@/components/Post/PostDetail/profilePost';
import { IconButton } from '@/components/Post/PostDetail/iconButton';
import formatDateString from '@/components/Post/PostDetail/formatDateString';
import { translateCategory } from '@/components/Post/PostView/translateCategory';
import { ClientComponentProps, Props } from '@/components/Post/PostDetail/interfaces';

import api from '@/app/api/api';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const InfoTable = (data: any) => {
  const board = data;
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-24 pb-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900">{board.data.title}</h1>
          <p className="mb-8 text-xl leading-relaxed">{board.data.summary}</p>
        </div>
      </div>
    </section>
  );
};

const translationGender: any = {
  ALL: '무관',
  FEMALE: '여성',
  MALE: '남성',
};

const translateGender = (gender: any) => {
  return translationGender[gender] || gender;
};

const DetailsTable = (data: any) => {
  const trip = data;
  return (
    <div>
      <table className="min-w-80 bg-white border border-gray-200">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">연령</td>
            <td className="py-2 px-4 border-b">
              {trip.data.ageMin}~{trip.data.ageMax} 대
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">참여인원</td>
            <td className="py-2 px-4 border-b">
              {trip.data.participantCount}/{trip.data.targetNumber}명
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">성별</td>
            <td className="py-2 px-4 border-b">{translateGender(trip.data.gender)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TogetherBtn = ({ onClick, label }: any) => {
  return (
    <button
      className="px-4 py-2 text-white rounded"
      style={{ backgroundColor: '#c3d8e6', width: '30%' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const isUserSame = (currentUserId: number, postUserId: number): boolean => {
  return currentUserId === postUserId;
};

/* 전체 조회 - GET */
const fetchData = async (postId: number): Promise<Props['data'][]> => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.get(`/api/boards/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

// const userToken = getToken();
// const currentUserId = () => {
//   if (userToken) {
//     const decoded: any = jwtDecode(userToken);
//     return decoded.userId;
//   } else {
//     console.error("No token found in session storage.");
//   }
// };

/*   clientComponent  */
const ClientComponent = ({ postId }: ClientComponentProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal, ModalWrapper } = useModal();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Props['data'][] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // let currentUserId = 123;
  // const postUserId = data[0].board.userId;
  // const result = isUserSame(currentUserId, postUserId);

  const handlePostClick = () => {
    router.push(`/post-edit/${postId}`);
  };
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    console.log('🚀 ~ handleDelete ~ token:', token);
    console.log('🚀 ~ handleDelete ~ postId:', postId);

    try {
      if (token) {
        await api.delete(`/api/boards/${postId}`, {
          headers: { Authorization: token },
        });
        console.log('Post deleted successfully');
        router.push('/post-view');
      } else {
        console.error('No token found.');
      }
    } catch (error: any) {
      console.error('Failed to delete the post:', error);
      setError(error.response?.data?.message || 'Failed to delete the post');
    }
  };

  /* 전체 조회 - GET */
  const getData = async () => {
    try {
      const responseData = await fetchData(postId);
      setData(responseData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!modalOpen) {
      console.log('🚀 ~ ClientComponent ~ modalOpen:', modalOpen);
      getData();
    }
  }, [postId, modalOpen]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { board, route, trip, likeStatus }: any = data;

  const tripId = trip.id;

  if (!data) return <div>No data available</div>;

  const token = localStorage.getItem('token');

  /*여행 취소 - delete 요청 */
  const onCancel = async () => {
    try {
      await api.delete(`/api/attend/${tripId}`, {
        headers: { Authorization: token },
      });
      console.log('참여취소 성공');
    } catch (error: any) {
      console.error('참여 취소 중 오류 발생:', error);
    }
  };

  let tripParticipantCount = trip.participantCount;
  let tripTargetNumber = trip.targetNumber;
  const result = isUserSame(tripTargetNumber, tripParticipantCount);

  if (!board || !route || !trip) {
    return <div>Some data is missing</div>;
  }

  const startDate = formatDateString(route.startAt ?? '');
  const endDate = formatDateString(route.endAt ?? '');
  return (
    <>
      <div className="flex flex-col space-y-4 m-6">
        <BreadcrumbWithCustomSeparator />
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-grow">
            <div className="mr-4">
              {startDate}~{endDate}
            </div>
            <div style={{ backgroundColor: '#c3d8e6' }} className="border px-2 text-white rounded">
              {translateCategory(board.category)}
            </div>
          </div>
          <div className="flex">
            {/* {result && (
              <>
                <IconButton
                  src="/svg/write-icon.svg"
                  alt="글쓰기버튼"
                  onClick={handlePostClick}
                />
                <IconButton src="/svg/trash.svg" alt="삭제버튼" />
              </>
            )} */}
            <IconButton src="/svg/write-icon.svg" alt="글쓰기버튼" onClick={handlePostClick} />
            <IconButton src="/svg/trash.svg" alt="삭제버튼" onClick={handleDelete} />
          </div>
        </div>

        <div className="flex justify-around">
          <InfoTable data={board} />
          <div className="flex flex-col pt-24  ">
            {/* {!result && (
              <>
                <DetailsTable data={data[0]} />
                <div className="flex items-center justify-center mt-4">
                  <TogetherBtn onClick={openModal} />
                  <TogetherBtn
                    onClick={() => {
                      openModal();
                      setModalOpen(true); 
                    }}
                  />
                </div>
              </>
            )} */}
            <DetailsTable data={trip} />
            <div className="flex items-center justify-center mt-4">
              {!result && (
                <TogetherBtn
                  onClick={() => {
                    openModal();
                    setModalOpen(true);
                  }}
                  label="참여신청"
                />
              )}
              {result && <TogetherBtn onClick={onCancel} label="참여취소" />}
            </div>
          </div>
        </div>
        <div className="border items-center">
          <TravelBar route={route} />
        </div>

        <ProfilePost data={board} likeStatus={likeStatus} getData={getData} />
      </div>
      <ModalWrapper
        tripId={tripId}
        content={trip.participantCount}
        onClose={() => {
          closeModal();
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default ClientComponent;
