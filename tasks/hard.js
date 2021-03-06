
// hard
import {uniq} from 'tasks/easy';
import {hash} from 'utils/hash';

export function longMultiply(a, b, size) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let summ = a[i] * b[j];
      let index = j + i;
      let sizeOverflow;

      do {
        sizeOverflow = false;

        if (!result[index]) {
          result[index] = 0;
        }

        result[index] += summ;

        if (result[index] >= size) {
          summ = result[index] / size | 0;
          result[index] %= size;
          sizeOverflow = true;
          index++;
        }
      } while (sizeOverflow);
    }
  }
  return result;
}

export function factorial2(n, size = 1000) {
  let result = '1';
  if (n > 1) {
    let res = [1];
    for (let i = 1; i <= n; i++) {
      res = longMultiply(res, [i], size);
    }
    result = res.reduce((acc, value, index) => {
      let str = '';
      if (index < res.length - 1) {
        let zeros = size;
        while ((zeros /= 10) > 1) {
          if (value < zeros) {
            str += '0';
          } else {
            break;
          }
        }
      }
      str += value;
      return str + acc;
    }, '');
  }
  return result;
}

export function permute(str) {
  let indexes = [];
  let res = [];
  let length = str.length;
  let exit = false;

  if (length) {
    for (let i = 0; i < length; i++) {
      indexes.push(i);
    }

    while (!exit) {
      if (uniq(indexes).length === length) {
        res.push(indexes.reduce((a, v) => a + str[v], ''));
      }

      let shift = length - 1;

      do {
        indexes[shift] = ++indexes[shift] % length;
        if (indexes[shift] === 0) {
          shift--;
          if (shift < 0) {
            exit = true;
            break;
          }
        } else {
          break;
        }
      } while (shift >= 0);
    }
  } else {
    res = '';
  }

  return res;
}

export const debounce = (() => {
  const map = new Map();
  return (f, delay) => {
    return (...args) => {
      if (map.has(f)) clearTimeout(map.get(f));
      map.set(f, setTimeout(() => f(...args), delay));
    }
  }
})();

export class LinkedList {
  constructor(...values) {
    this.next = null;
    this.value = values.shift();
    let current = this;

    let currentValue;
    while (currentValue = values.shift()) {
      current.next = new LinkedList(currentValue);
      current = current.next;
    }
  }

  has(value) {
    let res = false;
    let current = this;
    do {
      if (current.value === value) {
        res = true;
        break;
      }
      current = current.next;
    }
    while (current);

    return res;
  }

  add(value) {
    let last = this;
    while (last.next) {
      last = last.next;
    }
    last.next = new LinkedList(value);
  }
}

export class HashMap {
  constructor() {
    this.table = [];
  }

  set(key, value) {
    this.table[hash(key)] = value;
  }

  get(key) {
    return this.table[hash(key)];
  }
}
