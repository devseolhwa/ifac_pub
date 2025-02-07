// 인쇄하기
function shareToPrint(){
    window.print();
}

// 공유하기 레이어
$(document).on("click", "#btnShareOpen", function () {
    var OnOff = $(this).is(".active");
    if(!OnOff){
        $(this).next(".layerShare").addClass("active");
        $(this).attr("title", "공유하기 레이어 닫기");
        $(this).next(".layerShare").slideDown();
    } else{
        $(this).next(".layerShare").removeClass("active");
        $(this).attr("title", "공유하기 레이어 열기");
        $(this).next(".layerShare").slideUp();
    };
}).on("click", "#btnShareClose", function () {
    $(this).parent(".layerShare").removeClass("active");
    $(this).parent().prev("#btnShareOpen").attr("title", "공유하기 레이어 열기");
    $(this).parent(".layerShare").slideUp();
});

// 공유하기 링크복사
$(function () {  
    $("#urlText").val(document.location.href);
});
function shareToLink() {
    const copyEle = document.getElementById("urlText");
    const url = copyEle.value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        // 최신 브라우저에서 클립보드 API 사용
        navigator.clipboard.writeText(url)
            .then(() => {
                alert("URL이 복사 되었습니다. 원하시는 곳에 붙여 넣기 하여 주세요.");
            })
            .catch(() => {
                alert("URL 복사가 실패하였습니다. 텍스트를 전체 선택 후 복사 하여 주세요.");
            });
    } else {
        // 구형 브라우저 대응
        try {
            copyEle.select();
            document.execCommand("Copy");
            alert("URL이 복사 되었습니다. 원하시는 곳에 붙여 넣기 하여 주세요.");
        } catch (e) {
            alert("URL 복사가 실패하였습니다. 텍스트를 전체 선택 후 복사 하여 주세요.");
        }
    }
}

