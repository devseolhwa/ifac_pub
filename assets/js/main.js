$(function () {  

    // visual slider
    let visualSlider = $(".visualSlider");
    if (visualSlider.length) {
        visualSlider.on("init", function(event, slick) {
            $(".visualSliderCount .index").html(String(1).padStart(2, "0"));
            $(".visualSliderCount .total").html(String(slick.slideCount).padStart(2, "0"));

            // 초기 Play/Stop 버튼 상태 설정
            if (slick.options.autoplay) {
                $(".visualSliderArrow .play").hide();
                $(".visualSliderArrow .stop").show();
            } else {
                $(".visualSliderArrow .play").show();
                $(".visualSliderArrow .stop").hide();
            }
        });

        visualSlider.slick({
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
            prevArrow: $(".visualSliderArrow .prev"),
            nextArrow: $(".visualSliderArrow .next"),
            dots: true,
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            $(".visualSliderCount .index").html(String(nextSlide + 1).padStart(2, "0"));
        });

        $(".visualSliderArrow .play").on("click", function() {
            $(this).closest(".visualSliderGroup").find(".visualSlider").slick("slickPlay");
            $(this).hide();
            $(this).siblings(".stop").show();
        });

        $(".visualSliderArrow .stop").on("click", function() {
            $(this).closest(".visualSliderGroup").find(".visualSlider").slick("slickPause");
            $(this).hide();
            $(this).siblings(".play").show();
        });
    }

    // 문화행사 정보
    const navButtons = document.querySelectorAll(".cultureNav ul li button");
    const cultureBoxes = document.querySelectorAll(".cultureContents .cultureBox");

    navButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const activeButton = document.querySelector(".cultureNav ul li.active button");
            const activeTab = document.querySelector(".cultureNav ul li.active");
    
            if (activeButton) {
                activeButton.setAttribute("aria-selected", "false");
            }
    
            if (activeTab) {
                activeTab.classList.remove("active");
            }
    
            button.setAttribute("aria-selected", "true");
            button.parentElement.classList.add("active");
    
            cultureBoxes.forEach((box) => {
                const slider = $(box).find(".cultureSlider");
                if (slider.hasClass("slick-initialized")) {
                    slider.slick("unslick");
                }
                box.classList.remove("active");
            });
    
            const activeBox = cultureBoxes[index];
            if (activeBox) {
                activeBox.classList.add("active");
                initializeSlider($(activeBox).find(".cultureSlider"), $(activeBox));
            }
        });
    });

    // 슬라이더 초기화 함수
    function initializeSlider(sliderElement, container) {
        sliderElement.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            infinite: true,
            draggable: true,
            swipeToSlide: true,
            adaptiveHeight: true,
            pauseOnHover: false,
            arrows: true,
            prevArrow: container.find(".cultureSliderArrow .prev"),
            nextArrow: container.find(".cultureSliderArrow .next"),
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        sliderElement.on("init", function (event, slick) {
            const totalSlides = slick.slideCount;
            container.find(".cultureSliderCount .index").text("01");
            container.find(".cultureSliderCount .total").text(totalSlides.toString().padStart(2, "0"));
        });

        sliderElement.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            container.find(".cultureSliderCount .index").text((nextSlide + 1).toString().padStart(2, "0"));
        });

        sliderElement.slick("refresh");

        const totalSlides = sliderElement.find(".slick-slide").not(".slick-cloned").length;
        container.find(".cultureSliderCount .index").text("01");
        container.find(".cultureSliderCount .total").text(totalSlides.toString().padStart(2, "0"));

        container.find(".cultureSliderControl .play").on("click", function () {
            sliderElement.slick("slickPlay");
            $(this).hide();
            $(this).siblings(".stop").show();
        });

        container.find(".cultureSliderControl .stop").on("click", function () {
            sliderElement.slick("slickPause");
            $(this).hide();
            $(this).siblings(".play").show();
        });

        container.find(".cultureSliderControl .play").hide();
        container.find(".cultureSliderControl .stop").show();
    }

    initializeSlider($(".cultureBox.active .cultureSlider"), $(".cultureBox.active"));

    // 알림게시판/지원사업
    const boardGroups = document.querySelectorAll(".boardGroup");

    boardGroups.forEach((boardGroup) => {
        const navLinks = boardGroup.querySelectorAll(".boardNav button");
        const listGroups = boardGroup.querySelectorAll(".boardList section");

        navLinks.forEach((navLink, index) => {
            navLink.addEventListener("click", (event) => {
                event.preventDefault();
                activateTab(navLinks, listGroups, index);

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    link.setAttribute("aria-selected", "false");
                });

                navLink.classList.add("active");
                navLink.setAttribute("aria-selected", "true");

                listGroups.forEach((listGroup) => listGroup.classList.remove("active"));
                listGroups[index].classList.add("active");
            });

            navLink.addEventListener("keydown", (event) => {
                let newIndex = index;
                if (event.key === "ArrowRight") {
                    newIndex = (index + 1) % navLinks.length;
                } else if (event.key === "ArrowLeft") {
                    newIndex = (index - 1 + navLinks.length) % navLinks.length;
                } else if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activateTab(navLinks, listGroups, index);
                }
                if (newIndex !== index) {
                    navLinks[newIndex].focus();
                }
            });
        });

        function activateTab(navLinks, listGroups, index) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                link.setAttribute("aria-selected", "false");
            });
            listGroups.forEach((listGroup, idx) => {
                listGroup.classList.remove("active");
                listGroup.setAttribute("aria-hidden", idx !== index);
            });
        
            navLinks[index].classList.add("active");
            navLinks[index].setAttribute("aria-selected", "true");
            listGroups[index].classList.add("active");
            listGroups[index].setAttribute("aria-hidden", "false");
        }
    });

});

