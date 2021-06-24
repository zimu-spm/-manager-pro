$(function() {


    $('#regist_link').on('click', function() {

        console.log(1);
        $(this).parents('.login-box').hide().siblings('.regist-box').show()


    })
    $('#login_link').on('click', function() {
        $(this).parents('.regist-box').hide().siblings('.login-box').show()
    })

    var form = layui.form;
    // 利用layui的表单验证规则，验证表单
    form.verify({
            uername: [/^\D[a-zA-Z-_\d]{1,5}$/, '用户名不能数字开头，且在2-6之间'],
            pwd: [/^\S{6,12}$/, '密码不能含有空格，且必须在6-12位'],
            repwd: function(value) {
                var val_data = $('.regist-box input[name="password"]').val()
                console.log(val_data);

                if (val_data == value) {
                    return
                } else {
                    return "两次输入的密码不一致"
                }
            }
        })
        //点击注册按钮向服务器提交注册信息，注册账号
    var layer = layui.layer

    $('.regist-box .layui-form').on('submit', function(e) {
            e.preventDefault()
            var data = $(this).serialize();
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    $('#login_link').click();
                    return layer.msg(res.message)
                }

            })

        })
        // 登陆
    $('.login-box .layui-form').on('submit', function(e) {
        var data = $(this).serialize();
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: data,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('输入的账号密码不正确')
                }
                localStorage.setItem('token', res.token)
                top.location.href = 'index.html' //跳转到index页面
            }
        })
    })



})