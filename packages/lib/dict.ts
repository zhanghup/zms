export default class DictFormat {
    private dicts: Dict[] = []
    private dictmap: DictMapIndx = {}

    public GetName(key: string, value: string): string | null | undefined {
        let dict = this.dictmap[key]
        if (!dict) return null
        let values = dict.values
        if (!values || values.length == 0) return null
        let o = values.find(r => r.value == value)
        if (!o) {
            return null
        }
        return o.name
    }

    public Dict(key: string): Dict {
        return this.dictmap[key]
    }

    public DictItems(key: string): DictItem[] {
        let dict = this.Dict(key)
        if (!dict) return []
        return dict.values
    }

    public SetDict(dicts: Dict[]) {
        this.dicts = dicts
        this.dictmap = {}
        for (let o of dicts) {
            this.dictmap[o.code] = o
        }
    }
}

interface DictMapIndx {
    [index: string]: Dict
}

export interface Dict {
    code: string;
    name: string;
    values: DictItem[];
}

export interface DictItem {
    name: string;
    value: string;
}