import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGalleryList = ({ images, selectedImage }) => {
  return (
    <ImageGallery>
      {images.map(({ webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={largeImageURL}
            preview={webformatURL}
            tags={tags}
            selectedImage={() => selectedImage(largeImageURL, tags)}
          />
        );
      })}
    </ImageGallery>
  );
};

ImageGalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  selectedImage: PropTypes.func,
};
