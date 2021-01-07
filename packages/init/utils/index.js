import obj from "./object"
import {v4} from 'uuid';
import md5 from "./md5"
import ajax from "./ajax"

function Print(){
    var userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
    if (userAgent.indexOf("trident") > -1) {
        alert("请使用【谷歌浏览器】或者【360浏览器】打印");
        return false;
    } else if (userAgent.indexOf("msie") > -1) {
        var onlyChoseAlert = simpleAlert({
            content: "请使用【谷歌浏览器】或者【360浏览器】打印",
            buttons: {
                确定: function () {
                    onlyChoseAlert.close();
                }
            }
        });
        alert("请使用【谷歌浏览器】或者【360浏览器】打印");
        return false;
    } else {
        window.print();
    }
}

export default {
    ajax,
    obj,
    uuid: v4,
    md5,
    // 打印
    print:Print
}
