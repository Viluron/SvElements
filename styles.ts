import { css } from '@emotion/css';

const _textColor = '#000';
const _primaryColor = 'rgb(16,108,200)';
const _primaryColorFade = 'rgba(16,108,200,0.5)';
const _backgroundColor = '#fff';
const _placeholderColor = 'rgba(0,0,0,0.87)';
const _errorColor = 'rgb(221,44,0)';
const _errorColorFade = 'rgba(221,44,0,0.5)';
const _successColor = 'rgb(155,255,137)';
const _successColorFade = 'rgba(155,255,137,0.5)';

let colors = {
	primary: _primaryColor,
	primaryFade: _primaryColorFade,
	background: _backgroundColor,
	placeholder: _placeholderColor,
	error: _errorColor,
	errorFade: _errorColorFade,
	success: _successColor,
	successFade: _successColorFade
};

export type ThemeProp = keyof typeof colors;
export type ThemeObject = Record<ThemeProp, string>;
export type Theme = Partial<ThemeObject>;

export function setThemeColors(newColors: Partial<ThemeObject> | {}) {
	colors = { ...colors, ...newColors };
}

const button = css`
	background-color: ${colors.primary};
	color: ${colors.background};
`;

export const Svelements = {
	button
};
