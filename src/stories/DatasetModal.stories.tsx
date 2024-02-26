import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatasetModal from '../components/DatasetModal';

export default {
  title: 'DatasetModal',
  component: DatasetModal,
} as ComponentMeta<typeof DatasetModal>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DatasetModal> = (args) => <DatasetModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  buttonText: 'Open Modal',
};