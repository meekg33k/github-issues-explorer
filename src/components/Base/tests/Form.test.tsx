import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../Form';

describe('<Form />', () => {
	it('renders <Input> and <Button> components', () => {
		const wrapper = mount(
			<Form
				onChangeInput={jest.fn()}
				onButtonClick={jest.fn()}
				onSubmit={jest.fn()}
			/>
		);
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find('button')).toHaveLength(1);
	});
});