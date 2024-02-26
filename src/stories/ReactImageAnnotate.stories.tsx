import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactImageAnnotate from 'react-image-annotate'

export default {
  title: 'React Image Annotate',
  component: ReactImageAnnotate,
} as ComponentMeta<typeof ReactImageAnnotate>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ReactImageAnnotate> = (args) => (
  <ReactImageAnnotate {...args} />
)

export const Primary = Template.bind({})

Template.parameters = {}

Primary.args = {
  labelImages: true,
  regionClsList: ['Alpha', 'Beta', 'Charlie', 'Delta'],
  regionTagList: ['tag1', 'tag2', 'tag3'],
  images: [
    {
      src: 'https://placekitten.com/408/287',
      name: 'Image 1',
      regions: [],
    },
  ],
}
