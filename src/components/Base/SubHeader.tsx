import React from 'react';
import styled from 'styled-components';
import { TextProps } from './Header';

export const SubHeaderEl = styled.h3`
	margin: 1rem .5rem;
`

export const SubHeader: React.FC<TextProps> = (props) => {
	const { text } = props;
	return (
		<SubHeaderEl>{text}</SubHeaderEl>
	);
};