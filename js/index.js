window.addEventListener('DOMContentLoaded', function () {
    var arrowNode = document.querySelector('.arrow');
    var headerLiNodes = document.querySelectorAll('.nav li');

    var headerDownNodes = document.querySelectorAll('.down');
    var liHalfWidth = headerLiNodes[0].offsetWidth / 2;
    var contentList = document.querySelector('.contentList');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var arrowHalfWidth = arrowNode.offsetWidth / 2;
    var nowIndex = 0;
    var lastIndex = 0;
    var timer = null;
    var navLiNodes = document.querySelectorAll('.content .navBar li');
    var musicNode = document.querySelector('.music-icon')
    var audioNode = document.querySelector('.header .music-icon audio')
    var teamList = document.querySelector('.fifthScreen .team-list');
    var teamLiNodes = document.querySelectorAll('.fifthScreen .team-list li');
    var bannerNode = document.querySelector('.home .banner')
    var planeNodes = document.querySelectorAll('.plane1,.plane2,.plane3');
    var pencelNodes = document.querySelectorAll('.pencel1,.pencel2,.pencel3');
    var changeImgNodes = document.querySelectorAll('.about .changeImg')
    var teamTitleNode = document.querySelector('.team-title');
    var teamContentNode = document.querySelector('.team-content')
    var animationArr = [
        {  //第一屏出入场动画
            anIn: function () {  //入场动画
                bannerNode.style.transform = 'translateY(0)';
                bannerNode.style.opacity = '1';
            },
            anOut: function () {  //出场动画
                bannerNode.style.transform = 'translateY(-50%)';
                bannerNode.style.opacity = '0';
            }
        },
        {
            anIn: function () {  //入场动画
                planeNodes[0].style.transform = 'translate(0, 0)';
                planeNodes[1].style.transform = 'translate(0, 0)';
                planeNodes[2].style.transform = 'translate(0, 0)';
            },
            anOut: function () {  //出场动画
                /*
                 1 左上
                 2 左下
                 3 右上
                 */
                planeNodes[0].style.transform = 'translate(-100px, -100px)';
                planeNodes[1].style.transform = 'translate(-100px, 100px)';
                planeNodes[2].style.transform = 'translate(100px, -100px)';
            }
        },
        {
            anIn: function () {  //入场动画
                pencelNodes[0].style.transform = 'translateY(0)';
                pencelNodes[1].style.transform = 'translateY(0)';
                pencelNodes[2].style.transform = 'translateY(0)';
            },
            anOut: function () {  //出场动画
                /*
                 1 上
                 2 下
                 3 下
                 */
                pencelNodes[0].style.transform = 'translateY(-100px)';
                pencelNodes[1].style.transform = 'translateY(100px)';
                pencelNodes[2].style.transform = 'translateY(100px)';
            }
        },
        {
            anIn: function () {  //入场动画
                changeImgNodes[0].style.transform = 'rotate(0)';
                changeImgNodes[1].style.transform = 'rotate(0)';
            },
            anOut: function () {  //出场动画
                changeImgNodes[0].style.transform = 'rotate(45deg)';
                changeImgNodes[1].style.transform = 'rotate(-45deg)';
            }
        },
        {
            anIn: function () {  //入场动画
                teamTitleNode.style.transform = 'translateX(0)';
                teamContentNode.style.transform = 'translateX(0)';
            },
            anOut: function () {  //出场动画
                teamTitleNode.style.transform = 'translateX(-100px)';
                teamContentNode.style.transform = 'translateX(100px)';
            }
        }
    ]
    //初始化时所有屏都得做出场动画
    for (var i = 0; i < animationArr.length; i++) {
        animationArr[i].anOut();
    }


    header();
    function header() {
        arrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left + liHalfWidth - arrowHalfWidth + 'px';
        headerDownNodes[0].style.width = '100%';

        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index = i;
            headerLiNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }


    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '';

        }
        headerDownNodes[nowIndex].style.width = '100%';
        arrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2
            - arrowHalfWidth + 'px';
        contentList.style.top = -nowIndex * contentHeight + 'px';
        navLiNodes[lastIndex].className = '';
        animationArr[lastIndex].anOut();
        navLiNodes[nowIndex].className = 'active';
        animationArr[nowIndex].anIn();
        lastIndex = nowIndex;
    }

    bootAnimation();
    function bootAnimation() {
        var bootAnimationNode = document.querySelector('.bootAnimation');
        var bootAnimationTopNode = document.querySelector('.bootAnimation .bootAnimationTop');
        var bootAnimationBottomNode = document.querySelector('.bootAnimation .bootAnimationBottom');
        var bootAnimationLineNode = document.querySelector('.bootAnimation .line');
        var flag = 0;
        var arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
        var length1 = arr.length;

        for (var i = 0; i < length1; i++) {
            var image = new Image();
            image.src = './img/' + arr[i];

            image.onload = function () {
                flag++;

                bootAnimationLineNode.style.width = flag / length1 * 100 + '%';
                if (flag === length1) {

                    bootAnimationTopNode.style.height = 0;
                    bootAnimationBottomNode.style.height = 0;
                    bootAnimationLineNode.style.display = 'none';
                   setTimeout(function(){
                       bootAnimationNode.style.display = 'none';
                       animationArr[0].anIn();
                   },500)

                }
            };

        }

    }

    content();
    function content() {
        var myCanvas = null;
        var timer1 = null;
        var timer2 = null;

        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll', wheel);

        function wheel(event) {
            event = event || window.event;
            clearTimeout(timer)
            timer = setTimeout(function () {
                var flag = '';
                //ie chrome
                if (event.wheelDelta) {
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down';
                    }
                } else if (event.detail) {
                    if (event.detail > 0) {
                        flag = 'down';
                    } else {
                        flag = 'up';
                    }
                }

                switch (flag) {
                    case 'up':
                        if (nowIndex > 0) {
                            nowIndex--;
                            move(nowIndex);
                        }
                        break;
                    case'down':
                        if (nowIndex < 4) {
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }
            }, 150)

            event.preventDefault && event.preventDefault();
            return false;
        }

        for (var i = 0; i < navLiNodes.length; i++) {
            navLiNodes[i].index = i;
            navLiNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex)
            }
        }

        banner();
        function banner() {
            var banLiNodes = document.querySelectorAll('.banner li')
            var homeNode = document.querySelector('.home');
            var pointLiNodes = document.querySelectorAll('.circlePoint li');
            var nowIndex = 0;
            var lastIndex = 0;
            var lastTime = 0;
            var timer = null;
            for (var i = 0; i < pointLiNodes.length; i++) {
                pointLiNodes[i].index = i;
                pointLiNodes[i].onclick = function () {
                    var nowTime = new Date();
                    if (nowTime - lastTime < 1000) return;
                    lastTime = nowTime;
                    nowIndex = this.index;
                    if (nowIndex == lastIndex) return;
                    if (nowIndex < lastIndex) {
                        banLiNodes[nowIndex].className = 'common-title left-show';
                        banLiNodes[lastIndex].className = 'common-title right-hide'

                    } else {
                        banLiNodes[nowIndex].className = 'common-title right-show';
                        banLiNodes[lastIndex].className = 'common-title left-hide'
                    }
                    pointLiNodes[lastIndex].className = '';
                    pointLiNodes[nowIndex].className = 'active';
                    lastIndex = nowIndex;
                }
            }

            homeNode.onmouseenter = function () {
                clearInterval(timer)
            };
            homeNode.onmouseleave = bannerAuto;

            bannerAuto();
            function bannerAuto() {
                timer = setInterval(function () {
                    nowIndex++;
                    if (nowIndex >= 4) nowIndex = 0;
                    banLiNodes[nowIndex].className = 'common-title right-show';
                    banLiNodes[lastIndex].className = 'common-title left-hide'

                    pointLiNodes[lastIndex].className = '';
                    pointLiNodes[nowIndex].className = 'active';

                    lastIndex = nowIndex;
                }, 2500)
            }
        }



        teamAnimation();
        function teamAnimation() {

            for (var i = 0; i < teamLiNodes.length; i++) {
                teamLiNodes[i].index = i;
                teamLiNodes[i].onmouseenter = function () {
                    for (var j = 0; j < teamLiNodes.length; j++) {

                        teamLiNodes[j].style.opacity = 0.5;
                    }
                    this.style.opacity = 1;
                    canvasSin(this.index)
                }
            }
            teamList.onmouseleave = function () {
                for (var i = 0; i < teamLiNodes.length; i++) {
                    teamLiNodes[i].style.opacity = '1'
                }
                myCanvas.remove();
                myCanvas = null;
                clearInterval(timer1)
                clearInterval(timer2)
            }
        }

        musicPlay();
        function musicPlay() {
            musicNode.onclick = function () {
                if (audioNode.paused) {
                    console.log(111)
                    audioNode.play();
                    this.style.backgroundImage = 'url("./img/musicon.gif")';
                } else {
                    audioNode.pause();
                    this.style.backgroundImage = 'url("./img/musicoff.gif")'
                }
            }
        }


        function canvasSin(index) {
            console.log(1)
            if (!myCanvas) {
                myCanvas = document.createElement('canvas');
                myCanvas.width = 236;
                myCanvas.height = 448;
                myCanvas.background = 'pink'
                // myCanvas.style.background='pink';

                myCanvas.style.position = 'absolute';
                myCanvas.style.left = index * 236 + 'px';

                bubble();
                teamList.appendChild(myCanvas)
            } else {
                myCanvas.style.left = index * 236 + 'px';
            }
            // var myCanvas = document.getElementById('myCanvas');
            // var circleArr = [];
            // if(myCanvas.getContext){
            //     var ctx = myCanvas.getContext('2d');
            //     setInterval(function(){
            //         ctx.clearRect(0,0,myCanvas.offsetWidth,myCanvas.offsetHeight);
            //         for (var i = 0; i < circleArr.length; i++) {
            //             circleArr[i].c_r ++;
            //             circleArr[i].opacity-=0.01;
            //             if (circleArr[i].opacity<=0) {
            //                 circleArr.splice(i,1);
            //                 continue;
            //             }
            //             ctx.fillStyle = 'rgba('+circleArr[i].r+','+circleArr[i].g+','+circleArr[i].b+','+circleArr[i].opacity+')';
            //             ctx.beginPath();
            //             ctx.arc(circleArr[i].x,circleArr[i].y,circleArr[i].c_r,0,2*Math.PI);
            //             ctx.fill()
            //         }
            //     },50);
            //     setInterval(function(){
            //         r = Math.floor(Math.random()*255);
            //         g = Math.floor(Math.random()*255);
            //         b = Math.floor(Math.random()*255);
            //         x = Math.floor(Math.random()*myCanvas.offsetWidth);
            //         y = Math.floor(Math.random()*myCanvas.offsetHeight);
            //
            //         circleArr.push({
            //             r:r,
            //             g:g,
            //             b:b,
            //             x:x,
            //             y:y,
            //             c_r: 10,
            //             opacity:1
            //         })
            //     },50)
            // }
        }

        function bubble() {

            if (myCanvas.getContext) {
                var circleArr = [];
                var ctx = myCanvas.getContext('2d');
                console.log(2)
                timer1 = setInterval(function () {
                    r = Math.floor(Math.random() * 255);
                    g = Math.floor(Math.random() * 255);
                    b = Math.floor(Math.random() * 255);
                    c_r = Math.floor(Math.random() * 8 + 2);
                    x = Math.round(Math.random() * myCanvas.width);
                    y = myCanvas.height + c_r;
                    s = Math.round(Math.random() * 50 + 50);
                    d = 0;
                    circleArr.push({
                        r: r,
                        g: g,
                        b: b,
                        x: x,
                        y: y,
                        c_r: c_r,
                        opacity: 1,
                        d: d,
                        s: s
                    })
                }, 70)

                timer2 = setInterval(function () {
                    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    for (var i = 0; i < circleArr.length; i++) {
                        var item = circleArr[i];
                        item.d++;
                        var rad = item.d * Math.PI / 180;
                        var x = Math.round(item.x + Math.sin(rad) * item.s * 1.2);

                        var y = Math.round(item.y - rad * item.s);
                        if (y <= 0) {
                            circleArr.splice(i, 1)
                            continue;
                        }
                        ctx.fillStyle = 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',' + item.opacity + ')';
                        ctx.beginPath();
                        ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
                        ctx.fill()
                    }
                }, 5);


            } else {
                alert('您的浏览器不支持canvas');
            }
        }

    }


    window.onresize = function () {
        arrowNode.style.left = headerLiNodes[nowIndex].offsetLeft + headerDownNodes[nowIndex].offsetWidth / 2
            - arrowHalfWidth + 'px';
        contentList.style.top = -nowIndex * contentHeight + 'px';
    }


})