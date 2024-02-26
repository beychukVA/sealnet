import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddDatasetForm } from '../components/AddDatasetForm'

export default {
  title: 'AddDatasetForm',
  component: AddDatasetForm,
} as ComponentMeta<typeof AddDatasetForm>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AddDatasetForm> = (args) => (
  <AddDatasetForm {...args} />
)

export const Primary = Template.bind({})

Primary.args = {}
