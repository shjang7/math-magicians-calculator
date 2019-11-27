import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/button';

const orange = '#f60';

describe('<Button />', () => {
  const defaultButton = <Button buttonName="+" value="+" />;
  const wideButton = <Button buttonName="0" value="0" color="#aaa" wide />;

  it('matches snapshot', () => {
    const { container } = render(wideButton);
    expect(container).toMatchSnapshot();
  });

  it('shows the props correctly for button name', () => {
    const { getByText } = render(defaultButton);
    getByText('+');
  });

  it('shows the color correctly for button color', () => {
    const { queryByText } = render(defaultButton);
    queryByText(orange);
  });

  it('shows the width correctly for normal button', () => {
    const { queryByText } = render(defaultButton);
    queryByText('width: 25%');
  });

  it('shows the width correctly for wide button', () => {
    const { queryByText, getByText } = render(wideButton);
    getByText('0');
    queryByText('width: 50%');
  });
});
