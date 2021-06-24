function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',

        success: function(res) {
            console.log(res);

            if (res.status != 0) return layui.layer.msg('获取用户基本信息失败');

            renderAvatar(res)

        },

    })
}
$(function() {
        getUserInfo()
        $('#logout').on('click', function() {
            layui.layer.confirm('是否退出登陆?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token');
                location.href = 'login.html'

                layer.close(index);
            });
        })
    })
    //定义渲染用户图像和文本函数

function renderAvatar(res) {
    var name = res.data.nickname || res.data.username
    $('.head_welcome').children('.welcome_txt').html('欢迎&nbsp;&nbsp;' + name)
    if (res.data.user_pic != null) {
        $('.layui-nav-img').prop('src', res.data.user_pic).show()
        $('.avatar_font').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.avatar_font').html(name.charAt(0).toUpperCase()).show()
    }
}