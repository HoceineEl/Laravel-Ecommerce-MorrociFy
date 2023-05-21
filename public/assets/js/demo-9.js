// Function To Create New Cookie 
function ecCreateCookie(cookieName,cookieValue,daysToExpire)
{
    var date = new Date();
    date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

// Function To Delete Existing Cookie
function ecDeleteCookie(cookieName,cookieValue)
{
    var date = new Date(0).toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date;
}

// Function To Access Existing Cookie
function ecAccessCookie(cookieName)
{
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0){
            return temp.substring(name.length,temp.length);
        }
    }

    return "";
}

// Function To Check Existing Cookie
function ecCheckCookie()
{
    var bgImageMode = ecAccessCookie("bgImageModeCookie");
    if (bgImageMode != "")
    {     
        var bgIDClass = bgImageMode.split('||');
        var bgID = bgIDClass[0];
        var bgClass = bgIDClass[1];
        
        $("body").removeClass("body-bg-1");
        $("body").removeClass("body-bg-2");
        $("body").removeClass("body-bg-3");
        $("body").removeClass("body-bg-4");
    
        $("body").addClass(bgClass);
    
        $("#bg-switcher-css").attr("href", "assets/demo-4/css/backgrounds/" + bgID + ".css");
    }

    var rtlMode = ecAccessCookie("rtlModeCookie");
    if (rtlMode != "")
    {
        // alert(rtlMode);    
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/demo-4/css/rtl.css',
            class: 'rtl'
        });
        $(".ec-tools-sidebar .ec-change-rtl").toggleClass('active');
        $link.appendTo('head');                
    }

    // ecCreateCookie('bgImgModeCookie',bgIDClass,1);

    var darkMode = ecAccessCookie("darkModeCookie");
    if (darkMode != "")
    {
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/demo-4/css/dark.css',
            class: 'dark'
        });
        
        $("link[href='assets/demo-4/css/responsive.css']").before($link);

        $(".ec-tools-sidebar .ec-change-mode").toggleClass('active');
        $("body").addClass("dark");
    }
    else
    {
        var themeColor = ecAccessCookie("themeColorCookie");
        if (themeColor != "")
        {
            $('li[data-color = '+themeColor+']').toggleClass('active').siblings().removeClass('active');
            $('li[data-color = '+themeColor+']').addClass('active');
            
            if(themeColor != '01'){
                $("link[href='assets/demo-4/css/responsive.css']").before('<link rel="stylesheet" href="assets/demo-4/css/skin-'+themeColor+'.css" rel="stylesheet">');
            }
        }
    }
}

