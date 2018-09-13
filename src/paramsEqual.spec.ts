/* tslint:disable */
import "jasmine";
import paramsEqual from "./paramsEqual";

describe("paramsEqual", () => {
  it("should work for NaN", () => {
    expect(paramsEqual(NaN, NaN)).toBeTruthy();
  });

  it("should work for null", () => {
    expect(paramsEqual(null, null)).toBeTruthy();
  });

  it("should work for booleans", () => {
    expect(paramsEqual(true, true)).toBeTruthy();
    expect(paramsEqual(true, false)).toBeFalsy();
  });

  it("should work for strings", () => {
    expect(paramsEqual("", "")).toBeTruthy();
    expect(paramsEqual("", "hi")).toBeFalsy();
  });

  it("should work for numbers", () => {
    expect(paramsEqual(2, 2)).toBeTruthy();
    expect(paramsEqual(2, 4)).toBeFalsy();
    expect(paramsEqual(2, "4")).toBeFalsy();
  });

  it("should work for regexp", () => {
    expect(paramsEqual(/a/g, /a/g)).toBeTruthy();
    expect(paramsEqual(/a/u, /a/g)).toBeFalsy();
    expect(paramsEqual(/b/g, /a/g)).toBeFalsy();
    expect(paramsEqual(/a/g, new RegExp('a', 'g'))).toBeTruthy();
  });

  it("should work for symbols", () => {
    expect(paramsEqual(Symbol(12), Symbol(12))).toBeTruthy();
    expect(paramsEqual(Symbol(12), Symbol("12"))).toBeTruthy();
    expect(paramsEqual(Symbol(12), Symbol(6))).toBeFalsy();
  });

  it("should work for `new` elements", () => {
    expect(paramsEqual(new Boolean(true), new Boolean(true))).toBeTruthy();
    expect(paramsEqual(new Boolean(true), new Boolean(false))).toBeFalsy();

    
    expect(paramsEqual(new String("true"), new String("true"))).toBeTruthy();
    expect(paramsEqual(new String("true"), new String("false"))).toBeFalsy();
    
    expect(paramsEqual(new Object(), new Object())).toBeTruthy();
    expect(paramsEqual(new Object("true"), new Object("false"))).toBeFalsy();
  });

  it("should work for arrays", () => {
    expect(paramsEqual([], [])).toBeTruthy();
    expect(paramsEqual([""], [])).toBeFalsy();
    expect(paramsEqual([function() {}], [function() {}])).toBeTruthy();
    expect(paramsEqual({}, [])).toBeFalsy();
    expect(paramsEqual([{ hi: "hello" }], { hi: "hello" })).toBeFalsy();
  });

  it("should work for functions", () => {
    expect(paramsEqual(function() {}, function() {})).toBeTruthy();
    expect(paramsEqual(function hi() {}, function() {})).toBeFalsy();
    expect(paramsEqual(function() {}, () => {})).toBeFalsy();
    expect(paramsEqual(function() {}, function() {return false; })).toBeFalsy();
    expect(paramsEqual(async function() {}, function() {})).toBeFalsy();
  });

  it("should work for dates", () => {
    const time1 = new Date(20532795);
    const time2 = new Date(12543745);
    expect(paramsEqual(time1, time1)).toBeTruthy();
    expect(paramsEqual(time1, time2)).toBeFalsy();
  });

  it("should work for objects", () => {
    expect(paramsEqual({}, {})).toBeTruthy();
    expect(paramsEqual({}, { hi: "hello" })).toBeFalsy();
    expect(paramsEqual({ hi: "hello" }, { hi: "hello" })).toBeTruthy();
    expect(paramsEqual({ hi: "hello" }, {})).toBeFalsy();
    expect(paramsEqual([{ hi: "hello" }, "hi"], [{ hi: "hello" }, "hi"])).toBeTruthy();
    expect(paramsEqual([{ hi: "hello" }], [{ hi: "hello" }, "hi"])).toBeFalsy();
    expect(paramsEqual({ hi: "hello" }, { hi: {} })).toBeFalsy();
    expect(paramsEqual({ hi: "hello" }, { hi: { hello: "hi" } })).toBeFalsy();
    expect(paramsEqual({ hi: {} }, { hi: { hello: "hi" } })).toBeFalsy();
    expect(paramsEqual({ hi: { hello: 1 } }, { hi: { hello: "1" } })).toBeFalsy();
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

    expect(paramsEqual(setterGetter, normal)).toBeFalsy();
    expect(paramsEqual(normal, setterGetter)).toBeFalsy();
    expect(paramsEqual(setterGetter, setterGetter)).toBeTruthy();
    expect(paramsEqual(onlySetter, setterGetter)).toBeFalsy();
    expect(paramsEqual(onlyGetter, setterGetter)).toBeFalsy();
    expect(paramsEqual(onlySetter, normal)).toBeFalsy();
    expect(paramsEqual(onlyGetter, normal)).toBeFalsy();
  });
  it("should throw error if there is infinite nested prop", () => {
    const a = { hi: "hello", s: {} };
    const b = { hi: "hello", s: {} };
    const c = { hi: "h", c: {} };

    c.c = c;

    a.s = a;
    b.s = c;

    expect(() => paramsEqual(a, b)).toThrow(new RangeError("You are not allowed to create infinite nest"));
  });
});
