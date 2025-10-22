// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 프로젝트 섹션 스와이퍼 슬라이더 초기화
    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",        // 세로 방향 스크롤
        slidesPerView: 1,            // 한 번에 1개 슬라이드 표시
        spaceBetween: 100,           // 슬라이드 간 간격 100px
        mousewheel: true,            // 마우스 휠로 슬라이드 이동 가능
        keyboard: {
            enabled: true,           // 키보드 방향키로 슬라이드 이동 가능
        },
        pagination: {
            el: ".swiper-pagination", // 페이지네이션 표시 위치
            clickable: true,         // 페이지네이션 클릭으로 슬라이드 이동 가능
        },
        loop: true,                  // 무한 루프 (마지막 슬라이드에서 첫 번째로)
        autoplay: {
            delay: 7000,             // 7초마다 자동 슬라이드
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동재생 계속
        },
    });

    // 데스크톱 네비게이션 메뉴 스크롤 기능
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    // 각 네비게이션 링크에 클릭 이벤트 추가
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 동작 방지
            
            const targetId = this.getAttribute('href'); // 클릭된 링크의 href 속성 가져오기
            const targetSection = document.querySelector(targetId); // 해당 섹션 요소 찾기
            
            if (targetSection) {
                // 헤더 높이를 고려한 정확한 스크롤 위치 계산
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // 부드러운 스크롤로 해당 섹션으로 이동
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤 위치에 따른 데스크톱 네비게이션 active 상태 업데이트
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]'); // 모든 섹션 요소 가져오기
        const headerHeight = document.getElementById('header').offsetHeight; // 헤더 높이 계산
        const scrollPosition = window.scrollY + headerHeight + 100; // 현재 스크롤 위치 (여유 공간 포함)

        // 각 섹션을 순회하며 현재 보이는 섹션 확인
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // 섹션의 상단 위치
            const sectionHeight = section.offsetHeight; // 섹션의 높이
            const sectionId = section.getAttribute('id'); // 섹션의 ID
            const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`); // 해당 섹션의 네비게이션 링크

            // 현재 스크롤 위치가 섹션 범위 내에 있는지 확인
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 모든 네비게이션 링크의 active 클래스 제거
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.parentElement.classList.remove('active');
                });
                
                // 현재 섹션에 해당하는 링크와 li 요소에 active 클래스 추가
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    correspondingLink.parentElement.classList.add('active');
                }
            }
        });
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', updateActiveNav);
    
    // 페이지 로드 시 초기 active 상태 설정
    updateActiveNav();

    // 맨 위로 가기 버튼 기능
    const topBtn = document.getElementById('topBtn');
    
    // 스크롤 위치에 따른 top 버튼 표시/숨김 함수
    function toggleTopBtn() {
        if (window.scrollY > 300) {
            topBtn.classList.add('show'); // 300px 이상 스크롤 시 버튼 표시
        } else {
            topBtn.classList.remove('show'); // 300px 미만 스크롤 시 버튼 숨김
        }
    }
    
    // Top 버튼 클릭 시 페이지 맨 위로 부드럽게 스크롤
    topBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 스크롤 이벤트에 top 버튼 토글 기능 추가
    window.addEventListener('scroll', function() {
        updateActiveNav(); // 네비게이션 active 상태 업데이트
        toggleTopBtn();    // top 버튼 표시/숨김
    });
    
    // 페이지 로드 시 초기 top 버튼 상태 설정
    toggleTopBtn();

    // 모바일 햄버거 메뉴 기능 (480px 이하 화면)
    const hamburgerBtn = document.querySelector('.hamburger_btn');
    const mobileNav = document.querySelector('.mobile_nav');
    const mobileNavLinks = document.querySelectorAll('.mobile_nav a[href^="#"]');
    
    // 햄버거 버튼 클릭 시 모바일 메뉴 열기/닫기
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active'); // 햄버거 아이콘 애니메이션 (X자 변환)
        mobileNav.classList.toggle('active');    // 모바일 메뉴 표시/숨김
        
        // 메뉴 열릴 때 배경 스크롤 방지, 닫힐 때 스크롤 허용
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // 모바일 메뉴 링크 클릭 시 해당 섹션으로 이동 후 메뉴 닫기
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 동작 방지
            
            const targetId = this.getAttribute('href'); // 클릭된 링크의 href 속성 가져오기
            const targetSection = document.querySelector(targetId); // 해당 섹션 요소 찾기
            
            if (targetSection) {
                // 헤더 높이를 고려한 정확한 스크롤 위치 계산
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // 부드러운 스크롤로 해당 섹션으로 이동
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 메뉴 닫기 및 스크롤 복원
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 스크롤 위치에 따른 모바일 네비게이션 active 상태 업데이트
    function updateMobileActiveNav() {
        const sections = document.querySelectorAll('section[id]'); // 모든 섹션 요소 가져오기
        const headerHeight = document.getElementById('header').offsetHeight; // 헤더 높이 계산
        const scrollPosition = window.scrollY + headerHeight + 100; // 현재 스크롤 위치 (여유 공간 포함)

        // 각 섹션을 순회하며 현재 보이는 섹션 확인
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // 섹션의 상단 위치
            const sectionHeight = section.offsetHeight; // 섹션의 높이
            const sectionId = section.getAttribute('id'); // 섹션의 ID
            const correspondingLink = document.querySelector(`.mobile_nav a[href="#${sectionId}"]`); // 해당 섹션의 모바일 네비게이션 링크

            // 현재 스크롤 위치가 섹션 범위 내에 있는지 확인
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 모든 모바일 네비게이션 링크의 active 클래스 제거
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    link.parentElement.classList.remove('active');
                });
                
                // 현재 섹션에 해당하는 링크와 li 요소에 active 클래스 추가
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    correspondingLink.parentElement.classList.add('active');
                }
            }
        });
    }
    
    // 스크롤 이벤트에 모든 기능 통합 (데스크톱 + 모바일)
    window.addEventListener('scroll', function() {
        updateActiveNav();        // 데스크톱 네비게이션 active 상태 업데이트
        toggleTopBtn();           // top 버튼 표시/숨김
        updateMobileActiveNav();  // 모바일 네비게이션 active 상태 업데이트
    });
    
    // 페이지 로드 시 초기 모바일 active 상태 설정
    updateMobileActiveNav();
});