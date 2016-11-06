$(function() {
    function formatDate(date,format){
        var paddNum = function(num){
          num += "";
          return num.replace(/^(\d)$/,"0$1");
        }
        //指定格式字符
        var cfg = {
           yyyy : date.getFullYear() //年 : 4位
          ,yy : date.getFullYear().toString().substring(2)//年 : 2位
          ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
          ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
          ,d  : date.getDate()   //日 : 如果1位的时候不补0
          ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
          ,hh : date.getHours()  //时
          ,mm : date.getMinutes() //分
          ,ss : date.getSeconds() //秒
        }
        format || (format = "yyyy-MM-dd");
        return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
      } 

    $(".list li").click(function() {
        var $this = $(this);
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
                $this.addClass('current').siblings().removeClass('current');
                $(".content").empty();
                for (var i = 0; i < data.length; i++) {
                    var template = '';
                    template += '<div class="content-news">';
                    template += '<div class="imgbox">';
                    template += `<a href="/news/${data[i].id}">`;
                    template += `<img src="${data[i].img}" width="100%" height="68"></a>`;
                    template += '</div>';
                    template += '<div class="description">';
                    template += `<div class="title"><a href="/news/${data[i].id}">${data[i].title}</a></div>`;
                    template += '<div class="time">' + formatDate(new Date(data[i].time)) + '</div>';
                    template += '</div>';
                    template += '</div>';

                    $(".content").append($(template));
                }
            }
        });
    });
});
