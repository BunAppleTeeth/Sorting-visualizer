import { SortBar } from "../../models/SortBar";
import { sleep } from "../Helpers";
import { useDispatch, useStore } from "react-redux";
import { ActionType } from "../../state/action-types";

export function BubbleSort(sortArr: SortBar[]): SortBar[] {
  let len: number = sortArr.length;
  //   let flag: boolean = false;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (sortArr[j].height > sortArr[j + 1].height) {
        // await sleep(1000);
        let temp: SortBar = sortArr[j];
        sortArr[j] = sortArr[j + 1];
        sortArr[j + 1] = temp;
        // useDispatch({type: ActionType.SORT_PENDING})
      }
    }
    sortArr[len - 1 - i].color = "#58ff58";
  }
  sortArr[0].color = "#58ff58";
  return sortArr;
}
