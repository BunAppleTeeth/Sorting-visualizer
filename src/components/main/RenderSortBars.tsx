import React from "react";
import { SortBar } from "../../models/SortBar";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { SortType } from "../../enums";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { invokeRender } from "../../sorts/Helpers";

interface RenderSortBarProps {
  settings: { length: number; iteration: number; randomize: boolean };
}
const RenderSortBars: React.FC<RenderSortBarProps> = function ({ settings }) {
  const [renderedBars, setRenderedBars] = useState<SortBar[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const store = useStore();
  const { sortArray } = store.getState();
  const data = useTypedSelector(({ sortArray: { data } }) => {
    return data;
  });
  const loading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { randomize, completeArraySorting, pendingBubbleSorting } =
    useActions();

  useEffect(() => {
    randomize(settings.length);
    setRenderedBars(sortArray.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (loading && !flag) {
      console.log("Starting to sort");
      pendingBubbleSorting(SortType.BUBBLE, 0, 0);
      setFlag(true);
    }
    if (!loading) {
      setFlag(false);
    }
  }, [
    sortArray.data,
    loading,
    completeArraySorting,
    data,
    pendingBubbleSorting,
    flag,
  ]);

  useEffect(() => {
    console.log("invoked");
    setRenderedBars(invokeRender());
  }, []);
  return (
    <React.Fragment>
      {renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default RenderSortBars;