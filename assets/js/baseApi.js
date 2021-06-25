//拼接根路径和具体的接口，以后根路径发生改变直接在这修改就OK
//原理：jq发起的ajax请求之前都会先调用ajaxPrefilter()
$.ajaxPrefilter(function(options) {
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // 无论发起的请求失败与否，都会调用complete函数

    options.complete = function(res) {
        console.log(res);

        if (res.readyState == 0 || res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = "login.html"
        }

    }
})