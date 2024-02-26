
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileDropdown } from '../components/ProfileDropdown';
import { Space } from 'antd';
import { CurrentUserProvider } from '../context/UserContext';

export default {
	title: 'ProfileDropdown',
	component: ProfileDropdown,
} as ComponentMeta<typeof ProfileDropdown>


const Template: ComponentStory<typeof ProfileDropdown> = (args) => {
	return (
		<CurrentUserProvider>
			<Space style={{ width: 200, justifyContent: "center" }}>
				<ProfileDropdown />
			</Space>
		</CurrentUserProvider>
	)
}

export const Primary = Template.bind({});