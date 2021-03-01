function Ajax({url,method = "POST",async = true,header={},contentType = "application/json",timeout = 10000, data = {},success,error}){
  var xhr 
  if (window.XMLHttpRequest){
      xhr=new XMLHttpRequest();
  } else {
      xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (async){
    xhr.timeout = timeout;
    xhr.ontimeout = function (event) {
        console.error("请求超时！");
        return
    }
  }
  

  xhr.open(method, url,async);
  for (let k in header){
    xhr.setRequestHeader(k,header[k])
  }
  xhr.setRequestHeader("Content-type",contentType)

  if (contentType == "application/json"){
    xhr.send(JSON.stringify(data));
  }else{
    xhr.send(data);
  }
  
  function Response (success,error) {
    let type = xhr.getResponseHeader("Content-type")

    let response 
    if (type == "application/json"){
      response = JSON.parse(xhr.responseText)
    }else{
      response = xhr.response
    }
    let res = {
      response,
      responseText:xhr.responseText,
      status:xhr.status,
      statusText:xhr.statusText
    }

    if (xhr.status == 200 && success instanceof Function){
      success(res)
    } else if (xhr.status !== 200 && error instanceof Function){
      error(res)
    }

    return res
  }

  xhr.onreadystatechange=function(){
      if (xhr.readyState !== 4) return
      Response(success,error)
  }
  
  if (!async){
    if (success instanceof Function){
      Response(success,error)
    }

    return Response()
  }
}

export default Ajax