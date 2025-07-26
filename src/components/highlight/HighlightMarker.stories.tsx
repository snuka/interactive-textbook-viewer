import type { Meta, StoryObj } from '@storybook/react';
import { HighlightMarker } from './HighlightMarker';
import { mockHighlight } from './__mocks__/HighlightMarker.stories.mock';

const meta: Meta<typeof HighlightMarker> = {
  title: 'Components/HighlightMarker',
  component: HighlightMarker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showTooltip: { control: 'boolean' },
    zIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a mock target element for the highlight to attach to
const targetElement = document.createElement('div');
targetElement.id = mockHighlight.elementId;
targetElement.style.width = '200px';
targetElement.style.height = '100px';
targetElement.style.position = 'relative';
targetElement.style.border = '1px solid #ccc';
targetElement.style.padding = '10px';
targetElement.innerText = 'This is the target element for the highlight.';

// Append the target element to the DOM
if (!document.getElementById(mockHighlight.elementId)) {
  document.body.appendChild(targetElement);
}

export const Default: Story = {
  args: {
    highlight: mockHighlight,
    onMouseEnter: () => console.log('Mouse enter'),
    onMouseLeave: () => console.log('Mouse leave'),
    onClick: () => console.log('Clicked'),
    showTooltip: false,
    zIndex: 1,
  },
};

export const WithTooltip: Story = {
  args: {
    ...Default.args,
    showTooltip: true,
  },
};
