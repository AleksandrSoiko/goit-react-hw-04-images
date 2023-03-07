import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field } from 'formik';
import {
  Header,
  Form,
  FormField,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './SearchBar.styled';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = () => {
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter the word');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  CustomInputComponent = props => (
    <Input
      type="text"
      name="searchQuery"
      placeholder="Search images and photos"
      onChange={this.handleChange}
    />
  );

  render() {
    return (
      <Header>
        <Formik
          initialValues={{ searchQuery: '' }}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <FormField>
              <Field as={this.CustomInputComponent} />
            </FormField>
            <SearchButton type="submit">
              <SearchButtonLabel>Search</SearchButtonLabel>
            </SearchButton>
          </Form>
        </Formik>
      </Header>
    );
  }
}
