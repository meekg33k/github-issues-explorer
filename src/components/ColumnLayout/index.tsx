import React from 'react';
import styled, { css } from 'styled-components';
import { ColumnList, ColumnListProps } from '../ColumnList';
import { MOBILE_BREAKPOINT } from '../../constants';

export interface ColumnLayoutWrapperProps {
	count?: number;
	selectedItem?: string;
	onSelectItem?: (owner: string, repo: string, id: string) => void;
	onSortItems?: (sortOrder: string[]) => void;
};

export interface ColumnLayoutProps {
	columns?: ColumnListProps[]
}

export const ColumnLayoutWrapper = styled.div<ColumnLayoutWrapperProps>`
	${props => props.count
		? css`
			display: grid;
			grid-template-columns: repeat(${props.count}, ${100 / props.count}%);
			@media (max-width: ${MOBILE_BREAKPOINT}px) {
				display: flex;
				flex-direction: column;
			}
			`
		:
		`display: flex;`
	};
`;

export const ColumnLayout: React.FC<ColumnLayoutProps & ColumnLayoutWrapperProps> = (props) => {
	const { columns, onSelectItem, onSortItems, selectedItem } = props;
	return (
		<ColumnLayoutWrapper count={(columns && columns.length) || 0}>
			{
				columns && columns.map((column, index) =>
					(
						<ColumnList
							key={`index-${index}-${column.type}`}
							isLoading={false}
							onClickListItem={onSelectItem}
							onSortItems={onSortItems}
							selectedItem={selectedItem}
							subTitle={column.subTitle}
							title={column.title}
							type={column.type}
							items={column.items}
						/>
					)
				)
			}
		</ColumnLayoutWrapper>
	);
};