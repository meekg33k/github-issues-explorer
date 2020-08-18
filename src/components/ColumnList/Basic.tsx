import React from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';
import BasicListItem from '../ListItem/BasicListItem';
import { RepositoryListItem } from '../ListItem';
import { Container, SubHeader, Text } from '../Base/';
import { ColumnListData } from '.';

export interface ColumnListElement {
	onClickListItem?: (owner: string, repo: string, id: string) => void;
	selectedItem?: string;
}

export const BasicColumnListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
  padding: .5rem;
	margin: .5rem;
	background: lightgrey;

	@media (max-width: ${MOBILE_BREAKPOINT}px) {
		max-width: unset;
		> div {
			display: flex;
			overflow: scroll;
			padding: .5rem 0;
		}
	}

	> div {
		background: lightgrey;
	}
`;

export const BasicColumnList: React.FC<ColumnListElement & ColumnListData<RepositoryListItem>> = (props) => {
	const { items, onClickListItem, selectedItem, subTitle, title } = props;
	return (
		<BasicColumnListWrapper>
			<SubHeader text={title} />
			<Text text={subTitle} />
			<Container>
				{items && items.map((item) =>
					<BasicListItem
						key={item.id}
						onClick={onClickListItem}
						selected={selectedItem}
						{...item}
					/>
				)}
			</Container>
		</BasicColumnListWrapper>
	);
};