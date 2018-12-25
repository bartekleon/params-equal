"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const chai_1 = require("chai");
const paramsEqual_1 = require("./paramsEqual");
describe("paramsEqual", () => {
    it("should work for NaN", () => {
        chai_1.expect(paramsEqual_1.default(NaN, NaN)).to.be.true;
        chai_1.expect(paramsEqual_1.default(NaN, 0 / 0)).to.be.true;
    });
    it("should work for null", () => {
        chai_1.expect(paramsEqual_1.default(null, null)).to.be.true;
    });
    it("should work for booleans", () => {
        chai_1.expect(paramsEqual_1.default(true, true)).to.be.true;
        chai_1.expect(paramsEqual_1.default(true, false)).to.be.false;
    });
    it("should work for strings", () => {
        chai_1.expect(paramsEqual_1.default("", "")).to.be.true;
        chai_1.expect(paramsEqual_1.default("", "hi")).to.be.false;
    });
    it("should work for numbers", () => {
        chai_1.expect(paramsEqual_1.default(2, 2)).to.be.true;
        chai_1.expect(paramsEqual_1.default(2, 4)).to.be.false;
        chai_1.expect(paramsEqual_1.default(2, "4")).to.be.false;
        chai_1.expect(paramsEqual_1.default(-0, +0)).to.be.false;
        chai_1.expect(paramsEqual_1.default(Infinity, Infinity)).to.be.true;
        chai_1.expect(paramsEqual_1.default(Infinity, 1 / 0)).to.be.true;
        chai_1.expect(paramsEqual_1.default(-0, -0)).to.be.true;
    });
    it("should work for regexp", () => {
        chai_1.expect(paramsEqual_1.default(/a/g, /a/g)).to.be.true;
        chai_1.expect(paramsEqual_1.default(/a/u, /a/g)).to.be.false;
        chai_1.expect(paramsEqual_1.default(/b/g, /a/g)).to.be.false;
        chai_1.expect(paramsEqual_1.default(/a/g, new RegExp('a', 'g'))).to.be.true;
    });
    it("should work for symbols", () => {
        chai_1.expect(paramsEqual_1.default(Symbol(12), Symbol(12))).to.be.true;
        chai_1.expect(paramsEqual_1.default(Symbol(12), Symbol("12"))).to.be.true;
        chai_1.expect(paramsEqual_1.default(Symbol(12), Symbol(6))).to.be.false;
    });
    it("should work for `new` elements", () => {
        chai_1.expect(paramsEqual_1.default(new Boolean(true), new Boolean(true))).to.be.true;
        chai_1.expect(paramsEqual_1.default(new Boolean(true), new Boolean(false))).to.be.false;
        chai_1.expect(paramsEqual_1.default(new String("true"), new String("true"))).to.be.true;
        chai_1.expect(paramsEqual_1.default(new String("true"), new String("false"))).to.be.false;
        chai_1.expect(paramsEqual_1.default(new Object(), new Object())).to.be.true;
        chai_1.expect(paramsEqual_1.default(new Object("true"), new Object("false"))).to.be.false;
    });
    it("should work for arrays", () => {
        chai_1.expect(paramsEqual_1.default([], [])).to.be.true;
        chai_1.expect(paramsEqual_1.default([2, 2, 1], [2, 1, 1])).to.be.false;
        chai_1.expect(paramsEqual_1.default([""], [])).to.be.false;
        chai_1.expect(paramsEqual_1.default([new Function()], [new Function()])).to.be.true;
        chai_1.expect(paramsEqual_1.default({}, [])).to.be.false;
        chai_1.expect(paramsEqual_1.default([{ hi: "hello" }], { hi: "hello" })).to.be.false;
    });
    it("should work for functions", () => {
        chai_1.expect(paramsEqual_1.default(new Function(), new Function())).to.be.true;
        chai_1.expect(paramsEqual_1.default(function hi() { }, function () { })).to.be.false;
        chai_1.expect(paramsEqual_1.default(function () { }, () => { })).to.be.false;
        chai_1.expect(paramsEqual_1.default(function () { }, function () { return false; })).to.be.false;
        chai_1.expect(paramsEqual_1.default(async function () { }, function () { })).to.be.false;
    });
    it("should work for dates", () => {
        const time1 = new Date(20532795);
        const time2 = new Date(12543745);
        chai_1.expect(paramsEqual_1.default(time1, time1)).to.be.true;
        chai_1.expect(paramsEqual_1.default(time1, time2)).to.be.false;
    });
    it("should work for objects", () => {
        chai_1.expect(paramsEqual_1.default({}, {})).to.be.true;
        chai_1.expect(paramsEqual_1.default({}, { hi: "hello" })).to.be.false;
        chai_1.expect(paramsEqual_1.default({ hi: "hello" }, { hi: "hello" })).to.be.true;
        chai_1.expect(paramsEqual_1.default({ hi: "hello" }, {})).to.be.false;
        chai_1.expect(paramsEqual_1.default([{ hi: "hello" }, "hi"], [{ hi: "hello" }, "hi"])).to.be.true;
        chai_1.expect(paramsEqual_1.default([{ hi: "hello" }], [{ hi: "hello" }, "hi"])).to.be.false;
        chai_1.expect(paramsEqual_1.default({ hi: "hello" }, { hi: {} })).to.be.false;
        chai_1.expect(paramsEqual_1.default({ hi: "hello" }, { hi: { hello: "hi" } })).to.be.false;
        chai_1.expect(paramsEqual_1.default({ hi: {} }, { hi: { hello: "hi" } })).to.be.false;
        chai_1.expect(paramsEqual_1.default({ hi: { hello: 1 } }, { hi: { hello: "1" } })).to.be.false;
    });
    it("should works with setters and getters", () => {
        const log = [];
        const setterGetter = {
            log,
            set yo(name) {
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
            set yo(name) {
                this.log.push(name);
            }
        };
        const normal = {
            log: [],
            yo: "this is set"
        };
        chai_1.expect(paramsEqual_1.default(setterGetter, normal)).to.be.false;
        chai_1.expect(paramsEqual_1.default(normal, setterGetter)).to.be.false;
        chai_1.expect(paramsEqual_1.default(setterGetter, setterGetter)).to.be.true;
        chai_1.expect(paramsEqual_1.default(onlySetter, setterGetter)).to.be.false;
        chai_1.expect(paramsEqual_1.default(onlyGetter, setterGetter)).to.be.false;
        chai_1.expect(paramsEqual_1.default(onlySetter, normal)).to.be.false;
        chai_1.expect(paramsEqual_1.default(onlyGetter, normal)).to.be.false;
    });
    it("should throw error if there is infinite nested prop", () => {
        const a = { hi: "hello", s: {} };
        const b = { hi: "hello", s: {} };
        const c = { hi: "h", c: {} };
        c.c = c;
        a.s = a;
        b.s = c;
        chai_1.expect(() => paramsEqual_1.default(a, b)).to.throw(RangeError, "You are not allowed to create infinite nest");
    });
});
//# sourceMappingURL=paramsEqual.spec.js.map