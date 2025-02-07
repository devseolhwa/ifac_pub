document.addEventListener("DOMContentLoaded", function () {

    // header
    const header = document.querySelector("#header");
    let previousScroll = 0;
    
    function handleScroll() {
        if (header) {
            if (document.body.classList.contains("gnbOpened")) {
                return; // gnbOpened가 있으면 함수 실행 중지
            }
            
            const currentScroll = window.scrollY;

            if (currentScroll >= 0 && currentScroll <= 0) {
                // Y값이 0일 때
                header.classList.remove("hide", "show");
            } else if (currentScroll > previousScroll) {
                // 스크롤 다운
                header.classList.remove("show");
                header.classList.add("hide");
            } else {
                // 스크롤 업
                header.classList.remove("hide");
                header.classList.add("show");
            }
            previousScroll = currentScroll;
        }
    }
    window.addEventListener("scroll", handleScroll);

    function initializeGnb() {
        const isDesktop = $(window).width() > 1024;

        // 기존 이벤트 핸들러 제거
        $(document).off("mouseenter focus", "#gnb > li > a");
        $(document).off("mouseleave", "#gnb > li");
        $(document).off("keydown", "#gnb > li:last-child > ul > li:last-child > a");
        $(document).off("keydown", "#gnb > li:first-child > a");
        $(document).off("click", "#gnb > li > a");
        $(document).off("click", "#gnb > li > ul > li > a");

        if (isDesktop) {
            // PC
            $(document).on("mouseenter focus", "#gnb > li > a", function () {
                $(this).parent("li").addClass("active").siblings("li").removeClass("active");
                $(this).next("ul").stop().slideDown(400);
            }).on("mouseleave", "#gnb > li", function () {
                $(this).removeClass("active");
                $(this).children("ul").stop().slideUp(400);
            }).on("keydown", "#gnb > li > ul > li:last-child > a", function (e) {
                if (e.keyCode == 9 && !e.shiftKey) { // tab
                    $(this).parent().parent("ul").stop().slideUp(400);
                    $("#gnb li").removeClass("active");
                }
            }).on("keydown", "#gnb > li > a", function (e) {
                if (e.keyCode == 9 && e.shiftKey) { // shift + tab
                    $(this).next("ul").stop().slideUp(400);
                    $(this).parent("li").removeClass("active");
                }
            }).on("keydown", "#gnb > li:last-child > ul > li:last-child > a", function (e) {
                if (e.keyCode == 9 && !e.shiftKey) { // tab
                    $(this).parent("li").parent("ul").stop().slideUp(400);
                    $("#gnb li").removeClass("active");
                }
            }).on("keydown", "#gnb > li:first-child > a", function (e) {
                if (e.keyCode == 9 && e.shiftKey) { // shift + tab
                    $("#gnb li").removeClass("active");
                    $("#gnb li ul").stop().slideUp(400);
                }
            });
        } else {
            // Mobile
            $(document).on("click", "#gnb > li > a", function () {
                if ($(this).parent("li").hasClass("active")) {
                    $(this).parent("li").removeClass("active").children("ul").stop().slideUp(300);
                } else {
                    $("#gnb > li > ul > li > a").parent("li").removeClass("active").children("ul").stop().slideUp(100);
                    $(this).parent("li").siblings("li").removeClass("active").children("ul").stop().slideUp(300);
                    $(this).parent("li").addClass("active").children("ul").stop().slideDown(300);
                }
                return false;
            }).on("click", "#gnb > li > ul > li > a", function () {
                if ($(this).parent("li").hasClass("active")) {
                    $(this).parent("li").removeClass("active").children("ul").stop().slideUp(300);
                } else {
                    $(this).parent("li").siblings("li").removeClass("active").children("ul").stop().slideUp(300);
                    $(this).parent("li").addClass("active").children("ul").stop().slideDown(300);
                }
                return false;
            });
        }
        //console.log(isDesktop);
    }

    function initializeMobileMenu() {

        $("#skipGnb").on("click", function (e) {
            e.preventDefault();
            $("#btnGnbOpen").click();
            return false;
        });
        $("#btnGnbOpen").on("click", function (e) {
            e.preventDefault();
            $("body").addClass("gnbOpened");
            $("#header nav, .memberMenu, #btnGnbClose").show().stop().animate({ "right": "0" }, 300);
            $(".channelLink").show().stop().animate({ "right": "10px" }, 300);
            $(".blackBg").css({ "z-index": 98, "visibility": "visible" }).stop().fadeIn(300);
            $("#gnb > li:first-child > a").focus();
        });
        $("#btnGnbClose").on("click", function (e) {
            e.preventDefault();
            $("body").removeClass("gnbOpened");
            $("#header nav, .memberMenu, .channelLink, #btnGnbClose").stop().animate({ "right": -100 + "%" }, 300, function () {
                $("#header nav, .memberMenu, .channelLink, #btnGnbClose").hide().removeAttr("style");
            });
            $(".blackBg").stop().fadeOut(300).removeAttr("style");
            
        });
        $("#btnGnbClose").on("keydown", function (e) {
            if (e.keyCode == 9 && !e.shiftKey) { // tab
                $("#btnGnbClose").click();
            }
        });
    }

    initializeGnb();
    initializeMobileMenu();
    $(window).on("resize", initializeGnb);

    // 패밀리사이트 열기/닫기
    const btnSiteOpen = document.querySelector(".btnSiteOpen");
    const familySiteGroup = document.querySelector(".familysiteGroup");
    const familySiteList = document.querySelector(".familysiteList");

    btnSiteOpen.addEventListener("click", function () {
        familySiteGroup.classList.toggle("open");
        if (familySiteGroup.classList.contains("open")) {
            btnSiteOpen.setAttribute("title", "패밀리사이트 목록 닫기");
        } else {
            btnSiteOpen.setAttribute("title", "패밀리사이트 목록 열기");
        }

        const isOpen = familySiteList.style.display === "block";
        familySiteList.style.display = isOpen ? "none" : "block";
        this.setAttribute("aria-expanded", !isOpen);
        if (!isOpen) {
            familySiteList.querySelector("a").focus(); // 첫 번째 항목으로 초점 이동
        }
    });

    // quickGroup 스크롤 이벤트
    const quickGroup = document.querySelector(".quickGroup");
    const footerArea = document.querySelector("footer");
    if(quickGroup != null ){
        function uiCheckOffset() {
            function getRectTop(el){
                var rect = el.getBoundingClientRect();
                return rect.top;
            }
            if (window.scrollY > 100) {
                quickGroup.classList.add("visible");
            } else {
                quickGroup.classList.remove("visible");
            }
            
            if((getRectTop(quickGroup) + document.body.scrollTop) + quickGroup.offsetHeight >= (getRectTop(footerArea) + document.body.scrollTop) - 10)
            quickGroup.style.position = "absolute";
            if(document.body.scrollTop + window.innerHeight < (getRectTop(footerArea) + document.body.scrollTop))
            quickGroup.style.position = "fixed";
        }

        document.addEventListener("scroll", function(){
            uiCheckOffset();
        });
    }

    // 상단으로
    document.querySelector(".goTop a").addEventListener("click", function (e) {
        e.preventDefault();
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({ top: 0 });
        }
        setTimeout(() => {
            header.focus();
        }, 300);
    });

    // SNS 목록 열기/닫기
    document.querySelector(".btnQuickSnsOpen").addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
        this.textContent = isExpanded ? "SNS 목록 열기" : "SNS 목록 닫기";
    });

});

