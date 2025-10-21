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
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 현재 섹션 감지 및 활성 메뉴 업데이트
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav ul li');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 100; // 헤더 높이 고려
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 모든 nav 아이템에서 active 클래스 제거
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 현재 섹션에 해당하는 nav 아이템에 active 클래스 추가
        if (currentSection) {
            const activeNavItem = document.querySelector(`.nav a[href="#${currentSection}"]`);
            if (activeNavItem) {
                activeNavItem.parentElement.classList.add('active');
            }
        }
    }

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', updateActiveNav);
    
    // 페이지 로드 시 초기 실행
    updateActiveNav();
});