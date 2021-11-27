import React, { useState } from "react";
import { useActions } from "../../hooks/use-actions";

interface SettingsProps {
  onSubmit(
    length: number,
    iteration: number,
    randomize: boolean,
    loading: boolean
  ): void;
}
const Settings: React.FC<SettingsProps> = function (props): JSX.Element {
  const [startDisabled, setStartDisabled] = useState<boolean>(false);
  const [randomizeDisabled, setRandomizeDisabled] = useState<boolean>(true);
  const { startArraySorting, completeArraySorting } = useActions();
  const [elementsNum, setElementsNum] = useState<number>(5);
  const [iteration, setIteration] = useState<number>(0.004);
  const sliderHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setElementsNum(+e.currentTarget.value);
    props.onSubmit(+e.currentTarget.value, iteration, true, false);
    setStartDisabled(false);
    setRandomizeDisabled(true);
  };

  const iterationHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setIteration(+e.currentTarget.value);
  };

  const randomizeHandler = function () {
    props.onSubmit(elementsNum, iteration, true, false);
    completeArraySorting();
    setRandomizeDisabled(true);
    setStartDisabled(false);
  };

  const startHandler = function () {
    props.onSubmit(elementsNum, iteration, false, true);
    startArraySorting();
    setStartDisabled(true);
    setRandomizeDisabled(false);
  };

  return (
    <section className="settings">
      <div className="settings__scroll">
        <div className="settings__scroll-elements">
          Number of Elements: {elementsNum}
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            name="elements-num"
            id="slider"
            value={elementsNum}
            onInput={sliderHandler}
          />
          <label htmlFor="elements-num"></label>
        </div>
        <button onClick={startHandler} disabled={startDisabled}>
          Start
        </button>
        <button onClick={randomizeHandler} disabled={randomizeDisabled}>
          Randomize
        </button>
        <div className="settings__scroll-iterations">
          Time between each iteration: {iteration}s
          <input
            type="range"
            min="0.004"
            max="1"
            step="0.001"
            name="elements-num"
            id="slider"
            value={iteration}
            onInput={iterationHandler}
          />
          <label htmlFor="elements-num"></label>
        </div>
      </div>
    </section>
  );
};

export default Settings;
