import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, preview, selectedImage }) => {
  return (
    <GalleryItem>
      <GalleryImage src={preview} alt={tags} onClick={selectedImage} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
