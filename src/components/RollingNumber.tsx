
import { useEffect, useRef, useState } from 'react';
import { easeInOutCubic } from 'js-easing-functions';
import React from 'react';

/**
 * Component for a number that rolls up and down
 * @param {Number} props.direction 1 if the number is increasing, -1 if the number is decreasing
 * @param {Number} props.target the number that the component should display in the window after it is done animating
 * @returns 
 */

 export default function RollingNumber({ direction, target }:{direction: number; target:number}) {
    const [currentPosition, setCurrentPosition] = useState(getNewPosition());
    /* 
        requestAnimationFrame has weird race conditions with useEffect, 
        so if there is an obsolete target (e.g. if `target` was changed quickly while an animation was already going on)
        cancelAnimationFrame might not be able to break the existing animation loop short
        Checking targetRef.current before recursively calling tick is the alternative way to break the loop
    */
    const targetRef = useRef(0);

    function getStartPosition() {
        if (direction < 0) {
            // value is going down, so we need to scroll column upwards
            return currentPosition > -20 // if the column is on the top half,
                ? currentPosition - 20 // shift the column to bottom half for infinite upward scrolling
                : currentPosition; // if already on bottom half, don't need to do anything
        } else {
            // value is going up, so we need to scroll column downwards
            return currentPosition < -20 // if the column is on the bottom half
                ? currentPosition + 20 // shift the column to the top half for infinite upward scrolling
                : currentPosition; // if already on the top half, don't need to do anything
        }
    }

    function getOffset(startPosition:number) {
        const newPosition = getNewPosition();
        if (direction < 0) {
            // value going down, so the y translate must go to a greater value (shift number column down)
            if (newPosition - 20 >= startPosition) {
                // if the target number in the bottom half is above the current position
                return newPosition - 20 - startPosition; // use the bottom half's number (move to the closer number)
            }
            return newPosition - startPosition; // otherwise move to the top half's number
        } else {
            // value going up, so the y translate must go to a lesser value (shift number column up)
            if (newPosition > startPosition) {
                // if the target location in the top half is above the current position
                return newPosition - 20 - startPosition; // use the bottom half's number instead
            }
            return newPosition - startPosition; // otherwise move to the top half's number
        }
    }

    useEffect(() => {
        if(typeof target === 'number'){
            targetRef.current = target;
        }
        const startTime = new Date().getTime();
        const startPosition = roundNumber(getStartPosition(), 3);
        const offset = getOffset(startPosition);

        function tick() {
            const elapsed = new Date().getTime() - startTime;
            const position = easeInOutCubic(
                elapsed,
                startPosition,
                offset,
                DURATION
            );
            
            setCurrentPosition(roundNumber(position, 3));

            if (elapsed < DURATION && targetRef.current === target) {
                requestAnimationFrame(tick);
            }
        }

        tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction, target]);

    /** 
     * Display a column of numbers, 0 to 9, twice
     */
    function renderNumbers() {
        return NUMS.map((n, i) => <span key={i}>{n}</span>);
    }

    function getNewPosition() {
            return (target*-2)
    }

    return (
        <div className="rolling-number-window">
            <div className="rolling-number-placeholder"></div>
            <div
                className="rolling-number"
                style={{
                    transform: `translateY(${currentPosition}em)`,
                }}
            >
                {renderNumbers()}
            </div>
        </div>
    );
}


function roundNumber(num:number, digits:number) {
    const decimal = Math.pow(10, digits);
    return Math.round(num * decimal) / decimal;
}

const DURATION = 1000;
const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];