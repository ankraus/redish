import { render } from '@testing-library/react';

import RedishHeader from './redish-header';

describe('RedishHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RedishHeader />);
    expect(baseElement).toBeTruthy();
  });
});
