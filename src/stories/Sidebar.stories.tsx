import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Sidebar from '../components/Layouts/AppLayout'

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Primary = Template.bind({})

Template.parameters = {
  nextRouter: {
    path: '/profile/[id]',
    asPath: '/profile/lifeiscontent',
    query: {
      id: 'lifeiscontent',
    },
  },
}

Primary.args = {}
