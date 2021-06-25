$(function() {
    var form = layui.form;
    form.verify({

            pwd: [/^\S{6,12}$/, '密码不能含有空格，且必须在6-12位'],
            setpwd: function(value) {
                var val_data = $(".layui-card input[name='oldPwd']").val();
                if (val_data !== value) { return };
                return "原密码和新密码不能一样"
            },
            repwd: function(value) {
                var val_data = $('.layui-card  input[name="newPwd"]').val()
                console.log(val_data);

                if (val_data == value) {
                    return
                } else {
                    return "两次输入的密码不一致"
                }
            }
        })
        //点击提交，向服务器发送信息，更改密码
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: data,

            success: function(res) {
                if (res.status !== 0) {
                    $('.layui-form')[0].reset();
                }
                layui.layer.msg(res.message)

            }
        })
    })
})