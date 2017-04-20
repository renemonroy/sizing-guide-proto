import React from 'react';
import Slider from 'react-slick';
import './SizingSteps.styl';

const SizingSteps = () => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<div className="sizing-steps">
			<Slider {...settings}>
				<div className="sizing-step-container step-1">
					<div className="sizing-step">
						<h3>STEP 1</h3>
						<p className="text-color-grey">
							Stand up straight on a hard surface with your heel against the
							wall and a piece of blank paper on the floor, beneath your foot.
						</p>
					</div>
				</div>
				<div className="sizing-step-container step-2">
					<div className="sizing-step">
						<h3>STEP 2</h3>
						<p className="text-color-grey">
							Stand up straight on a hard surface with your heel against the
							wall and a piece of blank paper on the floor, beneath your foot.
						</p>
					</div>
				</div>
				<div className="sizing-step-container step-3">
					<div className="sizing-step">
						<h3>STEP 3</h3>
						<p className="text-color-grey">
							Stand up straight on a hard surface with your heel against the
							wall and a piece of blank paper on the floor, beneath your foot.
						</p>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default SizingSteps;
