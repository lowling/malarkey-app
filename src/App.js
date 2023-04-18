import "./App.scss";
import Odometer from "react-odometerjs";
import MalarkeyLogo from "./img/malarkey-logo.svg";
import Icon1 from "./img/icon-1.svg";
import Icon2 from "./img/icon-2.svg";
import Icon3 from "./img/icon-3.svg";
import Icon4 from "./img/icon-4.png";
import React, { useState, useEffect } from "react";
import * as moment from "moment";
import Carousel from "react-bootstrap/Carousel";
import "./components/odometer-js.scss";

function App() {
	const [currentTime, setCurrentTime] = useState(
		moment(new Date().now).format("DD-MMM-YYYY HH:mm:ss")
	);

	const tireStart = 5100000.0;
	const bagStart = 13000000000.0;
	const treeStart = 1100000.0;
	const tireRate = 0.036;
	const bagRate = 23.13;
	const treeRate = 0.0083;
	const startDate = "April 17, 2023 19:44:00";

	const [currentTire, setCurrentTire] = useState(tireStart);
	const [currentBag, setCurrentBag] = useState(bagStart);
	const [currentTree, setCurrentTree] = useState(treeStart);

	const startDateTimeSecs = new Date(startDate).getTime() / 1000;
	const currentDateTimeSecs = new Date().getTime() / 1000;
	const timeDelta = (currentDateTimeSecs - startDateTimeSecs).toFixed(0);

	useEffect(() => {
		const refreshInterval = setInterval(() => {
			setCurrentTime(moment(new Date().now).format("h:mm:ss a DD MMM YYYY"));
			setCurrentTire(
				digitHack(Number(tireStart) + Number(timeDelta) * Number(tireRate))
			);
			setCurrentBag(
				digitHack(Number(bagStart) + Number(timeDelta) * Number(bagRate))
			);
			setCurrentTree(
				digitHack(Number(treeStart) + Number(timeDelta) * Number(treeRate))
			);
		}, 1000);
		return () => clearInterval(refreshInterval);
	}, [currentBag, currentTire, currentTree, timeDelta]);

	function digitHack(num) {
		// odometerjs doesn't like trailing zeros, so we're going to fake it
		var tmp = Number(num).toFixed(2); //round to two places
		if (tmp.toString().slice(-1) === "0") {
			// if the number ends in zero, add .01
			tmp = Number(tmp) + Number(0.01);
		}
		return Number(tmp).toFixed(2);
	}

	return (
		<div className="App">
			<header>
				<a
					className="App-link"
					href="https://www.malarkeyroofing.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={MalarkeyLogo} alt="Malarkey Roofing" />
				</a>
				<div className="current-time">{currentTime}</div>
			</header>
			<section>
				<h1>SUSTAINABILITY</h1>
				<h2>Cumulative Eco-Offset of Malarkey Shingles</h2>
			</section>
			<section className="buckets counter-buckets">
				<div className="bucket">
					<img src={Icon1} alt="UPCYCLED TIRES" />
					<Odometer value={currentTire} format="(,ddd).dd" />
					<div>
						<h4>UPCYCLED TIRES</h4>
					</div>
				</div>
				<div className="bucket">
					<img src={Icon2} alt="UPCYCLED BAGS" />
					<Odometer value={currentBag} format="(,ddd).dd" />
					<div>
						<h4>UPCYCLED BAGS</h4>
					</div>
				</div>
				<div className="bucket">
					<img src={Icon3} alt="‘PLANTED’ TREES" />
					<Odometer value={currentTree} format="(,ddd).dd" />
					<div>
						<h4>‘PLANTED’ TREES</h4>
					</div>
				</div>
			</section>
			<section className="cols greybg">
				<div className="itsnotwhat">
					<div className="inner">
						<h3>It’s Not What You Say, It’s What You Do.</h3>
						<p>
							Each roof of Malarkey shingles upcycles the equivalent of ~5
							rubber tires and ~3,200 plastic bags.
						</p>
						<p>
							And, by incorporating smog-reducing granules, helps clean the air
							of emission pollutants like planting ~2 trees.
						</p>
						{/* <h4>WHEN IT MATTERS&trade;</h4> */}
					</div>
				</div>
				<div className="slider">
					<Carousel fade controls={false} indicators={false} interval={5000}>
						<Carousel.Item>
							<img src="./slides/slide-1.jpg" alt="First slide" />
						</Carousel.Item>
						<Carousel.Item>
							<img src="./slides/slide-2.jpg" alt="First slide" />
						</Carousel.Item>
						<Carousel.Item>
							<img src="./slides/slide-3.jpg" alt="First slide" />
						</Carousel.Item>
					</Carousel>
				</div>
			</section>
			<section className="section-2">
				<div className="inner cols">
					<img src={Icon4} alt="Malarkey Upcycling" />
					<div className="copy">
						<h3>
							We strive simply to make the best shingles in <br />
							the most sustainable way.
						</h3>
						<p>
							At Malarkey, we invented the cleaner, longer-lasting shingle
							technology known as polymer modifed [rubberized] asphaly. We
							pioneered the use of upcycled plastic in shingles. And we launched
							the industry's first smog-reducing shingle.
						</p>

						<h4>Learn More</h4>
					</div>
				</div>
			</section>
			<footer></footer>
		</div>
	);
}

export default App;
