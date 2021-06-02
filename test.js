const resizeElements = document.querySelectorAll(".image-class img");
resizeElements[2].classList.add("zoomin");
var current = 0;
var previous = 2;

setInterval(function() {
    setTimeout(function() {
        resizeElements[current].classList.add("zoomin");
        resizeElements[previous].classList.remove("zoomin");
        previous = current;
        current = current == 2 ? 0 : current + 1;
    }, 100);
}, 5000);

// *******************************************************

// var timer = setInterval(function() {
//     test.classList.toggle("lightUp");
// }, 1000);

// ****************************************************

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

//initialize throttleTimer as false
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

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
var lastScrollTop = 0;

window.addEventListener("scroll", () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var direction = "";
    if (st > lastScrollTop) {
        direction = "down";
    } else {
        direction = "up";
    }
    lastScrollTop = st <= 0 ? 0 : st;
    //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleScrollAnimation, 250);
    }
});