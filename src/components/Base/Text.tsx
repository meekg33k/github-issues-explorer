import React from 'react';
import styled from 'styled-components';
import { TextProps } from './Header';

export const TextEl = styled.p`
	margin: .5rem;
	height: 32px;
`

export const Text: React.FC<TextProps> = (props) => {
	const { text } = props;
	return (
		<TextEl>{text}</TextEl>
	);
};