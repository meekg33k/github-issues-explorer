import React from 'react';
import { mount } from 'enzyme';
import { Container } from '../Container';

describe('<Container />', () => {
	it('renders child component in Container component', () => {
		const wrapper = mount(
			<Container><section /></Container>)
			;
		expect(wrapper.find('section')).toHaveLength(1);
	});
});