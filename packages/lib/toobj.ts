function fmtField(obj:any, field: string, value:any, i = 0) {
    let fields = field.split(".");

    if (i < fields.length - 1) {
        let f = fields[i];
        if (obj[f] === undefined) {
            obj[f] = fmtField({}, field, value, i + 1);
        } else {
            obj[f] = fmtField(obj[f], field, value, i + 1);
        }
        return obj;
    } else if (i === fields.length - 1) {
        obj[fields[i]] = value;
        return obj;
    }
    return null;
}

export default function (list: Array<any> | any) {
    let result = {};

    if (list instanceof Array) {
        for (let o of list) {
            fmtField(result, o.key, o.value);
        }
    } else {
        for (let k in list) {
            fmtField(result, k, list[k]);
        }
    }

    return result;
}
