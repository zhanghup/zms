import DictFormat from "./dict";

export default class Vals{
    private dict: DictFormat

    constructor() {
    }

    public $v(key:string,value:any,...fmt: string[]){
        let v = this.$value(key,value)
        if (fmt.length > 0){
            return this.$f(v,...fmt)
        }else{
            return v
        }
    }

    private $value(key: string,value: any){

    }

    public  $f(value: any,...fmt: string[]){

    }

    set Dict(dict: DictFormat) {
        this.dict = dict
    }
}


