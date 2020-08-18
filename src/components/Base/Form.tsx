import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Button';
import { Input } from './Input';
import { Text } from './Text';


export interface FormWrapperProps {
	isLoading?: boolean;
	isError?: boolean;
}

export interface FormProps {
	errorText?: string;
	onChangeInput: (value: string) => void;
	onClick: () => void;
	onSubmit: () => void;
}

export const FormWrapper = styled.div<FormWrapperProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  padding: 2rem .5rem;
	margin: .5rem;
	background: darkslategray;
	p { 
		color: white;
	}

	${props => props.isError && css`p { 
		color: red;
	}`}

	${props => props.isLoading && css`button {
		opacity: 0.9;
		background: #FFD199;
		cursor: not-allowed;
		color: black;
		&:hover {
			background: #FFD199;
		}
	}`}
`;

export const FormButton = styled.button`
	border-radius: 4px;
	border: none;
	outline: none;
`

export const Form: React.FC<FormWrapperProps & FormProps> = (props) => {
	const { errorText, isError, isLoading, onClick, onChangeInput, onSubmit } = props;
	return (
		<FormWrapper isLoading={isLoading} onSubmit={onSubmit}>
			<Input placeholder='Enter API token here' onChange={onChangeInput} />
			{isError && errorText && <Text text={errorText} />}
			<Button
				text={isLoading ? 'Loading...' : 'Load Repositories'}
				onClick={onClick} />
		</FormWrapper>
	);
};