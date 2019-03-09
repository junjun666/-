var oStart = document.getElementById('start');
var oGrass = document.getElementById('grass');
var oContent = document.getElementById('content');
var oGameover = document.getElementById('gameover');
var oClose = document.getElementById('close');
var ominesSum = document.getElementById('minesSum');
var flag = true;
var block;
var minesNum;
var minessum = 10;
var minesMap = [];



bindEvent();
function bindEvent(){
    oStart.onclick = function(){
        if(flag){
            oContent.style.display = 'block';
            init();
            flag = false;
        }
        
    }
    oGrass.onmousedown = function(e){
        var event = e.target;
        if(e.which == 1){
            leftClick(event);
        }else if(e.which == 3){
            rightClick(event);
        }
    }
    oClose.onclick = function(){
        oGameover.style.display = 'none';
        oContent.style.display = 'none';
        oGrass.innerHTML = '';
        flag = true;
    }
}
function init(){
    minesNum = 10;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var o = document.createElement('div');
            o.classList.add('block');
            o.setAttribute('id', i + '-' + j);
            oGrass.appendChild(o);
            minesMap.push({mine:0});
        }
    }
    block = document.getElementsByClassName('block');
    while(minesNum){
        var index = Math.floor(Math.random() * 100);
        if(minesMap[index].mine === 0){
            minesMap[index].mine = 1;
            block[index].classList.add('isLei');
            minesNum--;
        }
    }
}
function leftClick(dom){
    if(dom.classList.contains('mine')){
        return;
    }
    if(dom.getAttribute('class') == 'block isLei'){
        var isLei = document.getElementsByClassName('block isLei');
        for(var i = 0; i < isLei.length;i++){
           isLei[i].classList.add('show');
        }
        setTimeout(function(){
            oGameover.style.backgroundImage = 'url("img/6.jpg")';
            oGameover.style.backgroundSize = '100% 100%';
            oGameover.style.display = 'block';
        },1000)
    }else if(dom.getAttribute('class') == 'block'){
        var p = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom.classList.add('num');
        for(var m = posX - 1; m <= posX + 1; m++){
            for(var n = posY - 1; n <= posY + 1; n++){
                var aroundBox = document.getElementById(m + '-' + n);
                if(aroundBox && aroundBox.classList.contains('isLei')){
                    p++;
                }
            }
        }
        if(p != 0){
            dom.innerHTML = p;
        }
        if(p == 0){
            for(var m = posX - 1; m <= posX + 1; m++){
                for(var n = posY - 1; n <= posY + 1; n++){
                    var around = document.getElementById(m + '-' + n);
                    if(around){
                        if(!around.classList.contains('isLei')){
                            leftClick(around);
                        }
                    }
                    
                }
            }
        }
    }
}
function rightClick(dom){
    dom.classList.toggle('mine');
    if(dom.getAttribute('class') == 'block isLei mine'){
        minessum--;
        ominesSum.innerHTML = minessum;
    }else if(dom.getAttribute('class') == 'block isLei'){
        minessum++;
        ominesSum.innerHTML = minessum;
    }
    dom.oncontextmenu = function(){
        return false;
    }
    if(minessum == 0){
        setTimeout(function(){
            oGameover.style.backgroundImage = 'url("img/5.jpg")';
            oGameover.style.backgroundSize = '100% 100%';
            oGameover.style.display = 'block';
        },1000)
    }
    
}