import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class ModalWindow extends Component {
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <Modal>
          <img src={selectedImage} alt={tags} />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
