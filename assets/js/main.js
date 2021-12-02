var btnRight = document.querySelector('#btn-right-category');
var btnleft = document.querySelector('#btn-left-category');
var items = document.querySelectorAll('.container__category-slide');
var stopp = (items.length/2) - 10;
var displacement = 0;
btnRight.onclick = function() {
    displacement += 100;
    if (displacement <= 100*stopp) {
        items.forEach(function(item) {
            Object.assign(item.style , {
                transform: 'translateX(calc( -'+ displacement +'%)'
            });
        }); 
        btnleft.style.display = 'block';
    }
    if(displacement === 100*stopp) {
        items.forEach(function(item) {
            Object.assign(item.style , {
                transform: 'translateX(calc( -'+ displacement +'%)'
            });
        });
        btnRight.style.display = 'none';
    }
};
btnleft.onclick = function() {
    displacement -= 100;
    if(displacement > 0) {
        items.forEach(function(item) {
            Object.assign(item.style , {
                transform: 'translateX(calc(-'+ displacement +'%)'
            });
        });
        btnRight.style.display = 'block';
    }
    if(displacement === 0){
        items.forEach(function(item) {
            Object.assign(item.style , {
                transform: 'translateX(calc(-'+ displacement +'%)'
            });
        });
        btnleft.style.display = 'none';
    }
};



function start() {

}
start();
