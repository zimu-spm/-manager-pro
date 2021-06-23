//拼接根路径和具体的接口，以后根路径发生改变直接在这修改就OK
//原理：jq发起的ajax请求之前都会先调用ajaxPrefilter()
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})