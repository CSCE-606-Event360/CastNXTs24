import React from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';
import Header from '../../../../app/javascript/components/Navbar/Header';

// Mock for axios
jest.mock('axios');

// Mock for global properties
const mockProperties = {
    name: 'User'
};

beforeEach(() => {
    // Setup the global properties and mocks before each test
    global.properties = mockProperties;
    jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
    // Reset any mocks and restore original functions after each test
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
    const mockResponse = { data: { redirect_path: '/login' } };
    axios.get.mockResolvedValue(mockResponse);

    const component = renderer.create(
        <Header />
    );

    await act(async () => {
        await component.root.findByProps({ id: 'logoutBtn' }).props.onClick();
    });

    expect(axios.get).toHaveBeenCalledWith('/logout');
    // Additional assertions as needed
});

test('logout failure', async () => {
    axios.get.mockRejectedValue(new Error('Logout failed'));

    const component = renderer.create(
        <Header />
    );

    await act(async () => {
        await component.root.findByProps({ id: 'logoutBtn' }).props.onClick();
    });

    expect(axios.get).toHaveBeenCalledWith('/logout');
    expect(window.alert).toHaveBeenCalledWith('Error: Could not Logout User');
});
