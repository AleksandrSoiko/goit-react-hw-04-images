import { Component } from 'react';
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

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImage: null,
    alt: null,
    status: 'idle',
    error: null,
  };
  totalHits = null;

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const imageData = await fetchAPI(searchQuery, page);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning('No results', { position: 'top-center' });
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: 'resolved',
        }));

        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleSubmitForm = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  onSelectedImg = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    const { images, status, selectedImage, alt, error } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmitForm} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {status === 'pending' && <Spinner />}
        {error && <ErrorText message={error.message} />}
        {images.length > 0 && (
          <ImageGalleryList
            images={images}
            selectedImage={this.onSelectedImg}
          />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <LoadMoreButton onClick={this.incrementPage} />
        )}
        {selectedImage !== null && (
          <ModalWindow
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
      </Container>
    );
  }
}
