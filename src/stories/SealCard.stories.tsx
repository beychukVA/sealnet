import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import DataCard from '../components/DataCard'

export default {
  title: 'DataCard',
  component: DataCard,
} as ComponentMeta<typeof DataCard>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DataCard> = (args) => {
  return (
    <div style={{ padding: 24, minHeight: 360 }}>
      <DataCard {...args} />
    </div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  cardTitle: 'Card Title',
  cardDescription: 'description text goes here',
  coverImageUrl:
    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  altText: 'example alt text',
}
