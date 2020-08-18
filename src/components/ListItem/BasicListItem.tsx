import React from 'react';
import styled, { css } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';
import { RepositoryListItem } from '.';
import { Text } from '../Base';

export interface BasicListItemElementProps {
	isSelected?: boolean;
}

const BasicListItemElement = styled.div<BasicListItemElementProps>`
	box-sizing: border-box;
  background: white;
  border-radius: 8px;
  padding: 1rem;
	margin: .5rem;
	cursor: pointer;
	border: 2px solid lightgray;
	p:first-child {
		font-weight: 600;
		line-height: 1.1;
		margin-bottom: .5rem;
	}
	p:nth-child(2) {
		font-size: .8rem;
		margin-top: -.5rem;
	}
	&:hover {
		border: 2px solid #FF8C00;
	}
	@media (max-width: ${MOBILE_BREAKPOINT}px) {
		min-width: 240px;
	}
  ${props => props.isSelected && css`border: 2px solid #FF8C00`};
`;


export const BasicListItem: React.FC<RepositoryListItem> = (props) => {
	const { id, onClick, owner, selected, title } = props;
	const handleClick = () => {
		onClick!(owner, title, id);
	}
	return (
		<BasicListItemElement key={id}
			isSelected={selected === id}
			onClick={handleClick}>
			<Text text={title}></Text>
			<Text text={`Owned by: ${owner}`}></Text>
		</BasicListItemElement>
	);
};

export default BasicListItem;