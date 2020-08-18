import React from 'react';
import { BasicColumnList } from './Basic';
import { DraggableColumnList } from './Draggable';

export enum ColumnListType {
	BASIC = 'basic',
	DRAGGABLE = 'draggable'
}

export interface ColumnListElement {
	type: ColumnListType.BASIC | ColumnListType.DRAGGABLE;
	onClickListItem?: (owner: string, repo: string, id: string) => void;
	selectedItem?: string;
}

export interface ColumnListData<T> {
	items: T[];
	isLoading: boolean;
	onSortItems?: (sortOrder: string[]) => void;
	subTitle: string;
	title: string;
}

export type ColumnListProps = ColumnListElement & ColumnListData<any>;


export const ColumnList: React.FC<ColumnListProps> = (props) => {
	const {
		isLoading,
		items,
		onClickListItem,
		onSortItems,
		selectedItem,
		subTitle,
		title,
		type
	} = props;

	const ColumnListEl = type === ColumnListType.DRAGGABLE
		?
		<DraggableColumnList
			isLoading={isLoading}
			items={items}
			onSortItems={onSortItems}
			subTitle={subTitle}
			title={title}
		/>
		:
		<BasicColumnList
			isLoading={isLoading}
			items={items}
			onClickListItem={onClickListItem}
			selectedItem={selectedItem}
			subTitle={subTitle}
			title={title}
		/>
	return ColumnListEl;
};