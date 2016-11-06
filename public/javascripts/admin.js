$(function() {
    $("ul.nav li").click(function() {
        var $this = $(this);
        var index = $this.index();
        var classify = $this.data('type');
        $.ajax({
            url: '/select',
            type: 'post',
            dataType: 'json',
            data: {
                "classify": classify
            },
            success: function(data) {
                if (data.length === 0) {
                    return;
                }
                $(".content h4 span").text($this.text());
                $("ul.hidemenu li").eq(index).addClass("active").siblings().removeClass('active');
                $("ul.nav-sidebar li").eq(index).addClass("active").siblings().removeClass('active');
                $(".content tbody").empty();
                for (var i = 0; i < data.length; i++) {
                    var template = '';
                    template = `<tr class="item-id-${data[i].id}">`;
                    template += `<td>${data[i].id}</td>`;
                    template += `<td>${data[i].title}</td>`;
                    template += `<td><a target='_blank' href='../news/${data[i].id}'><button type='button' class='btn btn-primary'>预览</button></a></td>`;
                    template += `<td><a href='/admin/update/${data[i].id}'><button type='button' class='btn btn-warning'>修改</button></a></td>`;
                    template += `<td><button type='button' class='btn btn-danger' data-id='${data[i].id}'>删除</button></td>`
                    template += '</tr>';

                    $(".content tbody").append($(template));
                }
            }
        });
    });

    $(document).on('click', '.btn-danger', function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        layer.confirm('确定要删除这条新闻吗？', {
            btn: ['确定', '取消']
        }, function() {
            $.ajax({
                type: 'delete',
                url: '/admin/delete?id=' + id
            }).done(function(results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                        layer.msg('删除成功', { icon: 1 });
                    }
                }
            });
        });
    });
});
