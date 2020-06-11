import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount } from 'enzyme';
import HomePage from '../Containers/HomePage';
import SearchBar from '../Components/SearchBar';
import FavouriteMovies from '../Components/FavouriteMovies';
import renderer from 'react-test-renderer';
import { findByTestAttr } from '../test/testUtils';


describe('<HomePage />', () => {
    
    const essentialProps = {
        userID: null,
        movieData:false,
    }

    let componentWithProps = <HomePage {...essentialProps}/>
    let wrapper;

    beforeEach(() => wrapper = shallow(componentWithProps));

    it('should mount to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(componentWithProps, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(componentWithProps)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render a single <div /> if state movieData', () => {
        wrapper.setState({movieData: true})
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render <FavouriteMovies /> if props userId not null', () => {
        
    });
    


})