$(function () {
    // 2depth
    const $depth2List = $(".depthList--2 .swiper-wrapper");
    const $depth2container = $(".depthList--2 .swiper-container");
    let depth2List = null;

    function depth2Slider() {
        const containerWidth = $depth2container.outerWidth(); // 화면 너비
        const contentWidth = $depth2List[0]?.scrollWidth || 0; // ul 전체 너비

        if (contentWidth > containerWidth) {
            $depth2container.addClass("swiperActive");
            if (!depth2List) {
                // Swiper 초기화
                depth2List = new Swiper(".depthList--2 .swiper-container", {
                    slidesPerView: "auto",
                    navigation: false,
                    pagination: false,
                    a11y: {
                        enabled: true,
                        prevSlideMessage: "이전 슬라이드",
                        nextSlideMessage: "다음 슬라이드",
                    },
                });

                const $depth2ListEl = $(depth2List.el);

                // 상태 업데이트 함수
                function updateSliderClass(swiper) {
                    if (!$depth2ListEl) return;
                    const isAtStart = swiper.isBeginning; // 시작 지점 여부
                    const isAtEnd = swiper.isEnd;         // 끝 지점 여부

                    if (isAtStart) {
                        $depth2ListEl.addClass("first").removeClass("last");
                    } else if (isAtEnd) {
                        $depth2ListEl.addClass("last").removeClass("first");
                    } else {
                        $depth2ListEl.removeClass("first last");
                    }
                }

                depth2List.on("init slideChange", () => updateSliderClass(depth2List));

                // 활성화된 슬라이드로 이동 (초기화 이후 호출)
                requestAnimationFrame(() => {
                    const onIndex = $depth2List.find("li.on").index();
                    if (onIndex !== -1) depth2List.slideTo(onIndex);
                });

                updateSliderClass(depth2List);
            }
        } else if (depth2List) {
            depth2List.destroy(true);
            depth2List = null;
            $depth2container.removeClass("swiperActive");
        }
    }

    // 초기화 및 이벤트 바인딩
    depth2Slider();
    $(window).on("resize", depth2Slider);

    // 3depth
	function depth3(){
		var depth3On = $(".depthList--3 .depthList > ul").find("li.on");
		var depth3Text = depth3On.find("a").text();
		$(".btnDepthToggel > span").text(depth3Text);
		$(".btnDepthToggel").on("click",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active").attr("title","하위메뉴열기");
				$(".depthList--3 nav").stop().slideUp();
			}else{
				$(this).addClass("active").attr("title","하위메뉴닫기");
				$(".depthList--3 nav").stop().slideDown();
			}
		});
	}
    depth3();

   // 4depth
    const $depth4List = $(".depthList--4 .swiper-wrapper");
    const $depth4container = $(".depthList--4 .swiper-container");
    let depth4List = null;

    function depth4Slider() {
        const containerWidth = $depth4container.outerWidth(); // 화면 너비
        const contentWidth = $depth4List[0]?.scrollWidth || 0; // ul 전체 너비

        if (contentWidth > containerWidth) {
            $depth4container.addClass("swiperActive");
            if (!depth4List) {
                // Swiper 초기화
                depth4List = new Swiper(".depthList--4 .swiper-container", {
                    slidesPerView: "auto",
                    navigation: false,
                    pagination: false,
                    a11y: {
                        enabled: true,
                        prevSlideMessage: "이전 슬라이드",
                        nextSlideMessage: "다음 슬라이드",
                    },
                });

                const $depth4ListEl = $(depth4List.el);

                // 상태 업데이트 함수
                function updateSliderClass(swiper) {
                    if (!$depth4ListEl) return;
                    const isAtStart = swiper.isBeginning; // 시작 지점 여부
                    const isAtEnd = swiper.isEnd;         // 끝 지점 여부

                    if (isAtStart) {
                        $depth4ListEl.addClass("first").removeClass("last");
                    } else if (isAtEnd) {
                        $depth4ListEl.addClass("last").removeClass("first");
                    } else {
                        $depth4ListEl.removeClass("first last");
                    }
                }

                depth4List.on("init slideChange", () => updateSliderClass(depth4List));

                // 활성화된 슬라이드로 이동 (초기화 이후 호출)
                requestAnimationFrame(() => {
                    const onIndex = $depth4List.find("li.on").index();
                    if (onIndex !== -1) depth4List.slideTo(onIndex);
                });

                updateSliderClass(depth4List);
            }
        } else if (depth4List) {
            depth4List.destroy(true);
            depth4List = null;
            $depth4container.removeClass("swiperActive");
        }
    }

    // 초기화 및 이벤트 바인딩
    depth4Slider();
    $(window).on("resize", depth4Slider);

    function activateTabFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const $targetTab = $(`a[aria-controls='${hash.replace('#', '')}']`);
            if ($targetTab.length) {
                $targetTab.click(); // 탭을 클릭한 것처럼 동작
            }
            history.replaceState(null, null, window.location.href.split('#')[0]);
        }
    }

    // 탭 클릭 처리
    function handleTabClick(event) {
        const $activeTab = $(event.currentTarget);

        $(".depthList--4 a").parent().removeClass("on"); // 모든 탭의 .on 클래스 제거

        // 외부 링크일 경우 기본 동작 허용
        if (!$activeTab.attr("aria-controls")) {
            $activeTab.parent().addClass("on");
            return;
        }

        event.preventDefault(); // 내부 탭만 기본 동작 방지

        const targetId = $activeTab.attr("aria-controls");

        // 모든 탭 및 콘텐츠 초기화
        $(".depthList--4 a[role='tab']").attr({
            "aria-selected": "false",
            tabindex: "-1",
        }).parent().removeClass("on");

        $(".depthcontents--4 > section").attr("hidden", true); // 모든 콘텐츠 숨김 처리

        // 선택된 탭 및 콘텐츠 활성화
        $activeTab.attr({
            "aria-selected": "true",
            tabindex: "0",
        }).parent().addClass("on"); // 선택된 탭에 .on 클래스 추가

        $(`#${targetId}`).removeAttr("hidden"); // 해당 콘텐츠 표시
    }

    // 페이지 로드 시 해시 처리
    $(document).ready(function() {
        // 페이지 로드 시 해시 처리
        activateTabFromHash();

        // 탭 클릭 시 처리
        $(".depthList--4").on("click", "a[role='tab']", handleTabClick);
    });

    // 해시가 변경될 때마다 탭 활성화
    $(window).on("hashchange", activateTabFromHash);

    // 키보드 내비게이션
    function handleTabKeydown(event) {
        const $tabs = $(".depthList--4 a[role='tab']");
        const currentIndex = $tabs.index(event.target);

        let newIndex = null;

        if (event.key === "ArrowRight") {
            newIndex = (currentIndex + 1) % $tabs.length; // 오른쪽 화살표
        } else if (event.key === "ArrowLeft") {
            newIndex = (currentIndex - 1 + $tabs.length) % $tabs.length; // 왼쪽 화살표
        }

        if (newIndex !== null) {
            event.preventDefault();
            $tabs.eq(newIndex).focus().click(); // 해당 탭으로 포커스 이동 후 클릭
        }
    }

    $(".depthList--4").on("click", "a[role='tab'], a[role='link']", handleTabClick);
    $(".depthList--4").on("keydown", "a[role='tab']", handleTabKeydown);
});

