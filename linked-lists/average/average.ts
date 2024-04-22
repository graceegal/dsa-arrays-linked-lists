import { LLStr } from "../common/ll";

/** return average (mean) of list values.
 *
 * Returns 0 for empty list.
 **/

function average(lst: LLStr): number {
  if (lst.length === 0) return 0;

  let sum : number = 0;

  let curr = lst.head;

  while (curr !== null) {
    sum += Number(curr.val);
    curr = curr.next;
  }

  return (sum/lst.length);
}

export { average };