import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import {
  Header,
  Form,
  FormField,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './SearchBar.styled';
import { useState } from 'react';

export const SearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = () => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter the word');
      return;
    }
    props.onSubmit(searchQuery);
  };
  return (
    <Header>
      <Formik initialValues={searchQuery} onSubmit={handleSubmit}>
        <Form>
          <FormField>
            <Input
              type="text"
              name="searchQuery"
              placeholder="Search images and photos"
              onChange={handleChange}
            />
          </FormField>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>
        </Form>
      </Formik>
    </Header>
  );
};
