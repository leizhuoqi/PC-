
window.addEventListener('DOMContentLoaded',function(){
 var arrowNode = document.querySelector('.arrow');
 var headerLiNodes = document.querySelectorAll('.nav li');
 var headerDownNodes = document.querySelectorAll('.down');
 var liHalfWidth = headerLiNodes[0].offsetWidth/2;
 var contentList = document.querySelector('.contentList');
 var contentNode = document.querySelector('.content');
 var contentHeight = contentNode.offsetHeight;
 var arrowHalfWidth = arrowNode.offsetWidth/2;
 var nowIndex = 0;
 var lastIndex= 0;
 var timer = null;
    var navLiNodes = document.querySelectorAll('.content .navBar li');


    header();
    function header(){
        arrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left + liHalfWidth - arrowHalfWidth + 'px';
        headerDownNodes[0].style.width = '100%';

        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index = i;
            headerLiNodes[i].onclick = function(){
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }


    function move(nowIndex){
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '';

        }
        headerDownNodes[nowIndex].style.width = '100%';
        arrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth/2
            - arrowHalfWidth + 'px';
        contentList.style.top = - nowIndex * contentHeight + 'px';
        navLiNodes[lastIndex].className = '';
        navLiNodes[nowIndex].className = 'active';
        lastIndex = nowIndex;
    }


    content();
    function content(){
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll',wheel);

        function wheel (event){
            event = event || window.event;
            clearTimeout(timer)
            timer = setTimeout(function(){
                var flag ='';
                //ie chrome
                if(event.wheelDelta){
                    if(event.wheelDelta > 0){
                        flag = 'up';
                    }else{
                        flag = 'down';
                    }
                }else if(event.detail){
                    if(event.detail > 0){
                        flag = 'down';
                    }else{
                        flag = 'up';
                    }
                }

                switch (flag){
                    case 'up':
                        if(nowIndex > 0){
                            nowIndex--;
                            move(nowIndex);
                        }
                        break;
                    case'down':
                        if(nowIndex < 4){
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }
            },150)

            event.preventDefault && event.preventDefault();
            return false;
        }

        for (var i = 0; i <navLiNodes .length; i++) {
            navLiNodes[i].index = i;
            navLiNodes[i].onclick = function(){
                nowIndex = this.index;
                move(nowIndex)
            }
        }
        // navBar();
        // function navBar(){
        //
        //     var lastIndex = 0;
        //     for (var i = 0; i <navLiNodes .length; i++) {
        //         navLiNodes[i].index = i;
        //         navLiNodes[i].onclick = function(){
        //             nowIndex =this.index;
        //             for (var j = 0; j <navLiNodes .length; j++) {
        //                 navLiNodes[j].className = ''
        //             }
        //             move(nowIndex)
        //             navLiNodes[nowIndex].className = 'active';
        //         }
        //
        //     }
        //
        //     lastIndex = nowIndex;
        // }


        banner();
        function banner(){
            var banLiNodes = document.querySelectorAll('.banner li')
            var homeNode = document.querySelector('.home');
            var pointLiNodes = document.querySelectorAll('.circlePoint li');
            var nowIndex = 0;
            var lastIndex = 0;
            var lastTime = 0;
            var timer = null;
            for (var i = 0; i <pointLiNodes.length; i++) {
                pointLiNodes[i].index = i;
                pointLiNodes[i].onclick = function(){
                    var nowTime = new Date();
                    if(nowTime - lastTime <1000) return;
                    lastTime = nowTime;
                    nowIndex = this.index;
                    if(nowIndex == lastIndex) return;
                    if(nowIndex < lastIndex){
                        banLiNodes[nowIndex].className = 'common-title left-show';
                        banLiNodes[lastIndex].className = 'common-title right-hide'

                    }else{
                        banLiNodes[nowIndex].className = 'common-title right-show';
                        banLiNodes[lastIndex].className = 'common-title left-hide'
                    }
                    pointLiNodes[lastIndex].className = '';
                    pointLiNodes[nowIndex].className = 'active';
                    lastIndex = nowIndex ;
                }
            }

            homeNode.onmouseenter = function(){
                clearInterval(timer)
            };
            homeNode.onmouseleave = bannerAuto;

            bannerAuto();
            function bannerAuto(){
                timer = setInterval(function(){
                    nowIndex++;
                    if(nowIndex >= 4) nowIndex =0 ;
                    banLiNodes[nowIndex].className = 'common-title right-show';
                    banLiNodes[lastIndex].className = 'common-title left-hide'

                    pointLiNodes[lastIndex].className = '';
                    pointLiNodes[nowIndex].className = 'active';

                    lastIndex = nowIndex;
                },1500)
            }
        }

        teamAnimation();
        function teamAnimation(){
            var teamList = document.querySelector('.fifthScreen .team-list');
            var teamLiNodes = document.querySelectorAll('.fifthScreen .team-list li');
            for (var i = 0; i <teamLiNodes.length; i++) {

                teamLiNodes[i].onmouseenter = function(){
                    for (var j = 0; j <teamLiNodes .length; j++) {
                        console.log(111)
                        teamLiNodes[j].style.opacity = 0.5;
                    }
                    this.style.opacity = 1;
                }
            }
            teamList.onmouseleave = function(){
                for (var i = 0; i <teamLiNodes.length; i++) {
                    teamLiNodes[i].style.opacity = '1'
                }
            }
        }

    }




    window.onresize = function () {
        arrowNode.style.left = headerLiNodes[nowIndex].offsetLeft + headerDownNodes[nowIndex].offsetWidth/2
            - arrowHalfWidth + 'px';
        contentList.style.top = -nowIndex * contentHeight +'px';
    }



})