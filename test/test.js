import value from "../packages/value";

describe("value.js 值测试", () => {
  it("测试 a.b.c.d.e.f", () => {
    for (let i = 0; i < 1; i++) {
      expect(value.GetValue("a.b.c.d.e.f", { a: { b: { c: { d: { e: { f: 1 } } } } } })).toBe(1);
    }
  });
  it("测试 a.b.c.[0].d.e.f", () => {
    for (let i = 0; i < 1; i++) {
      expect(value.GetValue("a.b.c.[0].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }] } } })).toBe(1);
    }
  });
  it("测试 a.b.c.[d.e.f === 1].d.e.f", () => {
    for (let i = 0; i < 1; i++) {
      expect(value.GetValue("a.b.c.[d.e.f === 1].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 2 } } }, { d: { e: { f: 3 } } }] } } })).toBe(1);
    }
  });
  it("测试 a.b.c.[k === 2].d.e.f", () => {
    for (let i = 0; i < 1; i++) {
      expect(
        value.GetValue("a.b.c.[k === 2].d.e.f", {
          a: {
            b: {
              c: [
                { d: { e: { f: 1 } }, k: 2 },
                { d: { e: { f: 2 } }, k: 3 },
                { d: { e: { f: 3 } }, k: 4 }
              ]
            }
          }
        })
      ).toBe(1);
    }
  });
});

describe("value.js 性能测试", () => {
  it("测试 a.b.c.d.e.f", () => {
    for (let i = 0; i < 100000; i++) {
      value.GetValue("a.b.c.d.e.f", { a: { b: { c: { d: { e: { f: 1 } } } } } });
    }
  });
  it("测试 a.b.c.[0].d.e.f", () => {
    for (let i = 0; i < 100000; i++) {
      value.GetValue("a.b.c.[0].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }] } } });
    }
  });
  it("测试 a.b.c.[d.e.f === 2].d.e.f", () => {
    for (let i = 0; i < 100000; i++) {
      value.GetValue("a.b.c.[d.e.f === 2].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 }, k: 2 } }, { d: { e: { f: 2 }, k: 3 } }, { d: { e: { f: 3 } }, k: 4 }] } } });
    }
  });
  it("测试 a.b.c.[k === 2].d.e.f", () => {
    for (let i = 0; i < 100000; i++) {
      value.GetValue("a.b.c.[k === 2].d.e.f", {
        a: {
          b: {
            c: [
              { d: { e: { f: 1 } }, k: 2 },
              { d: { e: { f: 2 } }, k: 3 },
              { d: { e: { f: 3 } }, k: 4 }
            ]
          }
        }
      });
    }
  });
});
