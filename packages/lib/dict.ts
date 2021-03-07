export default DictFormat{
    private dicts: Array<Dict> = []

    set Dict(dicts: Array<Dict>){
        this.dicts = dicts
    }
}

export class Dict{
    private code: String;
    private name: String;
    private valus: Array<DictItem>;
}

export class DictItem{
    private name: String;
    private value: String;
}