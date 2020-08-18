import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
	text: string;
	onClick: () => void;
}

export const ButtonEl = styled.button`
	border-radius: 6px;
	border: none;
	outline: none;
	margin-bottom: .5rem;
	margin-top: .5rem;
	background-color: #FF8C00;
	color: white;
	cursor: pointer;
	font-size: 1rem;
	padding: .75rem;
	&:hover {
		background-color: #B87700;
	}
`;

export const Button: React.FC<ButtonProps> = (props) => {
	const { onClick, text } = props;
	return (
		<ButtonEl onClick={onClick}>{text}</ButtonEl>
	);
};