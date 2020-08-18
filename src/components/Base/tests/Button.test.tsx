import React from 'react';
import { mount } from 'enzyme';
import { Button } from '../Button';

describe('<Button />', () => {
	it('renders Button component with text', () => {
		const wrapper = mount(<Button text='buttonText' />);
		expect(wrapper.find('button')).toHaveLength(1);
		expect(wrapper.find(Button).props().text).toEqual('buttonText');
	});
});