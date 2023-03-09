import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = props => {
  useEffect(() => {
    window.addEventListener('keydown', handlePressEsc);
    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePressEsc(event) {
    if (event.code === 'Escape') {
      props.onClose();
    }
  }

  function handleClickBackdrop(event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  const { selectedImage, tags } = props;

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <Modal>
        <img src={selectedImage} alt={tags} />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

ModalWindow.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
