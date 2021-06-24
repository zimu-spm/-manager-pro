$(function() {

    getUserInfo()


    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',

            success: function(res) {


                if (res.status != 0) return layui.layer.msg('获取用户基本信息失败');


                $('.layui-card [name="username"]').val(res.data.username)
                $('.layui-card [name="id"]').val(res.data.id);
                $('.layui-card [name="nickname"]').val(res.data.nickname)
                $('.layui-card [name="email"]').val(res.data.email)
            }

        })
    }

    var form = layui.form
    form.verify({
        nic_name: [/^\S{2,6}$/, '请输入2-6个字符作为昵称，不能有空格']
    })

    function reUserInfo() {
        var data = $(".layui-form").serialize();
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                console.log(res);

            }
        })
    }
    //表单提交事件
    $('.layui-form').on('submit', function(e) {
            e.preventDefault();
            //提交后重新填充表单项
            reUserInfo();
            //在子页面重新调用父页面的渲染函数
            window.parent.getUserInfo();
        })
        //重置按钮注册点击事件，事件处理程序：重置表单，并获取用户信息，仅将用户id和名称填到表单中
    $('.layui-btn-primary').click(function() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',

            success: function(res) {

                if (res.status != 0) return layui.layer.msg('获取用户基本信息失败');
                //仅将用户id和名称填到表单中
                $('.layui-card [name="id"]').val(res.data.id);
                $('.layui-card [name="username"]').val(res.data.username)


            }

        })

    })

})