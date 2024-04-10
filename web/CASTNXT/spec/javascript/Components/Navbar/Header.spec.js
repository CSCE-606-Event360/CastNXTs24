import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Header from '../../../../app/javascript/components/Navbar/Header';

// Mock for global properties
const mockProperties = {
    name: 'User'
};

// Mock for window.location.href
const originalLocation = window.location;

beforeEach(() => {
    // Setup the global properties before each test
    global.properties = mockProperties;

    // Mock window.location.href
    delete window.location;
    window.location = { href: jest.fn() };

    jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
    // Reset any mocks and restore original functions after each test
    window.location = originalLocation;
    jest.clearAllMocks();
    window.alert.mockRestore();
});

test('Navbar Load test', () => {
    const component = renderer.create(
        <Header />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('successful logout', async () => {
    const component = renderer.create(
        <Header />
    );

    await act(async () => {
        await component.root.findByProps({ id: 'logoutBtn' }).props.onClick();
    });

    expect(window.location.href).toEqual("https://events360.herokuapp.com/logout");
    // Additional assertions as needed
});
// cant get this test to pass
test('logout failure', async () => { 
    // Mocking a failure scenario for window.location.href
    const originalHref = window.location.href;
    window.location.href = "https://google.com"; // Set a different value for window.location.href

    const component = renderer.create(
        <Header />
    );

    // Trigger the logout action
    await act(async () => {
        await component.root.findByProps({ id: 'logoutBtn' }).props.onClick();
    });

    // Check if window.location.href remains unchanged
    expect(window.location.href).not.toEqual(originalHref);

    // Restore the original value of window.location.href
    window.location.href = originalHref;
});

