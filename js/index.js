const headerH=$('.header').innerHeight(), fixhederH=$('.header_fixed').innerHeight(), section=$('.section');

$(window).on('scroll', function(){
    if($(window).scrollTop()>headerH){
        $('.header_fixed').addClass('active');
        $('.hamburger_menu').addClass('active');
    }
    if($(window).scrollTop()<headerH){
        $('.header_fixed').removeClass('active');
        $('.hamburger_menu').removeClass('active');
    }
    section.each(function(i){
        if($(window).scrollTop()>section.eq(i).offset().top-300){
            section.eq(i).find('.title').addClass('active');
        }
        if($(window).scrollTop()<section.eq(i).offset().top-300){
            section.eq(i).find('.title').removeClass('active');
        }
    });
});

const slideTitleBox=$('.slide_title_box'), slideBox=$('.slide_box');
let slideCurrent=0, timer;

slideTitleBox.each(function(i){
    slideTitleBox.eq(i).css({left: i*100+'%'});
    if(i==slideTitleBox.length-1){
        slideTitleBox.eq(i-1).css({left: '-200%'});
        slideTitleBox.eq(i).css({left: '-100%'});
    }
});
slideBox.each(function(i){
    slideBox.eq(i).css({left: i*100+'%'});
    if(i==slideBox.length-1){
        slideBox.eq(i).css({left: '-100%'});
    }
});

function mainSlide(){
    let now=slideBox.eq(slideCurrent);
    let prev=slideBox.eq(slideCurrent-1);
    if(slideCurrent-1<0){
        let subCurrent=slideBox.length+(slideCurrent-1);
        prev=slideBox.eq(subCurrent);
    }
    slideMove(prev,'-100%','-200%');
    now.removeClass('active');
    slideMove(now, 0, '-100%');
    titleSlide(slideCurrent);
    slideCurrent++;
    if(slideCurrent==slideBox.length){
        slideCurrent=0;
    }
    let next=slideBox.eq(slideCurrent);
    let nexttwo=slideBox.eq(slideCurrent+1);
    if(slideCurrent+1==slideBox.length){
        let subCurrent=0;
        nexttwo=slideBox.eq(subCurrent);
    }
    slideMove(nexttwo,'200%','100%');
    next.addClass('active');
    slideMove(next, '100%', 0);
}

function titleSlide(titleCurrent){
    let now=slideTitleBox.eq(titleCurrent);
    let prevprev=slideTitleBox.eq(titleCurrent-2);
    if(titleCurrent-2<0){
        let subCurrent=slideTitleBox.length+(slideCurrent-2);
        prevprev=slideTitleBox.eq(subCurrent);
    }
    let perv=slideTitleBox.eq(titleCurrent-1);
    if(titleCurrent-1<0){
        let subCurrent=slideTitleBox.length+(slideCurrent-1);
        perv=slideTitleBox.eq(subCurrent);
    }
    let nextnextTwo=slideTitleBox.eq(titleCurrent+3);
    if(titleCurrent+3>=slideTitleBox.length){
        let subCurrent=(slideTitleBox.length-(slideCurrent+3))*-1;
        nextnextTwo=slideTitleBox.eq(subCurrent);
    }
    let nextnext=slideTitleBox.eq(titleCurrent+2);
    if(titleCurrent+2>=slideTitleBox.length){
        let subCurrent=(slideTitleBox.length-(slideCurrent+2))*-1;
        nextnext=slideTitleBox.eq(subCurrent);
    }
    let next=slideTitleBox.eq(titleCurrent+1);
    if(titleCurrent+1>=slideTitleBox.length){
        let subCurrent=(slideTitleBox.length-(slideCurrent+1))*-1;
        next=slideTitleBox.eq(subCurrent);
    }
    slideMove(prevprev, '-200%', '-300%');
    slideMove(perv, '-100%', '-200%');
    now.removeClass('active');
    slideMove(now, 0, '-100%');
    next.addClass('active');
    slideMove(next, '100%', 0);
    slideMove(nextnext, '200%', '100%');
    slideMove(nextnextTwo, '300%', '200%');
}

function slideMove(tg, start, end){
    tg.css('left', start).stop().animate({left: end}, 500);
}

function autoSlide(){
    timer=setInterval(mainSlide, 3000);
}
autoSlide();