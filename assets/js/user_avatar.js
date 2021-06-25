$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)


    //给上传按钮绑定点击事件，事件处理程序：手动调用click（）,模拟点击file表单
    $(".upload").on('click', function() {

        $('#file').click()

        $('#file').change(function(e) {
            // console.log($('#file').files); 拿不到files的
            if (e.target.files.length > 0) {
                var newImg = e.target.files[0];
                var newImgURL = URL.createObjectURL(newImg)



                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', newImgURL) // 重新设置图片路径
                    .cropper(options)
                return
            }


            layui.layer.msg('请选择图片上传')


        })
    })
    $('.sure').click(function() {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符
        $.ajax({
            method: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: function(res) {
                if (res.status == 0) {
                    window.parent.getUserInfo()
                }
                layui.layer.msg(res.message)


            }
        })

    })


})