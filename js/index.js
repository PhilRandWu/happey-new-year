(function () {
    var pageIndex = 0;
    var pageContain = $('.pageContain');
    var pageNumber = pageContain.children.length;
    function toPage() {
        pageContain.style.transition = '0.5s';
        pageContain.style.marginTop =  - pageIndex * window.innerHeight + 'px';
    }
    pageIndex = localStorage.getItem('pageIndex');
    toPage();
    pageContain.ontouchstart = function (e) {
        // 去掉过渡效果
        pageContain.style.transition = 'none';
        // console.log(e.changedTouches[0].clientY);
        var startY = e.changedTouches[0].clientY;
        pageContain.ontouchmove = function (e) {
            var dis = e.changedTouches[0].clientY - startY;
            var mtop = - pageIndex * window.innerHeight + dis;
            if(mtop > 0) {
                mtop = 0;
            }else if(mtop <= - (pageNumber - 1) * window.innerHeight) {
                mtop = - (pageNumber - 1) * window.innerHeight;
            }
            pageContain.style.marginTop = mtop + 'px';
        }
        pageContain.ontouchend = function (e) {
            var disStartToEnd = e.changedTouches[0].clientY - startY;
            if(Math.abs(disStartToEnd) < 80) {
                toPage();
            }else if(disStartToEnd > 0 && pageIndex > 0) {
                pageIndex --;
                toPage();
            }else if(pageIndex < pageNumber - 1 && disStartToEnd < 0) {
                pageIndex ++;
                toPage();
            }
            pageContain.ontouchmove = null;
            pageContain.ontouchend = null;
            localStorage.setItem('pageIndex',pageIndex);
        }
    }
}())
function getMessage () {
    loadingShow();
    Ajax({
        method: 'get',
        url: 'https://bless.yuanjin.tech/api/bless',
        data: {
            // id: location.search.slice(1)
            id: location.search.slice(1) || '5fe1a84e90eb6c3c4e8d2102'
        },
        success: function (res) {
            console.log(res);
            renderData(res.data);
        },
        error: function (err) {
            console.log(err);
        }
    })
    loadingHidden();
}
getMessage();

function renderData (data) {
    var author = document.querySelector('.pageContain .page .g-btn');
    var content = document.querySelector('.pageContain .page .note pre');
    var audioBtn = document.querySelector('.pageContain .page .audio');
    var audioBg = document.createElement('audio');
    audioBg.src = './assets/media/0.mp3';
    document.body.appendChild(audioBg);
    audioBg.play();
    var clickStart = 0;
    // 设置超过 500 ms 让加载完成后先不播放，带后面重新赋值
    var clickTime = 5000;
    author.innerHTML = '来自[' + data.author + ']的祝福';
    content.innerHTML = data.content;
    var audio = document.createElement('audio');
    audio.src = data.audioUrl;
    audioBtn.appendChild(audio);
    audioBtn.ontouchstart = function () {
        clickStart = Date.now();
        // console.log(clickStart);
    }
    audioBtn.ontouchend = function () {
       clickTime = Date.now() - clickStart;
       if(clickTime <= 500) {
            if(audio.paused) {
                audioBg.pause();
                audio.play();
            }else {
                audio.pause();
                audioBg.play();
            }
        }
    }
    // 摇一摇
    var alert;
    var shaken = document.querySelector('.shaken');
    document.querySelector('.page .dis .g-btn').onclick = function () {
        utils.regShakenEvent();
        document.querySelector('.page .dis').remove();
    }
    loadingHidden();
    window.addEventListener('shaken',function () {
        // console.log('shaken');
        if(!alert) {
            alertCard();
            shaken.currentTime = 0;
            shaken.play();
            setTimeout(function () {
                closeCard();
            },500)
        }
        
    })
    // 测试
    // document.documentElement.addEventListener('click',function () {
    //     if(!alert) {
    //         console.log('sdfdsf');
    //         alertCard();
    //         shaken.currentTime = 0;
    //         shaken.play();
    //         closeCard();
    //     }
    // })
    
    // 弹出祝福卡片
    function alertCard () {
        var modalG = document.createElement('div');
        modalG.className = 'g-modal bless';
        modalG.innerHTML = `<div class="bless-card">
        <img src="./assets/bless-card/` + randomNum(0,6) + `.png" alt="">
        <div class="g-seal"></div>
            <div class="close">
                <div class="close-btn"></div>
            </div>
        </div>`;
        document.body.appendChild(modalG);
        var blessCard = document.querySelector('.g-modal.bless .bless-card');
        blessCard.style.transform = 'scale(0)';
        blessCard.style.transition = '500ms';
        blessCard.clientHeight;
        blessCard.style.transform = 'scale(1)';
        alert = true;
        
    }
        
    
    // 关闭弹出祝福卡片
    function closeCard () {
        console.log('sdfsdf');
        var modalG = document.querySelector('body > .g-modal.bless');
        if(!modalG) {
            return;
        }
        
        var closeBtn = document.querySelector('.g-modal .bless-card .close .close-btn');
        closeBtn.onclick = function () {
            var modalG = document.querySelector('.g-modal.bless');
            modalG.style.transform = 'scale(0)';
            modalG.remove();
        } 
        document.querySelector('.page .dis').remove();
        alert = false;
    }
    // closeCard();
    // 点击跳转定制页面
    var blessHtml = document.querySelector('.blessHtml');
    blessHtml.onclick = function () {
        var newseach = location.search.slice(1) || '5fe1a84e90eb6c3c4e8d2102'
        location.href = 'bless.html?' + newseach 
    }
}