import api from "@/app/api/api";
import Image from "next/image";
import React, { useState } from "react";

// 모달 컴포넌트
const Modal = ({ isOpen, onClose, title, content, tripId }: any) => {
  console.log("🚀 ~ Modal ~ tripId:", tripId);
  if (!isOpen) return null;

  const [participants, setParticipants] = useState(1);
  const [hasJoined, setHasJoined] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  /*여행 참가 - post 요청 */
  const onJoin = async () => {
    try {
      const token = getToken();

      if (token) {
        await api.post(
          `/api/attend/${tripId}`,
          { participants },
          {
            headers: { Authorization: token },
          }
        );

        setHasJoined(true);
        setIsFailed(false);
      }
    } catch (error: any) {
      //이거 메세지 어떻게 받는지 확인하고 다시 넣기
      if (error.response?.data?.message === "신청 마감") {
        setIsFailed(true);
        setHasJoined(false);
      } else {
        console.error("참여 신청 중 오류 발생:", error);
        setIsFailed(true);
        setHasJoined(false);
      }
    }
  };

  /*여행 취소 - delete 요청 */
  const onCancel = async () => {
    try {
      const token = getToken();

      if (token) {
        await api.delete(`/api/attend/${tripId}`, {
          headers: { Authorization: token },
        });

        setHasJoined(false);
        setIsFailed(false);
      }
    } catch (error: any) {
      console.error("참여 취소 중 오류 발생:", error);
      setIsFailed(true);
      setHasJoined(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src="/svg/close.svg" alt="닫기-버튼" width="20" height="20" />
        </button>
        {!hasJoined && !isFailed ? (
          <>
            <h2 className="text-xl mb-4">같이 여행을 떠나요!</h2>

            <p className="mb-4">현재 인원: {content}명</p>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-3">참여인원: {participants}</div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 border rounded" onClick={onClose}>
                  취소
                </button>
                <button
                  className="px-4 bg-slate-500 text-white rounded"
                  onClick={onJoin}
                >
                  참여
                </button>
              </div>
            </div>
          </>
        ) : hasJoined ? (
          <>
            <h2 className="text-xl mb-4">참여 신청이 완료되었습니다!</h2>
            <p className="mb-4">현재 참여인원: {content}명</p>
            <button className="px-4 border rounded" onClick={onCancel}>
              취소
            </button>
          </>
        ) : isFailed ? (
          <>
            <h2 className="text-xl mb-4">참여 신청이 마감되었습니다.</h2>
            <p className="mb-4">다음 기회에 함께 해요!</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const ModalWrapper = ({ title, content, tripId }: any) => (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
      content={content}
      tripId={tripId}
    />
  );

  return { isOpen, openModal, closeModal, ModalWrapper };
};

export default useModal;
