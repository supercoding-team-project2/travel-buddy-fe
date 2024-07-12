import React from 'react';

interface Props {
  isDeleteOpen: boolean
}
const CourseDeleteModal: React.FC<Props> = ({isDeleteOpen}) => {

  if(isDeleteOpen) return null;

  return (
    
    <div>
      
    </div>
  );
};

export default CourseDeleteModal;