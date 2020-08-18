import React from 'react';
import styled, { css } from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { MOBILE_BREAKPOINT } from '../../constants';
import { IssueListItem } from '../ListItem';
import DraggableListItem from '../ListItem/DraggableListItem';
import { Container, SubHeader, Text } from '../Base/';
import { ColumnListData } from '.';


type DraggableListlementProps = {
	isDragging: boolean;
};

const DraggableListElement = styled.div<DraggableListlementProps>`
  max-width: 400px;
  padding: .5rem;
	margin: .5rem;
	display: flex;
	flex-direction: column;
	@media (max-width: ${MOBILE_BREAKPOINT}px) {
		max-width: unset;
	}
  ${props => props.isDragging ? css`background: lightblue` : css`background: lightgrey`};
`;

export const DraggableColumnList: React.FC<ColumnListData<IssueListItem>> = (props) => {
	const { items, onSortItems, subTitle, title } = props;

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const reorderedList = reorder(
			items,
			result.source.index,
			result.destination.index
		);

		const sortOrderIds = reorderedList.map((item) => item.id);
		onSortItems && onSortItems(sortOrderIds);
	}

	const reorder = (list: IssueListItem[], startIndex: number, endIndex: number): IssueListItem[] => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<DraggableListElement
						{...provided.droppableProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDraggingOver}
					>
						<SubHeader text={title} />
						<Text text={subTitle} />
						<Container>
							{
								items && items.map(
									(item) => <DraggableListItem key={item.id} {...item} />
								)
							}
						</Container>
					</DraggableListElement>
				)}
			</Droppable>
		</DragDropContext>
	);
};