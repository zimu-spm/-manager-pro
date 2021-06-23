$(function() {


    $('#regist_link').on('click', function() {

        console.log(1);
        $(this).parents('.login-box').hide().siblings('.regist-box').show()


    })
    $('#login_link').on('click', function() {
        $(this).parents('.regist-box').hide().siblings('.login-box').show()
    })
    var form = layui.form;
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
})