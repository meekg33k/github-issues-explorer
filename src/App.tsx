import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ColumnLayout } from './components/ColumnLayout';
import { Form } from './components/Base/Form';
import { Header } from './components/Base/Header';
import { fetchIssuesRequest, setIssuesSortOrder } from './store/issues/actions';
import { fetchRepositoriesRequest, setSelectedRepository } from './store/repositories/actions';
import { ApplicationState } from './store/types';
import { ColumnListProps, ColumnListType } from './components/ColumnList';
import { IssueListItem, RepositoryListItem } from './components/ListItem';
import { saveToSessionStorage } from './utils';

export interface AppProps {
	apiError?: string; //API-related error
	isLoading?: boolean;
	issues?: IssueListItem[];
	repositories?: RepositoryListItem[];
	selectedRepository: string;
	fetchIssuesRequest?: (owner: string, repo: string, id: string) => void;
	fetchRepositoriesRequest?: (id: string) => void;
	setIssuesSortOrder: (repoId: string, sortOrder: string[]) => void;
	setSelectedRepository?: (id: string) => void;
}


const App: React.FC<AppProps> = (props) => {
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState('');
	const [selectedItem, setSelectedItem] = useState('');
	const [text, setText] = useState('');
	const {
		issues,
		apiError,
		isLoading,
		repositories,
		selectedRepository
	} = props;

	const handleButtonClick = () => {
		if (!text) {
			setError(true);
			setErrorText('No API token provided. Please provide one.')
		}
		else {
			handleSubmit();
		}
	}

	const handleInputChange = (value: string) => {
		if (error) {
			setError(false);
			setErrorText('');
		}
		setText(value);
	}

	const handleSortItem = (sortOrder: string[]) => {
		const { setIssuesSortOrder } = props;
		//Persist this order on client side
		saveToSessionStorage(selectedRepository, sortOrder);
		setIssuesSortOrder(selectedRepository, sortOrder);
	}

	const handleSelectItem = (owner: string, repo: string, id: string) => {
		const { fetchIssuesRequest, setSelectedRepository } = props;
		fetchIssuesRequest!(owner, repo, id);
		setSelectedRepository!(id);
		setSelectedItem(id);
	}

	const handleSubmit = () => {
		const { fetchRepositoriesRequest } = props;
		fetchRepositoriesRequest!(text);
	}

	const renderColumns = () => {
		let columnsData: ColumnListProps[]
		if (repositories && repositories.length > 0) {
			if (issues && issues.length > 0) {
				columnsData = [
					{
						isLoading: false,
						subTitle: 'Click on any repository to load the issues',
						title: 'Repositories List',
						type: ColumnListType.BASIC,
						items: repositories
					},
					{
						isLoading: false,
						subTitle: 'Click and drag to reorder the issues',
						title: 'Issues List',
						type: ColumnListType.DRAGGABLE,
						items: issues
					},
				]
			}
			else {
				columnsData = [
					{
						isLoading: false,
						subTitle: 'Click on any repository to load the issues',
						title: 'Repositories List',
						type: ColumnListType.BASIC,
						items: repositories
					},
				]
			}
			return <ColumnLayout
				columns={columnsData}
				onSortItems={handleSortItem}
				onSelectItem={handleSelectItem}
				selectedItem={selectedItem}
			/>
		}
		return React.Fragment;
	}

	return (
		<div className="App">
			<Header text='GitHub Issues Explorer' />
			<Form
				errorText={errorText || apiError}
				isError={error || (apiError ? true : false)}
				isLoading={isLoading}
				onChangeInput={handleInputChange}
				onButtonClick={handleButtonClick}
				onSubmit={handleSubmit}
			/>
			{renderColumns()}
		</div>
	);
};

const mapStateToProps = (state: ApplicationState) => {
	const { issues, repositories } = state;
	console.log(state);
	return {
		apiError: issues.error || repositories.error,
		isLoading: issues.loading || repositories.loading,
		issues: issues.byRepository[repositories.selectedRepository],
		repositories: repositories.items,
		selectedRepository: repositories.selectedRepository
	}
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchIssuesRequest: (owner: string, repo: string, id: string) => dispatch(fetchIssuesRequest({ owner, repo, id })),
		fetchRepositoriesRequest: (id: string) => dispatch(fetchRepositoriesRequest(id)),
		setIssuesSortOrder: (repoId: string, sortOrder: string[]) => dispatch(setIssuesSortOrder({ repoId, sortOrder })),
		setSelectedRepository: (repositoryId: string) => dispatch(setSelectedRepository(repositoryId)),
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);