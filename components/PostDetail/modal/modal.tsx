import Image from "next/image";
import React, { useState } from "react";

// 모달 컴포넌트
const Modal = ({ isOpen, onClose, title, content }: any) => {
  if (!isOpen) return null;

  const [participants, setParticipants] = useState(1);
  const [hasJoined, setHasJoined] = useState(false);

  const decreaseparticipant = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };

  const increaseparticipant = () => {
    // if (participants < maxParticipants) {
    //     setParticipants(participants + 1);
    // }
    setParticipants(participants + 1);
  };

  const onJoin = () => {
    setHasJoined(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src="/svg/close.svg" alt="닫기-버튼" width="20" height="20" />
        </button>
        {!hasJoined ? (
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
        ) : (
          <>
            <h2 className="text-xl mb-4">참여 신청이 완료되었습니다!</h2>
            <p className="mb-4">현재 참여인원: {content}명</p>
            <h2 className="text-xl mb-4">참여 신청이 마감되었습니다.</h2>
            <p className="mb-4">다음 기회에 함께 해요!</p>
          </>
        )}
      </div>
    </div>
  );
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const ModalWrapper = ({ title, content }: any) => (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
      content={content}
    />
  );

  return { isOpen, openModal, closeModal, ModalWrapper };
};

export default useModal;
