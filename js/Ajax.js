/**
 * @param {object} options   
 * 请求数据  {
 *  method: method,
 *  url: '',
 *  data: {
 *    name: 'sdf',
 *    age: 12
 *  }
 *  isAsync: true,
 *  success: function (res) {
 *    console.log(res);
 *  }
 *  error: function () {
 *  }
 * }
 * @param {String} method 请求方式  不区分大小写
 * @param {String} url    请求地址  协议（http）+ 域名+ 端口号 + 路径
 * @param {object} data   请求数据  { name: ad,age: 12}
 * @param {Boolean} isAsync 是否异步 true 是异步  false 代表同步, 默认为 false
 * @param {Function} success 成功时调用的函数
 * @param {Function} error 失败时返回的函数
 */
 function Ajax(options) {
  // get   url + '?' + data
  // post
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // xhr.readyState    1 - 4  监听是否有响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        options.success(JSON.parse(xhr.responseText));
      }else {
        options.error(error);
      }
    }
  };

  var formData = [];
  if(options.data) {
    for(var key in options.data) {
      formData.push(''.concat(key,'=',options.data[key]));
    }
    formData = formData.join('&');
  }

  method = options.method.toUpperCase() || 'GET';
  isAsync = options.isAsync || false;
  // method = method.toUpperCase();
  if (method == "GET") {
    xhr.open(method, options.url + "?" + formData, isAsync);
    xhr.send();
  } else if (method == "POST") {
    xhr.open(method, options.url, isAsync);
    // key=value&key1=valu1
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(formData);
  }
}