(function($) {
    "use strict";

    /*--------------------- START Site Cookie --------------------*/
    // Calling Function On Each Time Site Load | Reload
    ecCheckCookie();

    // On click method for Clear Cookie
    $(".clear-cookie").on("click", function (e) {
        ecDeleteCookie("rtlModeCookie", "");
        ecDeleteCookie("darkModeCookie", "");
        ecDeleteCookie("themeColorCookie", "");
        ecDeleteCookie("bgImageModeCookie", "");
        location.reload();
    });

    /*--------------------- Site Loader   --------------------*/
    $(window).load(function () { 
        $("#ec-overlay").fadeOut("slow"); 
    });

    /*--------------------- Bootstrap dropdown   --------------------*/
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    /*--------------------- Language and Currency Click to Active -------------------------------- */
    $(document).ready(function() {
        $(".header-top-lan li").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $(".header-top-curr li").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    });

    /*--------------------- category Toggle Bar --------------------- */
    jQuery(".ec-category-toggle").click(function(){
        jQuery(this).parent().toggleClass('active');
        var $category =$(this).closest('.ec-category-menu').find('.ec-category-dropdown');
        $category.slideToggle('slow');
    });

    /*----------------------------- Product page category Toggle -------------------------------- */    
    $(document).ready(function(){
        $(".ec-sidebar-block .ec-sb-block-content ul li ul").addClass("ec-cat-sub-dropdown");

        $(".ec-sidebar-block .ec-sidebar-block-item").on("click", function() {
        var $this = $(this).closest('.ec-sb-block-content').find('.ec-cat-sub-dropdown');
        $this.slideToggle('slow');
        $('.ec-cat-sub-dropdown').not($this).slideUp('slow');
    });
    });

    /*----------------------------- Siderbar Product Slider -------------------------------- */ 
    $(document).ready(function(){
        $('.ec-sidebar-slider .ec-sb-pro-sl').slick({
            rows: 4,
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
            responsive: [
            {
                breakpoint: 992,
                settings: {
                    rows: 4,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    rows: 4,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
            ]
        });
    });

    /*----------------------------- Slider Price -------------------------------- */
    const slider = document.getElementById('ec-sliderPrice');
    if(slider){
        const rangeMin = parseInt(slider.dataset.min);
        const rangeMax = parseInt(slider.dataset.max);
        const step = parseInt(slider.dataset.step);
        const filterInputs = document.querySelectorAll('input.filter__input');

        noUiSlider.create(slider, {
            start: [rangeMin, rangeMax],
            connect: true,
            step: step,
            range: {
                'min': rangeMin,
                'max': rangeMax
            },

            // make numbers whole
            format: {
                to: value => value,
                from: value => value
            }
        });

        // bind inputs with noUiSlider 
        slider.noUiSlider.on('update', (values, handle) => {
            filterInputs[handle].value = values[handle];
        });

        filterInputs.forEach((input, indexInput) => {
            input.addEventListener('change', () => {
                slider.noUiSlider.setHandle(indexInput, input.value);
            })
        });
    }

    /*--------------------- Select option Toggle --------------------- */
    jQuery(".select-option").click(function(){
        var $select =$(this).closest('.ec-product-inner').find('.ec-pro-option');
        $select.slideToggle('slow');
    });

    jQuery(document).mouseup(function(e){
        var container = jQuery(".ec-pro-option");
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.slideUp('slow');
        }
    });

    /*--------------------- Add To Whishlist -----------------------------------*/
    $("body").on("click", ".wishlist", function(){

        var count = $(".ec-wishlist-count").html();        
        count++;
        $(".ec-wishlist-count").html(count); 
        
    });

    /*--------------------- Add To Cart -----------------------------------*/
    $("body").on("click", ".add-to-cart", function(){
       
        var count = $(".ec-cart-count").html();        
        count++;
        $(".ec-cart-count").html(count);

        // Remove Empty message    
        $(".emp-cart-msg").parent().remove();        
        
        // get an image url
        var img_url = $(this).parents().parents().parents().children(".ec-pro-image-outer").find(".main-image").attr("src");
        var p_name = $(this).parents().parents().parents().find(".ec-pro-title").children().html();
        var p_price = $(this).parents().parents().parents().find(".ec-price").children(".new-price").html();
        
        var p_html = '<li>'+
                        '<a href="product.html" class="sidecart_pro_img"><img src="'+ img_url +'" alt="product"></a>'+
                        '<div class="ec-pro-content">'+
                            '<a href="product.html" class="cart_pro_title">'+ p_name +'</a>'+
                        '<span class="cart-price"><span>'+ p_price +'</span> x 1</span>'+
                            '<div class="qty-plus-minus"><div class="dec ec_qtybtn">-</div>'+
                                '<input class="qty-input" type="text" name="ec_qtybtn" value="1">'+
                            '<div class="inc ec_qtybtn">+</div></div>'+
                            '<a href="javascript:void(0)" class="remove">×</a>'+
                        '</div>'+
                    '</li>';

        $('.eccart-pro-items').append(p_html);    
        
    });

    (function() {
        var $ecartToggle = $(".ec-side-toggle"),
        $ecart = $(".ec-side-cart"),
        $ecMenuToggle = $(".mobile-menu-toggle");

        $ecartToggle.on("click", function(e) {
            e.preventDefault();
            var $this = $(this),
            $target = $this.attr("href");
            // $("body").addClass("ec-open");
            $(".ec-side-cart-overlay").fadeIn();
            $($target).addClass("ec-open");
            if ($this.parent().hasClass("mobile-menu-toggle")) {
                $this.addClass("close");
                $(".ec-side-cart-overlay").fadeOut();
            }
        });
        
        $(".ec-side-cart-overlay").on("click", function(e) {
            $(".ec-side-cart-overlay").fadeOut();
            $ecart.removeClass("ec-open");
            $ecMenuToggle.find("a").removeClass("close");
        });

        $(".ec-close").on("click", function(e) {
            e.preventDefault();
            $(".ec-side-cart-overlay").fadeOut();
            $ecart.removeClass("ec-open");
            $ecMenuToggle.find("a").removeClass("close");
        });

        $("body").on("click", ".ec-pro-content .remove", function(){

        // $(".ec-pro-content .remove").on("click", function () {
            
            var cart_product_count = $(".eccart-pro-items li").length;
            
            $(this).closest("li").remove();
            if (cart_product_count == 1) {
                $('.eccart-pro-items').html('<li><p class="emp-cart-msg">Your cart is empty!</p></li>');
            }

            var count = $(".ec-cart-count").html();            
            count--;
            $(".ec-cart-count").html(count);

            cart_product_count--;
        });    
        
    })();
   
    /*--------------------- ecart Responsive Menu -----------------------------------*/
    function ResponsiveMobileEcartMenu() {
        var $ecartNav = $(".ec-menu-content, .overlay-menu"),
        $ecartNavSubMenu = $ecartNav.find(".sub-menu");
        $ecartNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

        $ecartNav.on("click", "li a, .menu-toggle", function(e) {
            var $this = $(this);
            if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }
    ResponsiveMobileEcartMenu();

    /*--------------------- Main Slider ---------------------- */
    var EcMainSlider = new Swiper('.ec-slider.swiper-container', {
        loop: true,
        speed: 2000,
        effect: "fade",
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /*--------------------- Quick view Slider ------------------------------ */
    $('.qty-product-cover').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: '.qty-nav-thumb',
    });

    $('.qty-nav-thumb').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.qty-product-cover',
        dots: false,
        arrows: true,
        focusOnSelect: true,
        responsive: [
        {
            breakpoint: 479,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        }
        ]
    });

    /*--------------------- Qty Plus Minus Button  ------------------------------ */
    var QtyPlusMinus = $(".qty-plus-minus");
    QtyPlusMinus.prepend('<div class="dec ec_qtybtn">-</div>');
    QtyPlusMinus.append('<div class="inc ec_qtybtn">+</div>');
    $(".ec_qtybtn").on("click", function() {
        var $qtybutton = $(this);
        var QtyoldValue = $qtybutton.parent().find("input").val();
        if ($qtybutton.text() === "+") {
            var QtynewVal = parseFloat(QtyoldValue) + 1;
        } else {

            if (QtyoldValue > 1) {
                var QtynewVal = parseFloat(QtyoldValue) - 1;
            } else {
                QtynewVal = 1;
            }
        }
        $qtybutton.parent().find("input").val(QtynewVal);
    });

    /*--------------------- Special inner product Slider  ------------------------------ */
    $('.ec-spe-products').slick({
        rows: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $('.ec-spe-pro-cover').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.ec-spe-pro-thumb'
    });

    $('.ec-spe-pro-thumb').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical:true,
        asNavFor: '.ec-spe-pro-cover',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        verticalSwiping:true,    
    });

    /*--------------------- Product Countdown --------------------- */
    $("#ec-spe-count-1").countdowntimer({
        startDate : "2021/01/01 12:00:00",
        dateAndTime : "2021/10/10 12:00:00",
        labelsFormat : true,
        displayFormat : "DHMS"
    });

    $("#ec-spe-count-2").countdowntimer({
        startDate : "2021/01/01 12:00:00",
        dateAndTime : "2021/11/10 12:00:00",
        labelsFormat : true,
        displayFormat : "DHMS"
    });

    /*--------------------- Category Slider -------------------------------- */   
    /*--------------------- Blog Owl Slider -------------------------------- */ 
    $('.ec-blog-slider, #ec-cat-slider').owlCarousel({
        margin:30,
        loop: true,
        dots:false,
        nav:false,
        smartSpeed: 1000,
        autoplay:true,
        items:3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav:false
            },
            576: {
                items: 2,
                nav:false
            },
            768: {
                items: 2,
                nav:false
            },
            992: {
                items: 3,
                nav:false
            },
            1200: {
                items:4,
                nav:false
            },
            1367: {
                items: 4,
                nav:false
            }
        }
    }); 

    /*--------------------- Trend Product Slider -------------------------------- */    
    $('.ec-trend-product .ec-trend-slider').slick({
        rows: 1,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToScroll: 2,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToScroll: 2,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        }
        ]
    });
