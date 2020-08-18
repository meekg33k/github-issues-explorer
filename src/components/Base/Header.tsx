import React from 'react';
import styled from 'styled-components';

export interface TextProps {
	text: string;
}

export const HeaderEl = styled.h2`
	margin: 1rem;
	text-align: center;
`

export const Header: React.FC<TextProps> = (props) => {
	const { text } = props;
	return (
		<HeaderEl>{text}</HeaderEl>
	);
};