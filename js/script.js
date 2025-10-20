// 스와이퍼 초기화
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 100,
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
        //     delay: 7000,
        //     disableOnInteraction: false,
        // },
        breakpoints: {
            870: {
                spaceBetween: 30,
            },
        },
    });
});