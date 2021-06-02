// reveal uls

const selDemos = document.getElementById("demos");
const selDocs = document.getElementById("docs");
const selCountries = document.getElementById("footerCountries");
const selTopbar = document.getElementById("topbar");
const selBottombar = document.getElementById("bottombar");
const match480 = window.matchMedia("(max-width: 480px)");

function toggleNav({ target }) {
    const expanded = target.getAttribute("aria-expanded") === "true" || false;
    target.setAttribute("aria-expanded", !expanded);
    if (match480.matches) {
        if (target.id == "demos") {
            selDocs.setAttribute("aria-expanded", false);
        }
        if (target.id == "docs") {
            selDemos.setAttribute("aria-expanded", false);
        }
    }
}

function handleArrow() {
    if (match480.matches) {
        selDemos.innerHTML = "<i class='arrow left'></i>&nbsp;&nbsp;Demos";
        selDocs.innerHTML = "<i class='arrow left'></i>&nbsp;&nbsp;Docs";
        selDocs.setAttribute("aria-expanded", false);
        selDemos.setAttribute("aria-expanded", false);
        selTopbar.setAttribute("aria-expanded", false);
    } else {
        selDemos.innerHTML = "Demos&nbsp;&nbsp;&nbsp;<i class='arrow down'></i>";
        selDocs.innerHTML = "Docs&nbsp;&nbsp;&nbsp;<i class='arrow down'></i>";
    }
}

selDemos.addEventListener("click", toggleNav);
selDocs.addEventListener("click", toggleNav);
selCountries.addEventListener("click", toggleNav);
selTopbar.addEventListener("click", toggleNav);
selBottombar.addEventListener("click", toggleNav);
match480.addEventListener("change", handleArrow);
handleArrow();

// rotate pictures and text in the hire-us section

const fadeElements = document.querySelectorAll(".fader");
const resizeElements = document.querySelectorAll(".image-class img");
resizeElements[2].classList.add("zoomin");
var current = 0;
var previous = 2;

const quotes = [
    "The template is really nice and offers quite a large set of options. Thank you!",
    "It's beautiful and the coding is done quickly and seamlessly. Keep it up!",
    "I love Front! I love the ease of use, I love the fact that I have total creative freedom...",
];
const names = ["Christina Kray", "James Austin", "Charlotte Moore"];
const titles = [
    "Social Media Executive, Airbnb",
    "Executive Creative Director, HubSpot",
    "Head of Commercials, Slack",
];

setInterval(function() {
    fadeElements.forEach((el) => {
        el.classList.add("hide");
    });
    setTimeout(function() {
        document.querySelector(".quote").innerHTML = quotes[current];
        document.querySelector(".name").innerHTML = names[current];
        document.querySelector(".title").innerHTML = titles[current];
    }, 2000);
    setTimeout(function() {
        fadeElements.forEach((el) => {
            el.classList.remove("hide");
        });
        resizeElements[current].classList.add("zoomin");
        resizeElements[previous].classList.remove("zoomin");
        previous = current;
        current = current == 2 ? 0 : current + 1;
    }, 2000);
}, 6000);

// make the navbar fixed

const nav = document.getElementById("navbar");
const navbarBg = document.getElementById("navbarBg");
var flag = 1;
var lastScrollTop = 0;
const scrollUpBtn = document.getElementById("scrollUp");

const handleBottomNavbar = () => {
    if (window.pageYOffset > 85) {
        flag = 0;
        navbarBg.classList.remove("stickySlideUp");
        nav.classList.remove("stickySlideUp");
        nav.classList.add("sticky");
        navbarBg.classList.add("sticky");
        selBottombar.nextElementSibling.style.top = "60px";
        scrollUpBtn.style.display = "block";
    } else {
        if (!flag) {
            navbarBg.classList.add("stickySlideUp");
            nav.classList.add("stickySlideUp");
        }
        nav.classList.remove("sticky");
        navbarBg.classList.remove("sticky");
        selBottombar.nextElementSibling.style.top = "100px";
        scrollUpBtn.style.display = "none";
    }

    var st = window.pageYOffset || document.documentElement.scrollTop;
    var direction = "";
    if (st > lastScrollTop) {
        direction = "down";
    } else {
        direction = "up";
    }
    lastScrollTop = st <= 0 ? 0 : st;
};

//  Highlight bottom nav current item

const bottomNavElements = document.querySelectorAll(".bottomNav-menu");
const colorBtn = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-color-btn");
const colorBase = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-color-base");

function handleBottomNavElements() {
    bottomNavElements.forEach((el) => {
        el.style.color = colorBase;
    });
}

function handleClickBottomNav() {
    selBottombar.setAttribute("aria-expanded", false);
}

bottomNavElements.forEach((ele) =>
    ele.addEventListener("click", handleClickBottomNav)
);

const handleBottomnavMenuItems = () => {
    const featureSectionTop = document
        .getElementById("features")
        .getBoundingClientRect().top;
    const learnSectionTop = document
        .getElementById("learn")
        .getBoundingClientRect().top;
    const pricingSectionTop = document
        .getElementById("pricing")
        .getBoundingClientRect().top;
    const hireUsSectionTop = document
        .getElementById("hireUs")
        .getBoundingClientRect().top;
    handleBottomNavElements();
    if (featureSectionTop > 10) {
        bottomNavElements[0].style.color = colorBtn;
    } else if (learnSectionTop > 10) {
        bottomNavElements[1].style.color = colorBtn;
    } else if (pricingSectionTop > 10) {
        bottomNavElements[2].style.color = colorBtn;
    } else if (hireUsSectionTop > 10) {
        bottomNavElements[3].style.color = colorBtn;
    } else {
        bottomNavElements[4].style.color = colorBtn;
    }
};

// animation on scroll

const scrollElements = document.querySelectorAll(".js-scroll");

scrollElements.forEach((el) => {
    el.style.opacity = 0;
});

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

//Handle throttleTimer

let throttleTimer = false;

const throttle = (callback, time) => {
    //don't run the function while throttle timer is true
    if (throttleTimer) return;

    //first set throttle timer to true so the function doesn't run
    throttleTimer = true;

    setTimeout(() => {
        //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
        callback();
        throttleTimer = false;
    }, time);
};

// Handle window scrolling event listeners

const handleFunctions = () => {
    handleScrollAnimation();
    handleBottomnavMenuItems();
};

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
    //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleFunctions, 250);
        handleBottomNavbar();
    }
});