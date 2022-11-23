import logo from './logo.svg';
import './App.scss';
import Odometer from "./components/Odometer";
import MalarkeyLogo from './img/malarkey-logo.svg';
import Icon1 from './img/icon-1.svg';
import Icon2 from './img/icon-2.svg';
import Icon3 from './img/icon-3.svg';
import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import Carousel from 'react-bootstrap/Carousel';

function App() {
  const [currentTime, setCurrentTime] = useState(moment(new Date().now).format('DD-MMM-YYYY HH:mm:ss'));
  const [ currentTire, setCurrentTire ] = useState(5100000.00);
  const [ currentBag, setCurrentBag ] = useState(13000000000.00);
  const [ currentTree, setCurrentTree ] = useState(1100000.00);
  const tireRate = .036;
  const bagRate = 23.13;
  const treeRate = .0083;

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setCurrentTime(moment(new Date().now).format('h:mm:ss a DD MMM YYYY'));
      setCurrentTire(currentTire+tireRate);
      setCurrentBag(currentBag+bagRate);
      setCurrentTree(currentTree+treeRate);
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [currentBag, currentTire, currentTree])


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
       <div className='current-time'>{ currentTime }</div>
        
      </header>
      <section>
        <h1>SUSTAINABILITY</h1>
        <h2>Malarkey’s Cumulative Eco-Oﬀset</h2>
      </section>
      <section className='buckets'>
          <div className='bucket'><img src={Icon1} alt="UPCYCLED TIRES"/><Odometer value={Math.floor(currentTire)} maxValue={9999999} /><div><h4>UPCYCLED TIRES</h4></div></div>
          <div className='bucket'><img src={Icon2} alt="UPCYCLED BAGS"/><Odometer value={Math.floor(currentBag)} maxValue={99999999999} /><div><h4>UPCYCLED BAGS</h4></div></div>
          <div className='bucket'><img src={Icon3} alt="‘PLANTED’ TREES"/><Odometer value={Math.floor(currentTree)} maxValue={9999999} /><div><h4>‘PLANTED’ TREES</h4></div></div>
      </section>
      <section className='cols'>
        <div className="itsnotwhat">
          <div className='inner'>
            <h3>It’s Not What You Say, It’s What You Do.</h3>
            <p>Each roof of Malarkey shingles upcycles the equivalent of ~5 rubber tires and ~3,200 plastic bags.</p>
            <p>And, by incorporating smog-reducing granules, helps clean the air of emission pollutants like planting ~2 trees.</p>
            <h4>WHEN IT MATTERS&trade;</h4>
          </div>
        </div>
        <div className='slider'>
          <Carousel fade controls={false} indicators={false} interval={5000}>
            <Carousel.Item>
              <img
                src="./slides/slide-1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="./slides/slide-2.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="./slides/slide-3.jpg"
                alt="First slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      <footer>

      </footer>
    </div>
  );
}

export default App;
