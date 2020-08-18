import React from 'react';
import styled from 'styled-components';

export interface InputProps {
	placeholder: string;
	onChange: (value: string) => void;
}

export const InputEl = styled.input`
	border: none;
	border-radius: 4px;
	min-width: 260px;
	max-width: 400px;
	margin: .5rem;
	height: 32px;
	padding: 0 .5rem;
	outline: none;
`

export const Input: React.FC<InputProps> = (props) => {
	const { onChange, placeholder } = props;
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	}
	return (
		<InputEl placeholder={placeholder} onChange={handleChange} />
	);
};