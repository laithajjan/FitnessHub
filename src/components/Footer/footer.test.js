import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
    test('renders the component', () => {
        render(<Footer />);

        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Learn more about our team, our mission, and our dedication to providing the best information and services for you.')).toBeInTheDocument();
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Blog')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Follow Us')).toBeInTheDocument();
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
        expect(screen.getByText('© 2023 FitnessHub. All Rights Reserved.')).toBeInTheDocument();
    });
});
