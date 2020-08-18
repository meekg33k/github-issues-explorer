import React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
	children: React.ReactNode;
	height?: number;
	width?: number;
}

export const ContainerWrapper = styled.div`
	box-sizing: border-box;
`;

export const Container: React.FC<ContainerProps> = (props) => {
	return (
		<ContainerWrapper>{props.children}</ContainerWrapper>
	);
};