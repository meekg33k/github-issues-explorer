import React from 'react';
import styled, { css } from 'styled-components';

export interface ImageProps {
	isAvatar?: boolean;
	/** height in px */
	height?: number;
	/** width in px */
	width?: number;
	url?: string;
	title?: string;
}

export const ImageWrapper = styled.img<ImageProps>`
	${props => props.height && css`height: ${props.height}px;`}
	${props => props.width && css`width: ${props.width}px;`}
	${props => props.isAvatar && css`border-radius: 50%;`}
`;

export const Image: React.FC<ImageProps> = (props) => {
	const { url } = props;
	return (
		<ImageWrapper src={url} {...props} />
	);
};