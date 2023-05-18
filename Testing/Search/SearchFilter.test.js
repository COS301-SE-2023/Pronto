import React from "react";
import { render } from '@testing-library/react-native';
import SearchFilter from "../../components/SearchFilter";
import { fireEvent } from "@testing-library/react-native";

describe('SearchFilter', () => {
    //DATA to be used for testing
    const data = [
        { code: 'ABC', name: 'Module ABC' },
        { code: 'DEF', name: 'Module DEF' },
        { code: 'GHI', name: 'Module GHI' },
    ];

    //mock function to be used for testing
    const addToModules = jest.fn();

    //test that the component renders correctly and that the texts are null
    test('renders correctly with empty input', () => {
        const { queryByText } = render(
            <SearchFilter data={data} input="" setInput={() => {}} addToModules={addToModules} />
        );
        expect(queryByText('DEF : Module DEF')).toBeNull(); //test a module that is not in the list of modules
        expect(queryByText('GHI : Module GHI')).toBeNull();
        //test a module that is in the list of modules COS301 Software Engineering III
        expect(queryByText('COS301 : Software Engineering III')).toBeNull();

    });

    //test that the component renders correctly and that the texts are not null and those that are to be null
    test('renders correctly with non-empty input', () => {
        const { queryByText } = render(
            <SearchFilter data={data} input="AB" setInput={() => {}} addToModules={addToModules} />
        );
        expect(queryByText('ABC : Module ABC')).not.toBeNull(); //test a module that is in the list of modules
        expect(queryByText('DEF : Module DEF')).toBeNull();
        expect(queryByText('GHI : Module GHI')).toBeNull(); //test a module that is not in the list of modules
    });

    // test the addToModules function is called when a card is pressed
    test('calls addToModules when a card is pressed', () => {
        const { getByText } = render(
            <SearchFilter data={data} input="AB" setInput={() => {}} addToModules={addToModules} />
        );
        fireEvent.press(getByText('ABC : Module ABC'));
        expect(addToModules).toHaveBeenCalledWith(data[0]); //test that the addToModules function is called with the correct data
    });




});