/*--------------------- Trend Product Slider -------------------------------- */    
    $('.ec-trend-product .ec-trend-slider').slick({
        rows: 1,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToScroll: 3,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToScroll: 2,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        }
        ]
    });
    /*--------------------- Scroll Up Button --------------------- */
    $.scrollUp({
        scrollText: '<i class="ecicon eci-arrow-up" aria-hidden="true"></i>',
        easingType: "linear",
        scrollSpeed: 900,
        animation: "fade",
    });

    /*--------------------- Theme Color Change -------------------------------- */
    $('.ec-change-color').on('click', 'li', function(){
        $('link[href^="assets/demo-4/css/skin-"]').remove();
        $('link.dark').remove();
        $('.ec-change-mode').removeClass("active");
        var dataValue = $(this).attr('data-color');
    
        if($(this).hasClass('active')) return;
    
        $(this).toggleClass('active').siblings().removeClass('active');
    
        if(dataValue != undefined){
            $("link[href='assets/demo-4/css/responsive.css']").before('<link rel="stylesheet" href="assets/demo-4/css/skin-'+dataValue+'.css" rel="stylesheet">');
            // localStorage.setItem("colormode", dataValue);
            ecCreateCookie('themeColorCookie',dataValue,1);
        }
    
        return false;
    });
    
    /*--------------------- Theme RTL Change -------------------------------- */  
    $(".ec-tools-sidebar .ec-change-rtl .ec-rtl-switch").click(function(e) {
        e.preventDefault();
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/demo-4/css/rtl.css',
            class: 'rtl'
        });
        $(this).parent().toggleClass('active');
        var rtlvalue = "ltr";
        if ($(this).parent().hasClass('ec-change-rtl') && $(this).parent().hasClass('active')){
            $link.appendTo('head');
            rtlvalue = "rtl";
            ecCreateCookie('rtlModeCookie',rtlvalue,1);
        } else if($(this).parent().hasClass('ec-change-rtl') && !$(this).parent().hasClass('active')){
            $('link.rtl').remove();
            rtlvalue = "ltr";
            ecDeleteCookie('rtlModeCookie',rtlvalue);
        }       
        // localStorage.setItem("rtlmode", rtlvalue);
    });
    
    /*--------------------- Theme Dark mode Change -------------------------------- */  
    $(".ec-tools-sidebar .ec-change-mode .ec-mode-switch").click(function(e) {
        e.preventDefault();
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/demo-4/css/dark.css',
            class: 'dark'
        });
        $(this).parent().toggleClass('active');
        var modevalue = "light";
        if ($(this).parent().hasClass('ec-change-mode') && $(this).parent().hasClass('active')){
                $("link[href='assets/demo-4/css/responsive.css']").before($link);
    
        } else if($(this).parent().hasClass('ec-change-mode') && !$(this).parent().hasClass('active')){
            $('link.dark').remove();
            modevalue = "light";
        }
        if ($(this).parent().hasClass('active')){
            $("#ec-fixedbutton .ec-change-color").css("pointer-events", "none");
            $("body").addClass("dark");
            modevalue = "dark";
            ecCreateCookie('darkModeCookie',modevalue,1);
        }else{
            $("#ec-fixedbutton .ec-change-color").css("pointer-events", "all");
            $("body").removeClass("dark");
            ecDeleteCookie('darkModeCookie',modevalue);
        }
        // localStorage.setItem("mode", modevalue);
    });       
    
    /*----------------------------- Full Screen mode Change -------------------------------- */   
    $(".ec-tools-sidebar .ec-fullscreen-mode .ec-fullscreen-switch").click(function(e) {
        e.preventDefault();
        
        $(this).parent().toggleClass('active');

        if (
            !document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }); 
    
    /*--------------------- Menu Active -------------------------------- */        
    var current_page_URL = location.href;
    $( ".ec-main-menu ul li a" ).each(function() {
        if ($(this).attr("href") !== "#") {
            var target_URL = $(this).prop("href");
            if (target_URL == current_page_URL) {
                $('.ec-main-menu a').parents('li, ul').removeClass('active');
                $(this).parent('li').addClass('active');
                return false;
            }
        }
    });

    /*--------------------- Color Hover To Image Change -------------------------------- */ 
    // var $ecproduct = $('.ec-product-tab,.ec-new-product').find('.ec-opt-swatch');
    var $ecproduct = $('.ec-pro-color, .ec-product-tab, .shop-pro-inner, .ec-new-product, .ec-releted-product, .ec-checkout-pro').find('.ec-opt-swatch');

    function initChangeImg($opt) {
        $opt.each(function() {
            var $this = $(this),
            ecChangeImg = $this.hasClass('ec-change-img');         

            $this.on('mouseenter', 'li', function() {
                changeProductImg($(this));
            });
            
            $this.on('click', 'li', function() {
                changeProductImg($(this));
            });
    
            function changeProductImg(thisObj){    
                var $this = thisObj;
                var $load = $this.find('a');

                var $proimg = $this.closest('.ec-product-inner').find('.ec-pro-image');

                if (!$load.hasClass('loaded')) {
                    $proimg.addClass('pro-loading');
                }

                var $loaded = $this.find('a').addClass('loaded');

                $this.addClass('active').siblings().removeClass('active');
                if (ecChangeImg) {
                    hoverAddImg($this);
                }
                setTimeout(function() {
                 $proimg.removeClass("pro-loading");
             }, 1000);
                return false;
            }
        });
    }

    function hoverAddImg($this) {
        var $optData = $this.find('.ec-opt-clr-img'),
        $opImg = $optData.attr('data-src'),
        $opImgHover = $optData.attr('data-src-hover') || false,
        $optImgWrapper = $this.closest('.ec-product-inner').find('.ec-pro-image'),
        $optImgMain = $optImgWrapper.find('.image img.main-image'),
        $optImgMainHover = $optImgWrapper.find('.image img.hover-image');

        if ($opImg.length) {
            $optImgMain.attr('src', $opImg);
        }
        if ($opImg.length) {
            var checkDisable = $optImgMainHover.closest('img.hover-image');
            $optImgMainHover.attr('src', $opImgHover);
            if (checkDisable.hasClass('disable')) {
                checkDisable.removeClass('disable');
            }
        }
        if ($opImgHover === false) {
            $optImgMainHover.closest('img.hover-image').addClass('disable');
        }
    }

    $(window).on('load', function() {
        initChangeImg($ecproduct);
    });

    $("document").ready(function(){
        initChangeImg($ecproduct);
    });

    /*--------------------- Size Hover To Active -------------------------------- */
    $('.ec-opt-size').each(function() {

        $(this).on('mouseenter', 'li', function() {
            // alert("1");
            onSizeChange($(this));
        });

        $(this).on('click', 'li', function() {
            // alert("2");
            onSizeChange($(this));
        });

        function onSizeChange(thisObj){
            var $this = thisObj;
            var $old_data =$this.find('a').attr('data-old');
            var $new_data =$this.find('a').attr('data-new');
            var $old_price = $this.closest('.ec-pro-content').find('.old-price');
            var $new_price = $this.closest('.ec-pro-content').find('.new-price');

            $old_price.text($old_data); 
            $new_price.text($new_data); 

            $this.addClass('active').siblings().removeClass('active');
        }
    });

    /*--------------------- Testimonial Slider -------------------------------- */    
    $('#ec-testimonial-slider').slick({
        rows: 1,
        dots: true,
        arrows: false,
        centerMode: true,
        infinite: false,
        speed: 500,
        centerPadding: 0,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    /*--------------------- Blog Owl Slider -------------------------------- */ 
    $('.ec-blog-slider, #ec-cat-slider').owlCarousel({
    margin:30,
    loop: true,
    dots:false,
    nav:true,
    smartSpeed: 1000,
    autoplay:false,
    items:3,
    responsiveClass: true,
    responsive: {
		0: {
			items: 1,
			dots:true,
			nav:false
		},
		576: {
			items: 2,
			dots:true,
			nav:false
		},
		768: {
			items: 2,
			dots:true,
			nav:false
		},
		992: {
			items: 3,
			dots:true,
			nav:false
		},
		1200: {
			items:4,
			dots:true,
			nav:false
		},
		1367: {
			items: 4,
			dots:true,
			nav:false
		}
	}
});
     /*----------------------------- Sidebar js | Toggle Icon OnClick Open sidebar  -----------------------------------*/

	$(".ec-sidebar-toggle").on("click", function () {
		$(".ec-side-cat-overlay").fadeIn();
		$(".sidebar-dis-991").addClass("ec-open");
	});

	$(".ec-close").on("click", function () {
		$(".sidebar-dis-991").removeClass("ec-open");
		$(".ec-side-cat-overlay").fadeOut();
	});

	$(".ec-side-cat-overlay").on("click", function () {
		$(".sidebar-dis-991").removeClass("ec-open");
		$(".ec-side-cat-overlay").fadeOut();
	});

    /*----------------------------- Recent auto popup -----------------------------------*/
    setInterval(function () { $(".recent-purchase").stop().slideToggle('slow'); }, 10000);
    $(".recent-close").click(function () {
        $(".recent-purchase").stop().slideToggle('slow');
    });

    /*----------------------------- Siderbar Product Slider -------------------------------- */ 
    $(document).ready(function(){
        $('.ec-sidebar-slider-cat .ec-sb-pro-sl').slick({
            rows: 4,
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
            responsive: [
            {
                breakpoint: 992,
                settings: {
                    rows: 4,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    rows: 4,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
            ]
        });
    });

    /*----------------------------- All Product Slider -------------------------------- */    
    $('.ec-new-slider, .ec-special-slider, .ec-best-slider').slick({
        rows: 4,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                rows: 2,
                slidesToScroll: 2,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 540,
            settings: {
                rows: 2,
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        }
        ]
    });

    /*--------------------- Brand Slider -------------------------------- */    
    $('#ec-brand-slider').slick({
        rows: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToScroll: 4,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToScroll: 3,
                slidesToShow: 2,
            }
        }
        ]
    });

    /*--------------------- Footer Toggle -------------------------------- */    
    $(document).ready(function(){
        $("footer .footer-top .ec-footer-widget .ec-footer-links").addClass("ec-footer-dropdown");

        $('.ec-footer-heading').append( "<div class='ec-heading-res'><i class='ecicon eci-angle-down'></i></div>" );

        $(".ec-footer-heading .ec-heading-res").click(function() {
         var $this = $(this).closest('.footer-top .col-sm-12 .ec-footer-widget').find('.ec-footer-dropdown');
         $this.slideToggle('slow');
         $('.ec-footer-dropdown').not($this).slideUp('slow');
     });
    });

    /*--------------------- Add To  Cart Toast -------------------------------- */    
    $(document).ready(function(){
        $(".ec-btn-group.add-to-cart").click(function() {
            $("#addtocart_toast").addClass("show");
            setTimeout(function(){ $("#addtocart_toast").removeClass("show") }, 3000);
        });

        $(".ec-btn-group.wishlist").click(function() {
            $("#wishlist_toast").addClass("show");
            setTimeout(function(){ $("#wishlist_toast").removeClass("show") }, 3000);
        });
    });
    
    $(document).ready(function(){
        $('.ec-pro-image').append( "<div class='ec-pro-loader'></div>" );
    });

   /*--------------------- BG Skin ---------------------- */
    (function () {
        $().appendTo($('body'));
    })();

    $(".bg-option-box").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("in-out")) {
            $(".bg-switcher").stop().animate({ right: "0px" }, 100);
            if ($(".color-option-box").not("in-out")) {
                $(".skin-switcher").stop().animate({ right: "-163px" }, 100);
                $(".color-option-box").addClass("in-out");
            }
            if ($(".layout-option-box").not("in-out")) {
                $(".layout-switcher").stop().animate({ right: "-163px" }, 100);
                $(".layout-option-box").addClass("in-out");
            }
        } else {
            $(".bg-switcher").stop().animate({ right: "-163px" }, 100);
        }

        $(this).toggleClass("in-out");
        return false;

    });

    /*--------------------- BG Image ---------------------- */
    $('.back-bg-1').on('click', function (e) {
        var bgID = $(this).attr("id");
        var bgClass = "body-bg-1";
        setBGImage(bgID, bgClass);
    });

    $('.back-bg-2').on('click', function (e) {
        var bgID = $(this).attr("id");
        var bgClass = "body-bg-2";
        setBGImage(bgID, bgClass);
    });

    $('.back-bg-3').on('click', function (e) {
        var bgID = $(this).attr("id");
        var bgClass = "body-bg-3";
        setBGImage(bgID, bgClass);
    });

    $('.back-bg-4').on('click', function (e) {
        var bgID = $(this).attr("id");
        var bgClass = "body-bg-4";
        setBGImage(bgID, bgClass);
    });

    function setBGImage(bgID, bgClass) {
        $("body").removeClass("body-bg-1");
        $("body").removeClass("body-bg-2");
        $("body").removeClass("body-bg-3");
        $("body").removeClass("body-bg-4");

        $("body").addClass(bgClass);

        $("#bg-switcher-css").attr("href", "assets/demo-4/css/backgrounds/" + bgID + ".css");

        var bgIDClass = bgID + '||' + bgClass;

        ecCreateCookie('bgImageModeCookie', bgIDClass, 1);
    }

    /*--------------------- Language select options google translate ---------------------- */
    $(".lang-option-box").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("in-out")) {
            $(".lang-switcher").stop().animate({ right: "0px" }, 100);
            if ($(".color-option-box").not("in-out")) {
                $(".skin-switcher").stop().animate({ right: "-163px" }, 100);
                $(".color-option-box").addClass("in-out");
            }
            if ($(".layout-option-box").not("in-out")) {
                $(".layout-switcher").stop().animate({ right: "-163px" }, 100);
                $(".layout-option-box").addClass("in-out");
            }
        } else {
            $(".lang-switcher").stop().animate({ right: "-163px" }, 100);
        }

        $(this).toggleClass("in-out");
        return false;

    });

    /*--------------------- Tools sidebar ---------------------- */
    $(".ec-tools-sidebar-toggle").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("in-out")) {
            $(".ec-tools-sidebar").stop().animate({ right: "0px" }, 100);
            $(".ec-tools-sidebar-overlay").fadeIn();
            if ($(".ec-tools-sidebar-toggle").not("in-out")) {
                $(".ec-tools-sidebar").stop().animate({ right: "-280px" }, 100);
                $(".ec-tools-sidebar-toggle").addClass("in-out");
                // $(".ec-tools-sidebar-overlay").fadeOut();
            }
            if ($(".ec-tools-sidebar-toggle").not("in-out")) {
                $(".ec-tools-sidebar").stop().animate({ right: "0" }, 100);
                $(".ec-tools-sidebar-toggle").addClass("in-out");
                $(".ec-tools-sidebar-overlay").fadeIn();
            }
        } else {
            $(".ec-tools-sidebar").stop().animate({ right: "-280px" }, 100);
            $(".ec-tools-sidebar-overlay").fadeOut();
        }

        $(this).toggleClass("in-out");
        return false;
    });

    $(".ec-tools-sidebar-overlay").on("click", function (e) {
        $(".ec-tools-sidebar-toggle").addClass("in-out");
        $(".ec-tools-sidebar").stop().animate({ right: "-280px" }, 100);
        $(".ec-tools-sidebar-overlay").fadeOut();
    });

    /*--------------------- Instagram slider & Category slider & Tooltips ---------------------*/
    $(function(){
        $('.insta-auto').infiniteslide({
            direction: 'left',
            speed: 50,
            clone: 10
        });
        $('[data-toggle="tooltip"]').tooltip();
    });

     /*----------------------------- Animate On Scroll --------------------*/
     var Animation = function({ offset } = { offset: 10 }) {
        var _elements;
      
        // Define a dobra superior, inferior e laterais da tela
        var windowTop = offset * window.innerHeight / 100;
        var windowBottom = window.innerHeight - windowTop;
        var windowLeft = 0;
        var windowRight = window.innerWidth;
      
        function start(element) {
          // Seta os atributos customizados
          element.style.animationDelay = element.dataset.animationDelay;
          element.style.animationDuration = element.dataset.animationDuration;
          // Inicia a animacao setando a classe da animacao
          element.classList.add(element.dataset.animation);
          // Seta o elemento como animado
          element.dataset.animated = "true";
        }
      
        function isElementOnScreen(element) {
          // Obtem o boundingbox do elemento
          var elementRect = element.getBoundingClientRect();
          var elementTop =
            elementRect.top + parseInt(element.dataset.animationOffset) ||
            elementRect.top;
          var elementBottom =
            elementRect.bottom - parseInt(element.dataset.animationOffset) ||
            elementRect.bottom;
          var elementLeft = elementRect.left;
          var elementRight = elementRect.right;
      
          // Verifica se o elemento esta na tela
          return (
            elementTop <= windowBottom &&
            elementBottom >= windowTop &&
            elementLeft <= windowRight &&
            elementRight >= windowLeft
          );
        }
        var els = _elements = document.querySelectorAll(
            "[data-animation]:not([data-animated])"
        );
        // Percorre o array de elementos, verifica se o elemento está na tela e inicia animação
        function checkElementsOnScreen(_elements) {
            var els = _elements;
            for (var i = 0, len = els.length; i < len; i++) {
                // Passa para o proximo laço se o elemento ja estiver animado
                if (els[i].dataset.animated) continue;
        
                isElementOnScreen(els[i]) && start(els[i]);
            }
        }
      
        // Atualiza a lista de elementos a serem animados
        function update() {
          _elements = document.querySelectorAll(
            "[data-animation]:not([data-animated])"
          );
          checkElementsOnScreen(_elements);
        }
      
        // Inicia os eventos
        window.addEventListener("load", update, false);
        window.addEventListener("scroll", () => checkElementsOnScreen(_elements), { passive: true });
        window.addEventListener("resize", () => checkElementsOnScreen(_elements), false);
      
        // Retorna funcoes publicas
        return {
          start,
          isElementOnScreen,
          update
        };
    };
      
    // Initialize
    var options = {
        offset: 20 //percentage of window
    };
    
    var animation = new Animation(options);

      /*--------------------- Custom Cursor JS -------------------------------- */
  var ms_cursor = document.querySelector('.ec-cursor');
  var ms_cursorinner = document.querySelector('.ec-cursor-2');
  var a = document.querySelectorAll('a');

  document.addEventListener('mousemove', function(e){
    var x = e.clientX;
    var y = e.clientY;
    ms_cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
  });

  document.addEventListener('mousemove', function(e){
    var x = e.clientX;
    var y = e.clientY;
    ms_cursorinner.style.left = x + 'px';
    ms_cursorinner.style.top = y + 'px';
  });

  document.addEventListener('mousedown', function(){
    ms_cursor.classList.add('click');
    ms_cursorinner.classList.add('ec-cursorinnerhover')
  });

  document.addEventListener('mouseup', function(){
    ms_cursor.classList.remove('click')
    ms_cursorinner.classList.remove('ec-cursorinnerhover')
  });

  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      ms_cursor.classList.add('ms-hover-cursor');
    });
    item.addEventListener('mouseleave', () => {
      ms_cursor.classList.remove('ms-hover-cursor');
    });
  })

})(jQuery);
