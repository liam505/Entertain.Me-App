import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { findByTestAttr } from '../test/testUtils';
import SearchBar from '../Components/SearchBar';

/**
 * Factory function to create a ShallowWrapper for the Congrats componenent
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

describe('SearchBar', () => {
    
    const setup = (props={userId:null}) => {
        return shallow(<SearchBar />)
    }    
    
    it('Should render SearchBar div without error', () => {
        const wrapper = setup()
        const component = findByTestAttr(wrapper, 'searchbar_component');
        expect(component.length).toBe(1);
    })

    // it('Should handle search if text input', () => {
    //     const wrapper = setup()
    //     const handleSearch = jest.fn();


    //     ReactTestUtils.Simulate.change(input, {target: {value: 'test'}});
    //     expect(handleSearch).toHaveBeenCalledWith('test')
    // })

})