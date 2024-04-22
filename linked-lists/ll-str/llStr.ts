/** IndexError: raised when index not found. */

class IndexError extends Error {
}

/**
 * NodeStr: node for a singly-linked list of string.
 *
 * - val
 * - next: next NodeStr or null
 */

class NodeStr {
  val: string;
  next: NodeStr | null;

  constructor(val: string) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Linked list of numbers.
 */

class LLStr {
  head: NodeStr | null;
  tail: NodeStr | null;
  length: number;

  constructor(vals: string[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val: string): void {
    const newNode = new NodeStr(val);

    if (this.head === null) this.head = newNode;

    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val: string): void {
    const newNode = new NodeStr(val);

    newNode.next = this.head;
    this.head = newNode;

    if (this.tail === null) this.tail = this.head;
    this.length++;
  }

  /** pop(): return & remove last item.
   *
   * Throws IndexError on empty list.
   **/

  pop(): string {
    if (this.head === null) throw new IndexError;

    const fakeHead = new NodeStr('');
    fakeHead.next = this.head;

    let curr: (NodeStr | null) = fakeHead;

    if (this.length === 1) this.head = null;

    while (curr !== null && curr.next !== this.tail) {
      curr = curr.next;
    }

    const returnVal = curr?.next?.val;
    curr!.next = null;
    this.tail = (this.length === 1) ? null : curr;

    this.length--;
    return returnVal!;

  }

  /** shift(): return & remove first item.
   *
   * Throws IndexError on empty list.
   **/

  shift(): string {
    if (this.head === null) throw new IndexError;

    const returnVal = this.head.val;
    this.head = this.head.next;

    if (this.length === 1) this.tail = null;

    this.length--;

    return returnVal;
  }

  /** getAt(idx): get val at idx.
   *
   * Throws IndexError if not found.
   **/

  getAt(idx: number): string {
    if (idx < 0 || idx >= this.length) throw new IndexError;

    let curr: (NodeStr | null) = this.head;

    while (idx > 0) {
      curr = curr!.next;
      idx--;
    }

    return curr!.val;
  }

  /** setAt(idx, val): set val at idx to val.
   *
   * Throws IndexError if not found.
   **/

  setAt(idx: number, val: string): void {
    if (idx < 0 || idx >= this.length) throw new IndexError;

    let curr: (NodeStr | null) = this.head;

    while (idx > 0) {
      curr = curr!.next;
      idx--;
    }

    curr!.val = val;
  };

  /** insertAt(idx, val): add node w/val before idx.
   *
   * Throws IndexError if not found.
   **/

  insertAt(idx: number, val: string): void {
    if (idx < 0 || idx > this.length) throw new IndexError;

    if (this.length === 0 || idx === this.length) {
      this.push(val);
      return;
    }

    const fakeHead = new NodeStr('');
    fakeHead.next = this.head;

    let curr: (NodeStr | null) = fakeHead;

    while (idx > 0) {
      curr = curr!.next;
      idx--;
    }

    const newNode: (NodeStr | null) = new NodeStr(val);
    newNode.next = curr?.next || null;
    curr!.next = newNode;
    this.head = fakeHead.next;
    this.length++;
  };

  /** removeAt(idx): return & remove item at idx,
   *
   * Throws IndexError if not found.
   **/

  removeAt(idx: number): string {
    if (idx < 0 || idx >= this.length) throw new IndexError;

    const fakeHead = new NodeStr('');
    fakeHead.next = this.head;

    let curr: (NodeStr | null) = fakeHead;

    while (idx > 0) {
      curr = curr!.next;
      idx--;
    }

    const returnNode: (NodeStr | null) = curr!.next;
    curr!.next = returnNode?.next || null;

    if (this.tail === returnNode) {
      this.tail = this.length === 1 ? null : curr;
    }

    this.head = fakeHead.next;
    this.length--;

    return returnNode!.val;
  }

  /** toArray (useful for tests!) */

  toArray(): string[] {
    const out = [];
    let current = this.head;

    while (current) {
      out.push(current.val);
      current = current.next;
    }

    return out;
  }
}


export {
  IndexError,
  LLStr,
  NodeStr,
};