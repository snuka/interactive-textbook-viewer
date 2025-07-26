import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Function to customize the snapshot name
const getMatchOptions = ({
  context: { fileName },
}: {
  context: { fileName: string };
}) => {
  const snapshotPath = path.join(path.dirname(fileName), '__snapshots__');
  return { customSnapshotsDir: snapshotPath };
};

initStoryshots({
  suite: 'Image snapshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6007',
    getMatchOptions,
  }),
});
