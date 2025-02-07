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
    // 3depth
    const $depth3List = $(".depthList--3 .swiper-wrapper");
    const $depth3container = $(".depthList--3 .swiper-container");
    let depth3List = null;

    function depth3Slider() {
        const containerWidth = $depth3container.outerWidth(); // 화면 너비
        const contentWidth = $depth3List[0]?.scrollWidth || 0; // ul 전체 너비

        if (contentWidth > containerWidth) {
            $depth3container.addClass("swiperActive");
            if (!depth3List) {
                // Swiper 초기화
                depth3List = new Swiper(".depthList--3 .swiper-container", {
                    slidesPerView: "auto",
                    navigation: false,
                    pagination: false,
                    a11y: {
                        enabled: true,
                        prevSlideMessage: "이전 슬라이드",
                        nextSlideMessage: "다음 슬라이드",
                    },
                });

                const $depth3ListEl = $(depth3List.el);

                // 상태 업데이트 함수
                function updateSliderClass(swiper) {
                    if (!$depth3ListEl) return;
                    const isAtStart = swiper.isBeginning; // 시작 지점 여부
                    const isAtEnd = swiper.isEnd;         // 끝 지점 여부

                    if (isAtStart) {
                        $depth3ListEl.addClass("first").removeClass("last");
                    } else if (isAtEnd) {
                        $depth3ListEl.addClass("last").removeClass("first");
                    } else {
                        $depth3ListEl.removeClass("first last");
                    }
                }

                depth3List.on("init slideChange", () => updateSliderClass(depth3List));

                // 활성화된 슬라이드로 이동 (초기화 이후 호출)
                requestAnimationFrame(() => {
                    const onIndex = $depth3List.find("li.on").index();
                    if (onIndex !== -1) depth3List.slideTo(onIndex);
                });

                updateSliderClass(depth3List);
            }
        } else if (depth3List) {
            depth3List.destroy(true);
            depth3List = null;
            $depth3container.removeClass("swiperActive");
        }
    }

    // 초기화 및 이벤트 바인딩
    depth3Slider();
    $(window).on("resize", depth3Slider);

    // 4depth
	function depth4(){
		var depth4On = $(".depthList--4 .depthList > ul").find("li.on");
		var depth4Text = depth4On.find("a").text();
		$(".btnDepthToggel > span").text(depth4Text);
		$(".btnDepthToggel").on("click",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active").attr("title","하위메뉴열기");
				$(".depthList--4 nav").stop().slideUp();
			}else{
				$(this).addClass("active").attr("title","하위메뉴닫기");
				$(".depthList--4 nav").stop().slideDown();
			}
		});
	}
    depth4();

    // culture Slider
    let cultureSlider = $(".cultureSlider");
    if (cultureSlider.length) {
        cultureSlider.on("init", function(event, slick) {
            $(".cultureSliderCount .index").html(String(1).padStart(2, "0"));
            $(".cultureSliderCount .total").html(String(slick.slideCount).padStart(2, "0"));

            // 초기 Play/Stop 버튼 상태 설정
            if (slick.options.autoplay) {
                $(".cultureSliderArrow .play").hide();
                $(".cultureSliderArrow .stop").show();
            } else {
                $(".cultureSliderArrow .play").show();
                $(".cultureSliderArrow .stop").hide();
            }
        });

        cultureSlider.slick({
            slidesToShow : 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            infinite: true,
            draggable: true,
            adaptiveHeight: true,
            pauseOnHover: false,
            arrows: true,
            prevArrow: $(".cultureSliderArrow .prev"),
            nextArrow: $(".cultureSliderArrow .next"),
            dots: true,
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            $(".cultureSliderCount .index").html(String(nextSlide + 1).padStart(2, "0"));
        });

        $(".cultureSliderArrow .play").on("click", function() {
            $(this).closest(".cultureSliderGroup").find(".cultureSlider").slick("slickPlay");
            $(this).hide();
            $(this).siblings(".stop").show();
        });

        $(".cultureSliderArrow .stop").on("click", function() {
            $(this).closest(".cultureSliderGroup").find(".cultureSlider").slick("slickPause");
            $(this).hide();
            $(this).siblings(".play").show();
        });
    }
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

    // 스크롤 안내
    document.querySelectorAll(".positionRelative").forEach(container => {
        let scrollInfo = container.querySelector(".scrollInfo");
        if (!scrollInfo) {
            scrollInfo = document.createElement("p");
            scrollInfo.classList.add("scrollInfo");
            
            const span = document.createElement("span");
            span.classList.add("blind");
            span.textContent = "좌우로 스크롤 하시면 확인이 가능합니다.";
            
            scrollInfo.appendChild(span);
            container.prepend(scrollInfo);
        }
        
        const scrollableElement = container.querySelector(".scrollTable") || container.querySelector(".responseMessageBox") || container.querySelector(".organizationInner");
        if (scrollableElement) {
            scrollableElement.addEventListener("scroll", () => {
                if (scrollableElement.scrollLeft > 0) {
                    scrollInfo.classList.add("hidden");
                } else {
                    scrollInfo.classList.remove("hidden");
                }
            });
        }
    });

    // 소개 및 인사말
    if (document.querySelector(".scrollMotion") !== null) {
        const motionInner = document.querySelector(".scrollMotionInner");
        const motionText = document.querySelector(".scrollMotionText");
        const motionTextTop = motionText.getBoundingClientRect().top;
    
        window.addEventListener("scroll", () => {
            const motionInnerTop = motionInner.getBoundingClientRect().top;
    
            if (motionInnerTop >= motionTextTop + 150) {
                document.querySelector(".scrollMotionText p").style.color = "#000";
                document.querySelector(".scrollMotionText h3").style.color = "#000";
            } else {
                document.querySelector(".scrollMotionText p").style.color = "#FFF";
                document.querySelector(".scrollMotionText h3").style.color = "#FFF";
            }
    
            if (motionInnerTop <= motionTextTop - 150) {
                motionText.classList.add("bgIn");
            } else {
                motionText.classList.remove("bgIn");
            }
        });
    
        window.addEventListener("wheel", (event) => {
            let wheel = event.wheelDeltaY;
            let motionWidth = motionInner.clientWidth;
            if (wheel < 0) {
                motionInner.style.width = `${motionWidth + 200}px`;
            } else if (wheel > 0) {
                motionInner.style.width = `${motionWidth - 200}px`;
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
                    // Slick 슬라이드 업데이트
                    const slickContainer = panel.querySelector('.slick-slider');
                    if (slickContainer && $(slickContainer).hasClass('slick-initialized')) {
                        $(slickContainer).get(0).slick.setPosition();
                        $(slickContainer).slick('slickGoTo', 0);
                    }
                } else {
                    panel.setAttribute('hidden', '');
                }
            });
        }
    }
});
