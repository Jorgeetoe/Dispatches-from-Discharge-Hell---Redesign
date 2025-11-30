import { Story } from './types';
import { content } from './content';

// Cast the data to the Story type
export const MOCK_STORIES: Story[] = content.stories as unknown as Story[];