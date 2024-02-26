import React from 'react'
import { Button } from 'antd'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { mockSeals } from '../mock_data/seals'
import RecognitionModal from '../components/RecognitionModal'

export default {
  title: 'RecognitonModal',
  component: RecognitionModal,
} as ComponentMeta<typeof RecognitionModal>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RecognitionModal> = (args) => {
  return (
    <RecognitionModal {...args}>
      <Button>Open Modal</Button>
    </RecognitionModal>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  seal: mockSeals[0],
}
