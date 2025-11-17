const slides = document.querySelectorAll('.card');
const right = document.querySelector('.right');
const left = document.querySelector('.left');

let auto = true;
const time = 3000;
let interval;

const rightBtn = ()=>{
    const activeSlide = document.querySelector(".active");
    activeSlide.classList.remove('active');

    if(activeSlide.nextElementSibling.classList.contains('card')){
        activeSlide.nextElementSibling.classList.add('active');
    }else{
        slides[0].classList.add('active');
    }

    activeSlide.classList.remove('active');
}

const leftBtn = ()=>{
    
    const activeSlide = document.querySelector(".active");
    activeSlide.classList.remove('active');

    if(activeSlide.previousElementSibling){
        activeSlide.previousElementSibling.classList.add('active');
    }else{
        slides[slides.length-1].classList.add('active');
    }

    activeSlide.classList.remove('active');
}

left.addEventListener('click',()=>{
    leftBtn();
    if(auto){
        clearInterval(interval);
        interval = setInterval(rightBtn,time);
    }
});

right.addEventListener('click',()=>{
    rightBtn();
    if(auto){
        clearInterval(interval);
        interval = setInterval(rightBtn,time);
    }
});

if(auto){
    interval = setInterval(rightBtn,time);
}