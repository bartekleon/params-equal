import { Suite } from "benchmark";

import paramsEqual from "./src/paramsEqual";

const time1 = new Date();
const time2 = new Date(12543745);

const log: any[] = [];

const setterGetter = {
  log,
  set yo(name: string) {
      this.log.push(name);
  },
  get yo() {
      return "this is set";
  }
};

const onlyGetter = {
  log,
  get yo() {
      return "this is set";
  }
};

/* tslint:disable */
const targets: any[] = [
  [NaN, NaN],
  [true, true],
  ["", ""],
  [2, 2],
  [undefined, undefined],
  [null, null],
  [new Boolean(true), new Boolean(true)],
  [new String("true"), new String("true")],
  [new Object(), new Object()],
  [false, new Boolean(false)],
  [[], []],
  [[""], []],
  [[function() {}], [function() {}]],
  [{}, []],
  [[{ hi: "hello" }], { hi: "hello" }],
  [function() {}, function() {}],
  [function hi() {}, function() {}],
  [function() {}, () => {}],
  [time1, time2],
  [{}, { hi: "hello" }],
  [{ hi: {} }, { hi: { hello: "hi" } }],
  [{ hi: { hello: 1 } }, { hi: { hello: "1" } }],
  [onlyGetter, setterGetter],
  [setterGetter, setterGetter]
];

targets.forEach((target) => {
  console.log("\n", target[0], ",", target[1]);
  new Suite()
    .add("paramsEqual", () => {
      paramsEqual(target[0], target[1]);
    })
    .on("cycle", (event: Event) => {
      console.log(`${String(event.target)}`);
    })
    .run();
});
