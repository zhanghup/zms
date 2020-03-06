import value from "../packages/value";

describe("value.js", () => {
  it("测试 a.b.c.e.f", () => {
    for (let i = 0; i < 10000; i++) {
      value.GetValue("a.b.c.e.f", { a: { b: { c: { d: { e: { f: 1 } } } } } });
    }
  });
  it("测试 a.b.c.[0].e.f", () => {
    for (let i = 0; i < 10000; i++) {
      value.GetValue("a.b.c.[0].e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }] } } });
    }
  });
  it("测试 a.b.c.[d.e.f === 1].e.f", () => {
    for (let i = 0; i < 10000; i++) {
      value.GetValue("a.b.c.[d.e.f === 1].e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 2 } } }, { d: { e: { f: 3 } } }] } } });
    }
  });
});
