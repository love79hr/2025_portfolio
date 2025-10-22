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
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
    });

    // 네비게이션 스크롤 기능
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 헤더 높이를 고려한 스크롤 위치 계산
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤에 따른 active 메뉴 업데이트
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.getElementById('header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 모든 active 클래스 제거
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.parentElement.classList.remove('active');
                });
                
                // 현재 섹션에 해당하는 링크에 active 클래스 추가
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    correspondingLink.parentElement.classList.add('active');
                }
            }
        });
    }

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', updateActiveNav);
    
    // 페이지 로드 시 초기 active 상태 설정
    updateActiveNav();   
});