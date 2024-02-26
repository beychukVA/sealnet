import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LabelStudioReact } from '../components/LabelStudio';

export default {
	title: 'LabelStudio',
	component: LabelStudioReact,
} as ComponentMeta<typeof LabelStudioReact>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LabelStudioReact> = (args) => {
	return (
		<div >
			<LabelStudioReact {...args} />
		</div>
	);
}

export const Primary = Template.bind({});

// Values which instantiate lable studio frontend

const labelinConfig = `
<View>
  <Choices name="choice" toName="image" showInLine="true">
    <Choice value="Boeing" background="blue"/>
    <Choice value="Airbus" background="green" />
  </Choices>

  <RectangleLabels name="label" toName="image">
    <Label value="Airplane" background="green"/>
    <Label value="Car" background="blue"/>
  </RectangleLabels>

  <Image name="image" value="$image"/>
</View>
`

const task = {
	annotations: [],
	predictions: [{
		model_version: "one",
		score: 0.5,
		result: [{
			id: "result1",
			type: "rectanglelabels",
			from_name: "label",
			to_name: "image",
			original_width: 600, original_height: 403,
			image_rotation: 0,
			value: {
				rotation: 0,
				x: 4.98, y: 12.82,
				width: 32.52, height: 44.91,
				rectanglelabels: ["Airplane"]
			}
		}]
	}],
	id: 1,
	data: {
		image: "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg"
	}
}

const interfaces = [
	"panel",
	"update",
	"controls",
	"infobar",
	"side-column",
	"annotations:menu",
	"annotations:add-new",
	"annotations:delete",
	"predictions:menu"
];

const user = {
	pk: 1,
	firstName: "James",
	lastName: "Dean"
};

Primary.args = {
	config: labelinConfig,
	task,
	interfaces,
	user
};