// modal
$(function () {
    var modalOpener = null;

    // 모달 열기
    $(document).on('click', '.btnModalOpen', function (e) {
        e.preventDefault();
        var target = normalizeTarget($(this).attr('aria-controls') || $(this).attr('href'));
        modalOpener = $(this);
        modalOpen(target);
    });

    // 모달 닫기
    $(document).on('click', '.btnModalClose', function () {
        modalClose($(this).closest('.modalPopup'));
    });

    // 키보드 제어 (ESC 닫기, Tab 순환)
    $(document).on('keydown', '.modalPopup', function (e) {
        if (e.key === 'Escape') modalClose($(this)); // ESC 키
        if (e.key === 'Tab') trapFocus($(this), e); // Tab 키
    });

    // 모달 열기 함수
    function modalOpen(target) {
        var $modal = $(target);
        $modal.fadeIn('fast').addClass('show').attr('aria-hidden', 'false');
        $('body').addClass('modalOpened');

        // 첫 번째 포커스로 이동
        $modal.find('.modalBody').attr('tabindex', '-1').focus();
    }

    // 모달 닫기 함수
    function modalClose($modal) {
        $modal.fadeOut('fast').removeClass('show').attr('aria-hidden', 'true');
        $('body').removeClass('modalOpened');

        // 이전 포커스 복원
        modalOpener?.focus();
        modalOpener = null;
    }

    // 포커스 순환 함수
    function trapFocus($modal, e) {
        var focusable = $modal.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');
        var firstFocusable = focusable.first()[0];
        var lastFocusable = focusable.last()[0];

        if (e.shiftKey && e.target === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && e.target === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }

    // 타겟 ID 정규화
    function normalizeTarget(target) {
        return target?.startsWith('#') ? target : `#${target}`;
    }
});
