import React from 'react';
import { UIInput } from '../ui';
import cx from '../../utilities/className';
import cl from './SizingBoxClasses';
import './SizingBox.styl';

const SizingBox = () => (
	<div className={cx(cl.sizingBox)}>
		<div className={cx(cl.sizingBoxRow)}>
			<div className={cx(cl.sizingBoxCol)}>
				<button className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnLeft])}>
					Length (cm)
				</button>
				<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputLeft])} />
			</div>
			<div className={cx(cl.sizingBoxCol)}>
				<button className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnRight])}>
					Men
				</button>
				<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputRight])} />
			</div>
			<div className={cx(cl.sizingBoxDivider)}>
				<div className="divider" />
			</div>
		</div>
	</div>
);

export default SizingBox;
