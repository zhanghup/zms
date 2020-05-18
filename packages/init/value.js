import Vue from "vue";

export class value {
  // 不支持 "[","]" 字符作为属性名称
  // 1. key: a.b.c                     value: Object   format: time:YYYY-MM-DD
  // 2. key: a.b[0].c                  value: Object   format: time:YYYY-MM-DD
  // 3. key: a1.b1.[d1 == 's1'].c1      value: Object   format: time:YYYY-MM-DD
  // 4. key: a1.b1.[d1.e1 == 's1'].c1   value: Object   format: time:YYYY-MM-DD
  static GetValue(key, obj) {
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
          return obj.filter((r) => self.GetValue(left, r) < self.typeValue(right));
        case "<=":
          return obj.filter((r) => self.GetValue(left, r) <= self.typeValue(right));
        case "===":
          return obj.find((r) => self.GetValue(left, r) == self.typeValue(right));
        case "==":
          return obj.filter((r) => self.GetValue(left, r) == self.typeValue(right));
        case ">=":
          return obj.filter((r) => self.GetValue(left, r) >= self.typeValue(right));
        case ">":
          return obj.filter((r) => self.GetValue(left, r) > self.typeValue(right));
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
    else if (/^".*?"$|^'.*?'$|^`.*?`$/.test(obj)) return obj.slice(1, -1); // 字符串
    return null;
  }

  static Format(format, value) {
    if (!format) return value;

    if (typeof format === "string") {
      let strs = format.split(":");
      let opt = "";
      if (strs.length > 1) {
        opt = strs.slice(1).join(":");
      }

      switch (strs[0]) {
        case "template":
          return this.formatTemplate(opt, value);
        case "toFixed":
          return this.formatToFixed(opt, value);
        case "time":
          return this.formatTime(opt, value);
        case "dict":
          return this.formatDict(opt, value);
      }
    } else if (format instanceof Object) {
      return this.formatFilter(format, value);
    }
  }

  static formatFilter(opt, value) {
    let self = this;
    for (let key in opt) {
      let nns = key.match(/\s?(<=|<|===|==|>=|>)\s?(\S+)/);
      if (nns) {
        let [, operate, right] = nns;
        switch (operate) {
          case "<":
            if (value < self.typeValue(right)) {
              return opt[key];
            }
            break;
          case "<=":
            if (value <= self.typeValue(right)) {
              return opt[key];
            }
            break;
          case "===":
            if (value === self.typeValue(right)) {
              return opt[key];
            }
            break;
          case "==":
            if (value == self.typeValue(right)) {
              return opt[key];
            }
            break;
          case ">=":
            if (value >= self.typeValue(right)) {
              return opt[key];
            }
            break;
          case ">":
            if (value > self.typeValue(right)) {
              return opt[key];
            }
            break;
        }
      } else if (key == value) {
        return opt[key];
      }
    }
    return null;
  }

  static formatTime(opt, value) {
    if (value == null) {
      return null;
    }
    let t = null;
    if ((value + "").length == 10) {
      t = new Date(value * 1000);
    } else if ((value + "").length == 13) {
      t = new Date(value);
    } else {
      t = new Date(value * 1000);
    }

    if (!opt) {
      opt = "YYYY-MM-DD";
    }

    let opts = [
      { key: /Y+/, value: t.getFullYear().toString() }, // 年
      { key: /M+/, value: (t.getMonth() + 1).toString() }, // 月
      { key: /D+/, value: t.getDate().toString() }, // 日
      { key: /H+/, value: t.getHours().toString() }, // 时
      { key: /m+/, value: t.getMinutes().toString() }, // 分
      { key: /S+/, value: t.getSeconds().toString() }, // 秒
    ];

    for (let o of opts) {
      let match = opt.match(o.key);
      if (!match) continue;
      let len = match[0].length;
      let value = o.value;
      switch (len) {
        case 1:
          break;
        case 2:
          value = ("000" + value).slice(-2);
          break;
        case 3:
          value = ("000" + value).slice(-3);
          break;
        case 4:
          value = ("000" + value).slice(-4);
          break;
      }
      opt = opt.replace(o.key, value);
    }
    return opt;
  }

  static formatDict(opt, value) {
    if (!opt) return null;
    let dict = this.dictmap[opt];
    if (!dict || !dict.values) return null;
    let o = dict.values.find((r) => r.value == value);
    return o.name;
  }
  /*
    template: jfkasdlj$valuefjdaskfjaskl
  */
  static formatTemplate(opt, value) {
    if (!opt) return value;
    return opt.replace(/\$value/g, value);
  }
  static formatToFixed(opt, value) {
    if (opt == undefined) {
      opt = 0;
    } else {
      opt = parseInt(opt);
    }
    return value.toFixed(opt);
  }
}

value.dictmap = {};

// GetValue
function GetValue(key, obj, ...format) {
  let o = JSON.parse(JSON.stringify(obj));
  let v = value.GetValue(key, o);
  if (format && format.length > 0) {
    for (let f of format) {
      v = value.Format(f, v);
    }
  }
  return v;
}
GetValue.install = function (Vue) {
  Object.defineProperty(Vue.prototype, "$v", {
    get: function get() {
      return GetValue;
    },
  });
};
Vue.use(GetValue);

// GetFormat
function GetFormat(v, ...format) {
  if (format && format.length > 0) {
    for (let f of format) {
      v = value.Format(f, v);
    }
  }
  return v;
}
GetFormat.install = function (Vue) {
  Object.defineProperty(Vue.prototype, "$f", {
    get: function get() {
      return GetFormat;
    },
  });
};
Vue.use(GetFormat);

export { GetValue, GetFormat };
