import React, { Component, PropTypes } from 'react';
import UICursor from './UICursor';
import UICharacter from './UICharacter';
import cx from '../../utilities/className';
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
			cursorIndex: characters.length + 1,
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

	renderInputValue(state) {
		const { isFocused, cursorIndex, characters } = state;
		const inputValue = characters.map((char, i) => (
			<UICharacter
				key={`ui-char-${char}${i}`}
				onRef={(characterEl) => { this.validHandlers.push(characterEl); }}
				onClick={e => this.handleCharacterClick(e, i)}
				value={char}
			/>
		));
		if (isFocused) {
			inputValue.splice(cursorIndex, 0, <UICursor key="ui-cursor" />);
		}
		return inputValue;
	}

	render() {
		this.validHandlers = [];
		this.validHandlers.length = 0;
		return (
			<div {...this.props} className={cx(['ui-input', this.props.className])}>
				<div
					ref={(textzoneEl) => { this.validHandlers.push(textzoneEl); }}
					className="ui-input-textzone"
					onClick={this.handleTextzoneClick}
				>
					{this.renderInputValue(this.state)}
				</div>
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
