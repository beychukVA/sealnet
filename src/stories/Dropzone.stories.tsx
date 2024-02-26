import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropzone from '../components/Dropzone';


export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Dropzone',
  component: Dropzone,
} as ComponentMeta<typeof Dropzone>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Dropzone> = (args) => <Dropzone {...args} />

export const Primary = Template.bind({});

Primary.args = {
  bodyHeaderText: "",
  bodySubText: ""
};

