import React from "react";
import renderer, { act } from 'react-test-renderer';
import IsPaidFilter from "../../../../app/javascript/components/Filter/IsPaidFilter";

describe('IsPaidFilter Component', () => {
  // Test for initial rendering
  test('isPaidFilter Load', () => {
    const component = renderer.create(
      <IsPaidFilter isPaidFilterSelected={jest.fn()} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test for interaction: changing the select value
  test('onChange event of select', () => {
    const mockIsPaidFilterSelected = jest.fn();
    const component = renderer.create(
      <IsPaidFilter isPaidFilterSelected={mockIsPaidFilterSelected} />
    );

    // Simulating selection change to 'Yes'
    act(() => {
      component.root.findByType('select').props.onChange({ target: { value: 'Yes' } });
    });

    // Expect the prop function to be called with the value 'Yes'
    expect(mockIsPaidFilterSelected).toHaveBeenCalledWith('Yes');

    // Simulating selection change to 'No'
    act(() => {
      component.root.findByType('select').props.onChange({ target: { value: 'No' } });
    });

    // Expect the prop function to be called with the value 'No'
    expect(mockIsPaidFilterSelected).toHaveBeenCalledWith('No');

    // Add more tests for different values if needed
  });

  // Additional tests for other options...
});
