import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import UICursor from './UICursor';
import UICharacter from './UICharacter';
import cx from '../../utilities/className';
import { easeOut } from '../../constants/SpringPresets';
import './UIInput.styl';

class UIInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
			characters: ['6', '2', '.', '9'],
			cursorIndex: 0,
		};
		this.handleTextzoneClick = this.handleTextzoneClick.bind(this);
		this.handleTextzoneUnfocus = this.handleTextzoneUnfocus.bind(this);
		this.handleCharacterClick = this.handleCharacterClick.bind(this);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleTextzoneUnfocus);
	}

	getDefaultCharacterStyles() {
		const { characters } = this.state;
		return characters.map(character => ({
			key: `ui-char-${character}`,
			style: { opacity: 1 },
			data: { value: character },
		}));
	}

	getCharacterStyles() {
		const { characters } = this.state;
		return characters.map(character => ({
			key: `ui-char-${character}`,
			style: { opacity: spring(1, easeOut) },
			data: { value: character },
		}));
	}

	handleTextzoneClick(e) {
		this.focus();
		e.stopPropagation();
	}

	handleTextzoneUnfocus(e) {
		if (!this.isHandler(e.target)) {
			this.unfocus();
			e.stopPropagation();
		}
	}

	handleCharacterClick(e, i) {
		this.updateCursorPosition(i);
		e.stopPropagation();
	}

	focus() {
		const { isFocused, characters } = this.state;
		if (!isFocused) {
			document.addEventListener('click', this.handleTextzoneUnfocus);
		}
		this.setState({
			isFocused: true,
			cursorIndex: characters.length,
		});
	}

	unfocus() {
		if (this.state.isFocused) {
			document.removeEventListener('click', this.handleTextzoneUnfocus);
			this.setState({ isFocused: false });
		}
	}

	write(character) {
		const { isFocused, cursorIndex, characters } = this.state;
		let characterIndex = characters.length;
		let newCharacters = null;
		if (isFocused) {
			characterIndex = cursorIndex;
		}
		newCharacters = characters.slice();
		newCharacters.splice(characterIndex, 0, character);
		this.setState({
			characters: newCharacters,
			cursorIndex: characterIndex + 1,
		});
	}

	erase(charIndex, numOfChars = 1) {
		const { isFocused, cursorIndex, characters } = this.state;
		const characterIndex = isFocused ? cursorIndex - 1 : charIndex;
		let newCharacters = null;
		if (characters.length > 0) {
			newCharacters = characters.slice();
			newCharacters.splice(characterIndex, numOfChars);
			this.setState({
				characters: newCharacters,
				cursorIndex: characterIndex,
			});
		}
	}

	updateCursorPosition(i) {
		if (!this.state.isFocused) {
			document.addEventListener('click', this.handleTextzoneUnfocus);
		}
		this.setState({ cursorIndex: i, isFocused: true });
	}

	isHandler(el) {
		return this.validHandlers.some(handler => handler === el);
	}

	render() {
		const { className, ...rest } = this.props;
		const { isFocused, cursorIndex } = this.state;
		this.validHandlers = [];
		this.validHandlers.length = 0;
		return (
			<div {...rest} className={cx(['ui-input', this.props.className])}>
				<TransitionMotion
					willEnter={() => ({ opacity: 0 })}
					styles={this.getCharacterStyles()}
					defaultStyles={this.getDefaultCharacterStyles()}
				>
					{styles => (
						<div
							ref={(textzoneEl) => { this.validHandlers.push(textzoneEl); }}
							className="ui-input-textzone"
							onClick={this.handleTextzoneClick}
						>
							{styles.map(({ key, style, data: { value } }, i) => (
								[
									isFocused && cursorIndex === i ? <UICursor key={`ui-cursor-${i}`} /> : null,
									<UICharacter
										key={key}
										style={style}
										onRef={(characterEl) => { this.validHandlers.push(characterEl); }}
										onClick={e => this.handleCharacterClick(e, i)}
										value={value}
									/>,
									isFocused && i === (styles.length - 1) && cursorIndex === styles.length ?
										<UICursor key={`ui-cursor-${i}`} /> : null,
								]
							))}
						</div>
					)}
				</TransitionMotion>
			</div>
		);
	}

}

UIInput.propTypes = {
	className: PropTypes.string,
};

UIInput.defaultProps = {
	className: '',
};

export default UIInput;
