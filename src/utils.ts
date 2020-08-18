import { formatDistanceStrict, parseISO } from 'date-fns';
import {
	BAD_CREDS_ERROR_MSG,
	BAD_CREDS_ERROR_RES,
	DEFAULT_ERR_MSG,
	SESSION_STORAGE_PREFIX
} from './constants';
import { IssueListItem, RepositoryListItem } from './components/ListItem';


interface EntityWithID {
	id: string;
}

export const objectify = (items: Required<EntityWithID>[]) => {
	let itemsObj: { [key: string]: any } = {};
	items.forEach((item: Required<EntityWithID>) => {
		itemsObj[item.id] = item;
	});
	return itemsObj;
}

export const parseErrorMessage = (error: string): string => {
	switch (error) {
		case BAD_CREDS_ERROR_RES:
			return BAD_CREDS_ERROR_MSG;
		default:
			return DEFAULT_ERR_MSG;
	}
};

export const processIssuesFetchRes = (data: any[] = []): IssueListItem[] => {
	return data.map((item: any, index) => {
		const { assignee, created_at, id, title, updated_at, url } = item;
		return {
			...(assignee && { avatarUrl: assignee.avatar_url, assignee: assignee.login }),
			createdAt: created_at,
			id: `${id}`,
			title,
			index,
			updatedAt: updated_at,
			url,
		}
	});
};

export const processRepositoriesFetchRes = (data: any[] = []): RepositoryListItem[] => {
	return data.map((item: any, index) => {
		return {
			id: item.id,
			title: item.name,
			index,
			owner: item.owner.login,
			url: item.url,
		}
	});
};


/** Time Utils */
export const getTimeFromNow = (time: string) => {
	try {
		return formatDistanceStrict(
			parseISO(time),
			new Date(),
		);
	}
	catch (e) { return time }
};

export const formatISOTime = (time: string) => {
	try {
		return time.split('T')[0];
	}
	catch (e) { return time }
};


/** Session storage utils */
export const getFromSessionStorage = (key: string): any => {
	return JSON.parse(sessionStorage.getItem(`${SESSION_STORAGE_PREFIX}${key}`) as string);
};

export const saveToSessionStorage = (key: string, value: any) => {
	sessionStorage.setItem(
		`${SESSION_STORAGE_PREFIX}${key}`,
		JSON.stringify(value)
	);
};