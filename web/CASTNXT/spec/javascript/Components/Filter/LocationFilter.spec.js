import React from 'react';
import LocationFilter from "../../../../app/javascript/components/Filter/LocationFilter";
import renderer, { act } from 'react-test-renderer';

test('Component Load for LocationFilter', () => {
    const mockHandleLocationFilterChange = jest.fn();
    const component = renderer.create(
        <LocationFilter handleLocationFilterChange={mockHandleLocationFilterChange} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('State Selection', () => {
    const mockHandleLocationFilterChange = jest.fn();
    const component = renderer.create(
        <LocationFilter handleLocationFilterChange={mockHandleLocationFilterChange} />
    );

    // Simulate state selection
    act(() => {
        component.root.findByProps({ name: 'stateName' }).props.onChange({ target: { value: 'Texas' } });
    });

    // Check if handleLocationFilterChange is called correctly
    expect(mockHandleLocationFilterChange).toHaveBeenCalledWith('Texas', null); // Assuming null as initial city value
});

test('City Selection', () => {
    const mockHandleLocationFilterChange = jest.fn();
    const component = renderer.create(
        <LocationFilter handleLocationFilterChange={mockHandleLocationFilterChange} />
    );

    // Set the state to a specific value
    act(() => {
        component.root.findByProps({ name: 'stateName' }).props.onChange({ target: { value: 'Texas' } });
    });

    // Simulate city selection
    act(() => {
        component.root.findByProps({ name: 'location' }).props.onChange({ target: { value: 'Austin' } });
    });

    // Check if handleLocationFilterChange is called correctly
    expect(mockHandleLocationFilterChange).toHaveBeenCalledWith('Texas', 'Austin');
});
