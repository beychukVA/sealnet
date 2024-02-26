import React from 'react';
import { Button } from 'antd';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CurrentUserProvider } from '../context/UserContext';

import ProfileModal from '../components/ProfileModal';

export default {
	title: 'ProfileModal',
	component: ProfileModal,
} as ComponentMeta<typeof ProfileModal>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ProfileModal> = (args) => {
	return (
		<CurrentUserProvider>
			<div>
				<ProfileModal {...args} >
					<Button>
						Open Modal
					</Button>
				</ProfileModal >
			</div>
		</CurrentUserProvider>
	)
}


export const Primary = Template.bind({});

Primary.args = {
};