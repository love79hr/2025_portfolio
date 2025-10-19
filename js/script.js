// 스와이퍼 초기화
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        // autoplay: {
        //     delay: 9000,
        //     disableOnInteraction: false,
        // },
    });
});