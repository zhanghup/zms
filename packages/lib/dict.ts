export default class DictFormat {
    private dicts: Dict[]

    set Dict(dicts: Array<Dict>) {
        this.dicts = dicts
    }
}

export interface Dict {
    code: String;
    name: String;
    values: DictItem[];
}

export interface DictItem {
    name: String;
    value: String;
}