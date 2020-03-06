class value {
  // 不支持"中文","#","$"等字符作为属性名称
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
      if (/^[_0-9a-zA-Z]+$/.test(keys[i])) {
        obj = obj[keys[i]];
        if (obj == undefined) {
          return null;
        }
      }

      // 情况2
      else if (/^\[(\d+)\]$/.test(keys[i])) {
        let [_, idx] = keys[i].match(/^\[(\d+)\]$/);

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
      else if (/^\[(.+)\]$/.test(keys[i])) {
        let [_, param] = keys[i].match(/^\[(.+)\]$/);
        obj = this.filter(param, obj);
      }
      // 情况4
      else if (/^\[/.test(keys[i])) {
        let field = [];
        do {
          field.push(keys[i]);
          i++;
        } while (/]$/.test(keys[i]));
        i--;
        let [_, param] = field.join(".").match(/^\[(.+)\]$/);
        obj = this.filter(param, obj);
      }
    }
    return obj;
  }

  static filter(key, obj) {
    if (!(obj instanceof Array)) return null;
    let self = this;
    let field, ope;

    if (/\S+\s?<\s?\S+/.test(key)) {
      [field, ope] = key.split("<");
      return obj.filter(r => self.GetValue(field, r) < self.typeValue(ope));
    } else if (/\S+\s?<=\s?\S+/.test(key)) {
      [field, ope] = key.split("<=");
      return obj.filter(r => self.GetValue(field, r) <= self.typeValue(ope));
    } else if (/\S+\s?===\s?\S+/.test(key)) {
      [field, ope] = key.split("===");
      return obj.find(r => self.GetValue(field, r) == self.typeValue(ope));
    } else if (/\S+\s?==\s?\S+/.test(key)) {
      [field, ope] = key.split("==");
      return obj.filter(r => self.GetValue(field, r) == self.typeValue(ope));
    } else if (/\S\s?>=\s?\S+/.test(key)) {
      [field, ope] = key.split(">=");
      return obj.filter(r => self.GetValue(field, r) >= self.typeValue(ope));
    } else if (/\S+\s?>\s?\S+/.test(key)) {
      [field, ope] = key.split(">");
      return obj.filter(r => self.GetValue(field, r) > self.typeValue(ope));
    }

    return null;
  }

  static typeValue(obj) {
    if (typeof obj !== "string") return null;
    obj = obj.trim();
    if (obj == "") return null;
    else if (obj == "true") return true;
    else if (obj == "false") return false;
    else if (/^\d+$/.test(obj)) return parseInt(obj);
    else if (/^\d+\.\d+$/.test(obj)) return parseFloat(obj);
    else if (/^".*?"$|^'.*?'$|^`.*?`$/.test(obj)) return obj.slice(1, -1);
    return null;
  }

  static Format(format, value) {}
}

export default value;
