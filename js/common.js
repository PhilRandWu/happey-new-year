function $ (select) {
    return document.querySelector(select);
}
function $$ (select) {
    return document.querySelectorAll(select);
}
function loadingShow () {
    if(!$('#hidden')) {
        var gModel = document.createElement('div');
        gModel.className = 'g-modal';
        gModel.id = 'hidden'
        gModel.innerHTML = `<div class="loading">
        <img src="./assets/loading.svg" alt="">
    </div>`;
        document.body.appendChild(gModel);
    }
}
function loadingHidden () {
    if($('#hidden')) {
        $('#hidden').remove();
    }
} 
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 