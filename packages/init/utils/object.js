function fmtField(obj, field, value, i = 0) {
  let fields = field.split(".");

  if (i < fields.length - 1) {
    let f = fields[i];
    if (obj[f] === undefined) {
      obj[f] = fmtField({}, field, i + 1, value);
    } else {
      obj[f] = fmtField(obj[f], field, i + 1, value);
    }
    return obj;
  } else if (i === fields.length - 1) {
    obj[fields[i]] = value;
    return obj;
  }
  return null;
}

export default function(list) {
  let result = {};
  for (let o of list) {
    fmtField(result, o.key, o.value);
  }
  return result;
}