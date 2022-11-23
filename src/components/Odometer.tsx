import { useEffect, useState } from 'react';
import RollingNumber from "./RollingNumber";

import './Odometer.scss';
import React from 'react';

/**
 * @param {Number} props.value value to display in the odometer
 * @param {Number} props.maxValue max value that can be displayed in the odometer
 * @returns
 */
export default function Odometer({value = 0, maxValue = 0}:{value: number; maxValue: number}) {
   

    const [start, setStart] = useState(1);
    const [target, setTarget] = useState(1);

    useEffect(() => {
        setStart(target);
        setTarget(Math.max(0, Math.min(value, maxValue)));
    }, [value, maxValue, target]);

    function getDirection() {
        if (target > start) {
            return 1;
        } else if (start > target) {
            return -1;
        } else {
            return 1;
        }
    }

    function renderNumbers() {
        const direction = getDirection();
        const numString = maxValue.toString(); // trims, gets a magnitude of 10
        const targetString = target
            .toString()
            .padStart(numString.length, '0');
        return numString.split('').map((c, i) => { // make a RollingNumber for each significant digit
            const targetDigit = parseInt(targetString[i]) || 0;
            return (
                <RollingNumber
                    key={i}
                    direction={direction}
                    target={targetDigit}
                />
            );
        });
    }

    return <div className="odometer">{renderNumbers()}</div>;
}


