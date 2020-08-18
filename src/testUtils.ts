export const createMockIssueListItems = (issueIds: string[]) => {
	return issueIds.map((item, index) => {
		return {
			id: item,
			index,
			title: `title-${item}`,
			avatarUrl: item,
			updatedAt: item
		}
	});
}