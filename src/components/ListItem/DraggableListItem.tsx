import React from 'react';
import styled, { css } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { IssueListItem } from '.';
import { Container, Image, Text } from '../Base';
import { DEFAULT_AVATAR_HEIGHT, DEFAULT_AVATAR_WIDTH } from '../../constants';
import { getTimeFromNow, formatISOTime } from '../../utils';

export type DraggableListItemProps = {
	id: string,
	index: number,
	content: string
};

type DraggableListItemElementProps = {
	isDragging: boolean;
};

const DraggableListItemElement = styled.div<DraggableListItemElementProps>`
	box-sizing: border-box;
  background: white;
  border-radius: 8px;
	user-select: none;
  padding: 1rem;
	margin: .75rem;
	> div:first-child {
		p:first-child { font-weight: 600; }
	}
	div:nth-child(2) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: .5rem .5rem 0 .5rem;
		margin-top: .5rem;

		> div:first-child {
			display: flex;
			flex-direction: column;
			p { 
				margin-top: -8px;
				font-size: .8rem;
			}
		}

		> div:nth-child(2) {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			p {
				font-size: .8rem;
				font-weight: 400;
				margin: 0;
			}
			p:nth-child(2) { 
				margin-top: -8px;
			}
		}
	}
  ${props => props.isDragging && css`background: lightgreen`};
`;

export const DraggableListItem: React.FC<IssueListItem> = (props) => {
	const {
		assignee,
		avatarUrl,
		createdAt,
		id,
		index,
		title,
		updatedAt
	} = props;

	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided, snapshot) => {
				const { draggableProps, dragHandleProps } = provided;
				return (
					<DraggableListItemElement
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						{...draggableProps}
						{...dragHandleProps}
					>
						<Container>
							<Container><Text text={`Issue: ${title}`} /></Container>
							<Container>
								<Container>
									<Image
										title={assignee ? `Assignee: ${assignee}` : 'No assignee'}
										url={avatarUrl || 'http://www.gravatar.com/avatar'}
										isAvatar={true}
										height={DEFAULT_AVATAR_HEIGHT}
										width={DEFAULT_AVATAR_WIDTH}
									/>
								</Container>
								<Container>
									{createdAt && <Text text={`Created Time: ${formatISOTime(createdAt)}`} />}
									{updatedAt && <Text text={`Last updated: ${getTimeFromNow(updatedAt)} ago`} />}
								</Container>
							</Container>
						</Container>
					</DraggableListItemElement>
				)
			}
			}
		</Draggable>
	);
};

export default DraggableListItem;