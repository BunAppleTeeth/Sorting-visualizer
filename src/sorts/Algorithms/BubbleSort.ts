import { SortBar } from "../../models/SortBar";
import { Swap } from "../Swap";

export function BubbleSort(sortArr: SortBar[]): SortBar[] {
  let len: number = sortArr.length;
  //   let flag: boolean = false;
  for (let i = 0; i < len - 1; i++) {
    // flag = false;

    for (let j = 0; j < len - i - 1; j++) {
      if (sortArr[j].height > sortArr[j + 1].height) {
        Swap(sortArr[j], sortArr[j + 1]);
        // flag = true;
      }
    }
    sortArr[len - 1 - i].color = "#58ff58";

    // if (!flag) {
    //   break;
    // }
  }
  sortArr[0].color = "#58ff58";
  return sortArr;
}