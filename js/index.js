
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
    }
    var timer = null;

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

    }


    window.onresize = function () {
        arrowNode.style.left = headerLiNodes[nowIndex].offsetLeft + headerDownNodes[nowIndex].offsetWidth/2
            - arrowHalfWidth + 'px';
        contentList.style.top = -nowIndex * contentHeight +'px';
    }

})