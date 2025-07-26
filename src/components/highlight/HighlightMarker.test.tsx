import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HighlightMarker } from './HighlightMarker';
import {
  mockHighlight,
  mockGetBoundingClientRect,
} from './__mocks__/HighlightMarker.mock';

jest.mock('./HighlightTooltip', () => ({
  HighlightTooltip: () => <div role="tooltip" data-testid="tooltip" />,
}));

describe('HighlightMarker', () => {
  let targetElement: HTMLElement;

  beforeEach(() => {
    targetElement = document.createElement('div');
    targetElement.id = mockHighlight.elementId;
    document.body.appendChild(targetElement);
    window.HTMLElement.prototype.getBoundingClientRect =
      mockGetBoundingClientRect;
  });

  afterEach(() => {
    document.body.removeChild(targetElement);
  });

  it('renders without crashing', () => {
    render(
      <HighlightMarker
        highlight={mockHighlight}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {}}
        showTooltip={false}
        zIndex={1}
      />,
    );
  });

  it('calculates position correctly', () => {
    render(
      <HighlightMarker
        highlight={mockHighlight}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {}}
        showTooltip={false}
        zIndex={1}
      />,
    );

    const marker = screen.getByRole('button');
    expect(marker).toHaveStyle({ left: '10px' });
    expect(marker).toHaveStyle({ top: '20px' });
    expect(marker).toHaveStyle({ width: '100px' });
    expect(marker).toHaveStyle({ height: '50px' });
  });

  it('calls event handlers on interaction', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();

    render(
      <HighlightMarker
        highlight={mockHighlight}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        showTooltip={false}
        zIndex={1}
      />,
    );

    const marker = screen.getByRole('button');
    fireEvent.mouseEnter(marker);
    expect(onMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(marker);
    expect(onMouseLeave).toHaveBeenCalled();
    fireEvent.click(marker);
    expect(onClick).toHaveBeenCalled();
  });

  it('shows tooltip when showTooltip is true', () => {
    render(
      <HighlightMarker
        highlight={mockHighlight}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {}}
        showTooltip={true}
        zIndex={1}
      />,
    );

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('does not show tooltip when showTooltip is false', () => {
    render(
      <HighlightMarker
        highlight={mockHighlight}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {}}
        showTooltip={false}
        zIndex={1}
      />,
    );

    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });
});
