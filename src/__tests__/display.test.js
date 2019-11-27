import React from 'react';
import { render } from '@testing-library/react';
import Display from '../components/display';

describe('<Display />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Display result="100" />);
    expect(container).toMatchSnapshot();
  });

  it('shows the props correctly', () => {
    const { getByText } = render(<Display result="100" />);
    getByText('100');
  });
});