document.addEventListener("DOMContentLoaded", function () {
    // 게시판 목록 분류 .active
    document.querySelectorAll(".sort button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".sort li.active")?.classList.remove("active");
            document.querySelector(".sort button[aria-selected='true']")?.setAttribute("aria-selected", "false");

            this.closest("li").classList.add("active");
            this.setAttribute("aria-selected", "true");
        });
    });

    // 테이블 스크롤
    const scrollTables = document.querySelectorAll(".scrollTable");
    scrollTables.forEach(scrollTable => {
        const scrollInfo = document.createElement("p");
        scrollInfo.classList.add("scrollInfo");
    
        const span = document.createElement("span");
        span.classList.add("blind");
        span.textContent = "좌우로 스크롤 하시면 확인이 가능합니다.";
    
        scrollInfo.appendChild(span);
        scrollTable.parentNode.insertBefore(scrollInfo, scrollTable);
    });

    // 소개 및 인사말
    if (document.querySelector(".greeting") !== null) {
        const greetingInner = document.querySelector(".greetingInner");
        const greetingText = document.querySelector(".greetingText");
        const greetingTextTop = greetingText.getBoundingClientRect().top;

        window.addEventListener("scroll", () => {
            const greetingInnerTop = greetingInner.getBoundingClientRect().top;

            if (greetingInnerTop >= greetingTextTop + 150) {
                document.querySelector(".greetingText p").style.color = "#000";
                document.querySelector(".greetingText h3").style.color = "#000";
            } else {
                document.querySelector(".greetingText p").style.color = "#FFF";
                document.querySelector(".greetingText h3").style.color = "#FFF";
            }

            //console.log(greetingInnerTop);
            //console.log(greetingTextTop);
            
            if (greetingInnerTop <= greetingTextTop - 150) {
                greetingText.classList.add("bgIn");
            } else {
                greetingText.classList.remove("bgIn");
            }
        });
        
        window.addEventListener("wheel", (event) => {
            let wheel = event.wheelDeltaY;
            let greetingWidth = greetingInner.clientWidth;
            if (wheel < 0) {
                greetingInner.style.width = `${greetingWidth + 200}px`;
            } else if (wheel > 0) {
                greetingInner.style.width = `${greetingWidth - 200}px`;
            }
        });
    }

    // 기관 상징 소개 tab
    if (document.querySelector('.inTabsWrap') !== null) {
        document.querySelectorAll('.inTabsWrap').forEach((container) => {
            const tabs = container.querySelectorAll('[role="tab"]');
            const panels = container.querySelectorAll('[role="tabpanel"]');
      
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    activateTab(tab, tabs, panels);
                });
        
                tab.addEventListener('keydown', (e) => {
                    let newIndex;
                    if (e.key === 'ArrowRight') {
                        newIndex = (index + 1) % tabs.length;
                    } else if (e.key === 'ArrowLeft') {
                        newIndex = (index - 1 + tabs.length) % tabs.length;
                    }
                    if (newIndex !== undefined) {
                        tabs[newIndex].focus();
                        activateTab(tabs[newIndex], tabs, panels);
                    }
                });
            });
        });

        function activateTab(tab, tabs, panels) {
            tabs.forEach((t) => {
                t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
                t.setAttribute('tabindex', t === tab ? '0' : '-1');
            });
        
            panels.forEach((panel) => {
                panel.setAttribute('aria-hidden', panel.id !== tab.getAttribute('aria-controls'));
                if (panel.id === tab.getAttribute('aria-controls')) {
                panel.removeAttribute('hidden');
                } else {
                panel.setAttribute('hidden', '');
                }
            });
        }
    }
});
