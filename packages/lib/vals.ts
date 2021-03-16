import DictFormat from "./dict";

export default class Vals {
    private dict: DictFormat = new DictFormat();

    constructor() {
    }

    public $v(value: any, ...keyOrFormat: string[]) {
        if (keyOrFormat.length === 0) {
            return value
        }

        let v = value
        for (let kf of keyOrFormat) {
            if (/^[0-9a-zA-Z_.$\[\]\s><='"]+$/.test(kf)) {
                v = this.$value(kf, v)
            } else if (/^(D|dict):([0-9a-zA-Z]+)$/.test(kf)) {

            } else if (/^(T|time):.+$/.test(kf)) {
                v = this.formatTime(kf.replace("T:","").replace("time:",""),v)
            }

        }
        return v
    }

    /**
     * 示例1. a.b.c.d.e
     * 示例2. a.b.[1].c.d.e
     * 示例3. a.b.[f.g=='2'].c.d.e
     *
     * @param value 需要数据格式化的对象
     * @param key 需要取数的对象
     */
    private $value(key: string, value: any): any {
        if (key === "" || value === null || value === undefined) {
            return value
        }

        /** 示例1. a.b.c.d.e */
        let kl = key.match(/^[a-z0-9A-Z_$]+/i)
        if (kl && kl.length > 0) {
            let k = kl[0]
            if (k.indexOf(".") === 0) {
                k = k.slice(1)
            }
            let klast = key.replace(k, "")
            if (klast.indexOf(".") === 0) {
                klast = klast.slice(1)
            }
            if (value instanceof Array) {
                return this.$value(klast, value.map(r => r[k]))
            } else {
                return this.$value(klast, value[k])
            }
        }

        /** 示例2. a.b.[1].c.d.e */
        kl = key.match(/^\[\d+\]/i)
        if (kl && kl.length > 0) {
            let k = parseInt(kl[0].slice(1, -1))
            let klast = key.replace(kl[0], "")
            if (klast.indexOf(".") === 0) {
                klast = klast.slice(1)
            }

            return this.$value(klast, value[k])
        }

        /** 示例3. a.b.[f.g=='2'].c.d.e */
        kl = key.match(/^\[[a-z0-9A-Z_$.\s'"=><]+\]/i)
        if (kl && kl.length > 0) {
            let k = kl[0].slice(1, -1)
            let klast = key.replace(kl[0], "")
            if (klast.indexOf(".") === 0) {
                klast = klast.slice(1)
            }
            let v = this.filter(k, value)
            return this.$value(klast, v)
        }
    }

    private filter(key: string, obj: Array<any>): any {
        let [, left, operate, right] = key.match(/(\S+)\s?(<=|<|===|==|>=|>)\s?(\S+)/) || [];

        if (left && operate && right) {
            switch (operate) {
                case "<":
                    return obj.filter((r) => this.$value(left, r) < this.typeValue(right));
                case "<=":
                    return obj.filter((r) => this.$value(left, r) <= this.typeValue(right));
                case "===":
                    return obj.find((r) => this.$value(left, r) == this.typeValue(right));
                case "==":
                    return obj.filter((r) => this.$value(left, r) == this.typeValue(right));
                case ">=":
                    return obj.filter((r) => this.$value(left, r) >= this.typeValue(right));
                case ">":
                    return obj.filter((r) => this.$value(left, r) > this.typeValue(right));
            }
        }
        return null;
    }

    private typeValue(obj: any) {
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

    private formatTime(opt: string, value: number) {
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
            {key: /Y+/, value: t.getFullYear().toString()}, // 年
            {key: /M+/, value: (t.getMonth() + 1).toString()}, // 月
            {key: /D+/, value: t.getDate().toString()}, // 日
            {key: /H+/, value: t.getHours().toString()}, // 时
            {key: /m+/, value: t.getMinutes().toString()}, // 分
            {key: /s+/, value: t.getSeconds().toString()}, // 秒
            {key: /S+/, value: t.getMilliseconds().toString()}, // 耗秒
        ];

        for (let idx = 0; idx < opts.length; idx++) {
            let o = opts[idx];
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

    set Dict(dict: DictFormat) {
        this.dict = dict
    }
}


