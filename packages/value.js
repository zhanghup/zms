export default class value {
  // 不支持 "[","]" 字符作为属性名称
  // 1. key: a.b.c                     value: Object   format: time:YYYY-MM-DD
  // 2. key: a.b[0].c                  value: Object   format: time:YYYY-MM-DD
  // 3. key: a1.b1.[d1 == 's1'].c1      value: Object   format: time:YYYY-MM-DD
  // 4. key: a1.b1.[d1.e1 == 's1'].c1   value: Object   format: time:YYYY-MM-DD
  static GetValue(key, obj, format) {
    if (key == null) return null;
    if (typeof key !== "string") return null;
    key = key.trim();
    if (key == "") return null;
    if (obj == null) return null;
    if (!(obj instanceof Object) && !(obj instanceof Array)) return null;

    let keys = key.split(".");

    for (let i = 0; i < keys.length; i++) {
      // 情况1
      if (keys[i].indexOf("[") == -1 && keys[i].indexOf("]") == -1) {
        if (obj == undefined) {
          return null;
        }
        obj = obj[keys[i]];
      }

      // 情况2
      else if (/^\[(\d+)\]$/.test(keys[i])) {
        let [, idx] = keys[i].match(/^\[(\d+)\]$/);

        if (obj instanceof Array) {
          if (idx < obj.length) {
            obj = obj[idx];
            if (obj == null) return null;
          } else {
            console.error(`数组越界,index:${idx}`);
            return null;
          }
        } else {
          console.error(`数据类型异常,index:${idx}`);
          return null;
        }
      }

      // 情况3
      else if (keys[i].startsWith("[") && keys[i].endsWith("]")) {
        obj = this.filter(keys[i].slice(1, keys[i].length - 1), obj);
      }
      // 情况4
      else if (keys[i].startsWith("[")) {
        let field = [];
        for (; !keys[i].endsWith("]"); i++) {
          field.push(keys[i]);
        }
        field.push(keys[i]);
        let strs = field.join(".");
        obj = this.filter(strs.slice(1, strs.length - 1), obj);
      }
    }
    return obj;
  }

  static filter(key, obj) {
    if (!(obj instanceof Array)) return null;
    let self = this;
    let [, left, operate, right] = key.match(/(\S+)\s?(<=|<|===|==|>=|>)\s?(\S+)/);

    if (left && operate && right) {
      switch (operate) {
        case "<":
          return obj.filter(r => self.GetValue(left, r) < self.typeValue(right));
        case "<=":
          return obj.filter(r => self.GetValue(left, r) <= self.typeValue(right));
        case "===":
          return obj.find(r => self.GetValue(left, r) == self.typeValue(right));
        case "==":
          return obj.filter(r => self.GetValue(left, r) == self.typeValue(right));
        case ">=":
          return obj.filter(r => self.GetValue(left, r) >= self.typeValue(right));
        case ">":
          return obj.filter(r => self.GetValue(left, r) > self.typeValue(right));
      }
    }

    return null;
  }

  static typeValue(obj) {
    if (typeof obj !== "string") return null;
    obj = obj.trim();
    if (obj == "") return null;
    else if (obj == "undefined") return undefined;
    else if (obj == "null") return null;
    else if (obj == "true") return true;
    else if (obj == "false") return false;
    else if (/^\d+$/.test(obj)) return parseInt(obj);
    else if (/^\d+\.\d+$/.test(obj)) return parseFloat(obj);
    else if (/^".*?"$|^'.*?'$|^`.*?`$/.test(obj)) return obj.slice(1, -1);
    return null;
  }

  static Format(format, value) {}
}
