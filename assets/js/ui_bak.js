document.addEventListener("DOMContentLoaded", function () {

    // header
    const header = document.querySelector("#header");
    let previousScroll = 0;
    
    function handleScroll() {
        if (document.body.classList.contains("gnbOpened")) {
            return; // gnbOpened가 있으면 함수 실행 중지
        }
        
        const currentScroll = window.scrollY;

        if (currentScroll >= 0 && currentScroll <= 180) {
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
    window.addEventListener("scroll", handleScroll);

    // gnb
    if ($(window).width() > 1024) {

        // PC
        $(document).on("mouseenter focus", "#gnb > li > a", function () {
            $(this).parent("li").addClass("active").siblings("li").removeClass("active");
        }).on("mouseleave", "#gnb", function () {
            $("#gnb > li").removeClass("active");
            $(this).children("li").children("ul").find("li").removeClass("active");
        //}).on("click", "#gnb > li > ul > li > a", function () {
        //    $(this).parent("li").toggleClass("active").siblings("li").removeClass("active");
        //    return false;
        }).on("keydown", "#gnb > li:last-child > ul > li:last-child > a", function (e) {
            if (e.keyCode == 9 && !e.shiftKey) { // tab
                $("#gnb li").removeClass("active");
            }
        }).on("keydown", "#gnb > li:first-child > a", function (e) {
            if (e.keyCode == 9 && e.shiftKey) { // shift + tab
                $("#gnb li").removeClass("active");
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

    // 모바일 메뉴 여닫기
    $("#btnGnbOpen").click(function(e) {
        e.preventDefault();
        $("#header nav, .memberMenu, #btnGnbClose").show().stop().animate({"right":"0"},300);
        $(".channelLink").show().stop().animate({"right":"10px"},300);
        $(".blackBg").css({"z-index":98,"visibility":"visible"}).stop().fadeIn(300);
        $("body").addClass("gnbOpened");
    });
    $("#btnGnbClose").click(function(e){
        e.preventDefault();
        $("#header nav, .memberMenu, .channelLink, #btnGnbClose").stop().animate({"right":-100 + "%"},300,function(){
            $("#header nav, .memberMenu, .channelLink, #btnGnbClose").hide().removeAttr("style");
        });
        $(".blackBg").stop().fadeOut(300).removeAttr("style");
        $("body").removeClass("gnbOpened");
    });
    $(document).on("keydown", "#btnGnbClose", function (e) {
        if (e.keyCode == 9 && !e.shiftKey) { // tab
            $("#btnGnbClose").click();
        }
    });

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
