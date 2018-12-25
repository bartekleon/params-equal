/* tslint:disable */
import { expect } from 'chai';
import paramsEqual from "./paramsEqual";

describe("paramsEqual", () => {
  it("should work for NaN", () => {
    expect(paramsEqual(NaN, NaN)).to.be.true;
    expect(paramsEqual(NaN, 0 / 0)).to.be.true;
  });

  it("should work for null", () => {
    expect(paramsEqual(null, null)).to.be.true;
  });

  it("should work for booleans", () => {
    expect(paramsEqual(true, true)).to.be.true;
    expect(paramsEqual(true, false)).to.be.false;
  });

  it("should work for strings", () => {
    expect(paramsEqual("", "")).to.be.true;
    expect(paramsEqual("", "hi")).to.be.false;
  });

  it("should work for numbers", () => {
    expect(paramsEqual(2, 2)).to.be.true;
    expect(paramsEqual(2, 4)).to.be.false;
    expect(paramsEqual(2, "4")).to.be.false;
    expect(paramsEqual(-0, +0)).to.be.false;
    expect(paramsEqual(Infinity, Infinity)).to.be.true;
    expect(paramsEqual(Infinity, 1 / 0)).to.be.true;
    expect(paramsEqual(-0, -0)).to.be.true;
  });

  it("should work for regexp", () => {
    expect(paramsEqual(/a/g, /a/g)).to.be.true;
    expect(paramsEqual(/a/u, /a/g)).to.be.false;
    expect(paramsEqual(/b/g, /a/g)).to.be.false;
    expect(paramsEqual(/a/g, new RegExp('a', 'g'))).to.be.true;
  });

  it("should work for symbols", () => {
    expect(paramsEqual(Symbol(12), Symbol(12))).to.be.true;
    expect(paramsEqual(Symbol(12), Symbol("12"))).to.be.true;
    expect(paramsEqual(Symbol(12), Symbol(6))).to.be.false;
  });

  it("should work for `new` elements", () => {
    expect(paramsEqual(new Boolean(true), new Boolean(true))).to.be.true;
    expect(paramsEqual(new Boolean(true), new Boolean(false))).to.be.false;

    expect(paramsEqual(new String("true"), new String("true"))).to.be.true;
    expect(paramsEqual(new String("true"), new String("false"))).to.be.false;

    expect(paramsEqual(new Object(), new Object())).to.be.true;
    expect(paramsEqual(new Object("true"), new Object("false"))).to.be.false;
  });

  it("should work for arrays", () => {
    expect(paramsEqual([], [])).to.be.true;
    expect(paramsEqual([2, 2, 1], [2, 1, 1])).to.be.false;
    expect(paramsEqual([""], [])).to.be.false;
    expect(paramsEqual([new Function()], [new Function()])).to.be.true;
    expect(paramsEqual({}, [])).to.be.false;
    expect(paramsEqual([{ hi: "hello" }], { hi: "hello" })).to.be.false;
  });

  it("should work for functions", () => {
    expect(paramsEqual(new Function(), new Function())).to.be.true;
    expect(paramsEqual(function hi() {}, function() {})).to.be.false;
    expect(paramsEqual(function() {}, () => {})).to.be.false;
    expect(paramsEqual(function() {}, function() {return false; })).to.be.false;
    expect(paramsEqual(async function() {}, function() {})).to.be.false;
  });

  it("should work for dates", () => {
    const time1 = new Date(20532795);
    const time2 = new Date(12543745);
    expect(paramsEqual(time1, time1)).to.be.true;
    expect(paramsEqual(time1, time2)).to.be.false;
  });

  it("should work for objects", () => {
    expect(paramsEqual({}, {})).to.be.true;
    expect(paramsEqual({}, { hi: "hello" })).to.be.false;
    expect(paramsEqual({ hi: "hello" }, { hi: "hello" })).to.be.true;
    expect(paramsEqual({ hi: "hello" }, {})).to.be.false;
    expect(paramsEqual([{ hi: "hello" }, "hi"], [{ hi: "hello" }, "hi"])).to.be.true;
    expect(paramsEqual([{ hi: "hello" }], [{ hi: "hello" }, "hi"])).to.be.false;
    expect(paramsEqual({ hi: "hello" }, { hi: {} })).to.be.false;
    expect(paramsEqual({ hi: "hello" }, { hi: { hello: "hi" } })).to.be.false;
    expect(paramsEqual({ hi: {} }, { hi: { hello: "hi" } })).to.be.false;
    expect(paramsEqual({ hi: { hello: 1 } }, { hi: { hello: "1" } })).to.be.false;
  });

  it("should works with setters and getters", () => {
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

    const onlySetter = {
      log,
      set yo(name: string) {
        this.log.push(name);
      }
    };

    const normal = {
      log: [],
      yo: "this is set"
    };

    expect(paramsEqual(setterGetter, normal)).to.be.false;
    expect(paramsEqual(normal, setterGetter)).to.be.false;
    expect(paramsEqual(setterGetter, setterGetter)).to.be.true;
    expect(paramsEqual(onlySetter, setterGetter)).to.be.false;
    expect(paramsEqual(onlyGetter, setterGetter)).to.be.false;
    expect(paramsEqual(onlySetter, normal)).to.be.false;
    expect(paramsEqual(onlyGetter, normal)).to.be.false;
  });
  it("should throw error if there is infinite nested prop", () => {
    const a = { hi: "hello", s: {} };
    const b = { hi: "hello", s: {} };
    const c = { hi: "h", c: {} };

    c.c = c;

    a.s = a;
    b.s = c;

    expect(() => paramsEqual(a, b)).to.throw(RangeError, "You are not allowed to create infinite nest");
  });
});
