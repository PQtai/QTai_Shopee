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

const navlogin = document.getElementById('login');
const navregister = document.getElementById('resgister');
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var modal = $('.modal');
var modalLogin = $('.auth-form');
var modalregister = $('.auth-form:last-child');
var modaloverlay = $('.modal__overlay');
var btnformAuths = $$('.auth-form__switch-btn');
var auths = $$('.auth-form')
var btnbackAuths = $$('.form__controls-btn-back');
function handleLogicModal() {
    modal.style.display = 'none';
    modalLogin.classList.remove('form--display');
    modalregister.classList.remove('form--display');
}
function eventhandling(){
    // handle event click login
    navlogin.onclick = function(){
        modal.style.display = 'flex';
        modalLogin.classList.add('form--display');
    }
    // handle event click register
    navregister.onclick = function(){
        modal.style.display = 'flex';
        modalregister.classList.add('form--display');
    }
    // handle event click modaloverlay
    modaloverlay.onclick = function(){
        handleLogicModal();
    }
    // handle event click changeauthen
    btnformAuths.forEach((btnformAuth) => {
        btnformAuth.onclick = function(){
            if(modalLogin.classList.contains('form--display')){
                modalLogin.classList.remove('form--display');
                modalregister.classList.add('form--display');
            }else {
                modalregister.classList.remove('form--display');
                modalLogin.classList.add('form--display');
            }
        };
    });
    // handle event click btn back
    btnbackAuths.forEach((btnbackAuth) => {
        btnbackAuth.onclick = function(){
            handleLogicModal();
        }
    })
}
function start() {
    eventhandling();
}
start();
