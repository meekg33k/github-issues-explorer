import BasicListItem from './BasicListItem';
import DraggableListItem from './DraggableListItem';

export interface ListItemProps {
  id: string;
  index: number;
  title: string;
};

export interface RepositoryListItem extends ListItemProps {
  owner: string;
  url?: string;
  onClick?: (owner: string, repo: string, id: string) => void;
  selected?: string;
};

export interface IssueListItem extends ListItemProps {
  assignee?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export { BasicListItem, DraggableListItem };