import { useEffect, useState, useRef } from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAPI } from 'components/serviseAPI/API';
import { Spinner } from 'components/Loader/Loader';
import { ErrorText } from 'components/Error/Error';
import { ImageGalleryList } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/Button/Button';
import { ModalWindow } from 'components/Modal/Modal';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const prevSearchQuerryRef = useRef();
  const prevPageRef = useRef();

  let totalHits = null;

  const fetchImage = async () => {
    if (
      prevPageRef.current !== page ||
      prevSearchQuerryRef.current !== searchQuery
    ) {
      setStatus('pending');
    }
    try {
      const imageData = await fetchAPI(searchQuery, page);
      totalHits = imageData.total;
      const imagesHits = imageData.hits;
      if (!imagesHits.length) {
        toast.warning('No results', { position: 'top-center' });
      }
      setImages(prevImages => [...prevImages, ...imagesHits]);
      setStatus('resolved');

      if (page > 1) {
        const CARD_HEIGHT = 300;
        window.scrollBy({
          top: CARD_HEIGHT * 2,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      toast.error(`Sorry something went wrong. ${error.message}`);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImage();
      prevPageRef.current = page;
      prevSearchQuerryRef.current = searchQuery;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
  };

  const handleSubmitForm = searchQuery => {
    // console.log(searchQuery);
    if (prevSearchQuerryRef.current === searchQuery) {
      return;
    }
    resetState();
    setSearchQuery(searchQuery);
  };

  const onSelectedImg = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmitForm} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === 'pending' && <Spinner />}
      {error && <ErrorText message={error.message} />}
      {images.length > 0 && (
        <ImageGalleryList images={images} selectedImage={onSelectedImg} />
      )}
      {images.length > 0 && images.length !== totalHits && (
        <LoadMoreButton onClick={incrementPage} />
      )}
      {selectedImage !== null && (
        <ModalWindow
          selectedImage={selectedImage}
          tags={alt}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};
