window.addEventListener('load', function () {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mousemove', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })
    // arrow_l.addEventListener('click', function () {

    // })
    // arrow_r.addEventListener('click', function () {

    // })
    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var a = this.document.createElement('li');
        ol.appendChild(a);
        // 记录当前小圆圈的索引号
        a.setAttribute('index', i);
        a.addEventListener('click', function () {
            for (var i = 0; i <= ul.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 当点击小li时，就拿到当前小li的索引号
            var index = this.getAttribute('index');

            animate(ul, -index * focusWidth);
            //点击小圆圈移动图片

        })
    }
    ol.children[0].className = 'current';
    // for (var i = 1; i <= ul.children.length; i++) {
    //     ul.children[i].display = 'none';
    // }
    //克隆第一张图片放在ul里面的最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮滚动一张图片
    var num = 0;
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        //走到最后一张图片时快速复原到left=0
        if (num == ul.children.length - 1);
        ul.style.left = 0;
        num = 0;
    })
    num++;
    circle++;
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    //留下当前的小圆圈的current类名
    ol.children[circle].className = 'current';

})

$(function () {
    var flag = true;
    var shang = $('.recom').offset().top;
    pan();
    function pan() {
        if ($(document).scrollTop() >= shang) {
            $(".cebian").fadeIn();
        } else {
            $(".cebian").fadeOut();

        }
    }
    $(window).scroll(function () {
        pan();
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".cebian li").eq(i).addClass("current").siblings().removeClass("current");

                }
            })
        }

    })
    $(".cebian li:first").addClass("current");
    //给每个侧边栏小li添加一个侦听事件
    $(".cebian li").click(function () {
        //节流阀
        flag = false;
        //获取每个小li的index索引号
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("html,body").stop().animate({
            scrollTop: current
        }, function () {
            //此回调函数在页面滚动完毕后执行，将不会造成二次触发滚动事件
            flag = true;
        })
        $(this).addClass("current").siblings("li").removeClass("current");
    })
})