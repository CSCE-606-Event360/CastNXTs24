import React from "react";
import CategoryFilter from "../../../../app/javascript/components/Filter/CategoryFilter";
import renderer, { act } from 'react-test-renderer';

describe('CategoryFilter Component', () => {
  // Test for initial rendering
  test('CategoryFilter Load', () => {
    const component = renderer.create(
      <CategoryFilter categoryFilterValueSelected={jest.fn()} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test for interaction: changing the select value
  test('onChange event of select', () => {
    const mockCategoryFilterValueSelected = jest.fn();
    const component = renderer.create(
      <CategoryFilter categoryFilterValueSelected={mockCategoryFilterValueSelected} />
    );

    // Simulating selection change
    act(() => {
      component.root.findByType('select').props.onChange({ target: { value: 'Fashion' } });
    });

    // Expect the prop function to be called with the new value
    expect(mockCategoryFilterValueSelected).toHaveBeenCalledWith('Fashion');

    // You can repeat the act and expect statements for different values if needed
  });

  // Additional tests for other options...
});
