import React from 'react';
import App from '../App';
import { shallow, mount, configure } from 'enzyme';
import NavBar from '../Containers/NavBar';
import HomePage from '../Containers/HomePage';

describe('App', () => {
  let wrapper;
  let wrap;

  beforeEach(() => {
    wrapper = shallow(<App />);
     wrap = mount(<App />);    
  });

  test('renders main App div', () => {
    expect(wrapper.exists('.App')).toEqual(true);
  });

  test('renders NavBar in main App div', () => {
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(true);
  });

  test('renders HomePage in App div', () => {
    expect(wrapper.containsMatchingElement(<HomePage />)).toEqual(true);
  });


});