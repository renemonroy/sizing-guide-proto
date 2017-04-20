import React, { Component, PropTypes } from 'react';
import UICursor from './UICursor';
import cx from '../../utilities/className';
import './UIInput.styl';

class UIInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
			characters: ['6', '2'],
			cursorIndex: 0,
		};
		this.handleTextzoneClick = this.handleTextzoneClick.bind(this);
		this.handleTextzoneUnfocus = this.handleTextzoneUnfocus.bind(this);
		this.handleCharacterClick = this.handleCharacterClick.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.write('a');
		}, 5000);
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
		if (isFocused) {
			characterIndex = cursorIndex;
		}
		const newCharacters = characters.slice();
		newCharacters.splice(characterIndex, 0, character);
		this.setState({
			characters: newCharacters,
			cursorIndex: characterIndex + 1,
		});
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
		const { isFocused, characters, cursorIndex } = this.state;
		let result = null;
		this.validHandlers = [];
		this.validHandlers.length = 0;
		result = characters.map((char, i) => (
			<div
				key={`ui-char-${char}${i}`}
				className="ncss-brand ui-input-character"
				ref={(character) => { this.validHandlers.push(character); }}
				onClick={e => this.handleCharacterClick(e, i)}
			>
				{char}
			</div>
		));
		if (isFocused) {
			result.splice(cursorIndex, 0, <UICursor key="ui-cursor" />);
		}
		return (
			<div {...this.props} className={cx(['ui-input', this.props.className])}>
				<div
					ref={(textzone) => { this.validHandlers.push(textzone); }}
					className="ui-input-textzone"
					onClick={this.handleTextzoneClick}
				>
					{result}
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
