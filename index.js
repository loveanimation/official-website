const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    // getBoundingClientRect 方法 有6个属性 top 、bottom、right、left、width和height
    let height = headerEl.getBoundingClientRect().height;
    // console.log(height)

    if (window.pageYOffset > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky")
        }
    } else {
        headerEl.classList.remove("sticky")
    }

    // 返回顶部按钮
    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block"
    } else {
        scrollToTop.style.display = "none";
    }

})

const glide = new Glide('.glide');
const captionsEL = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEL[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0],
    });
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption>*").forEach(el => {
        el.style.opacity = 0;
    })
})
glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});


// 成功案例筛选功能
const filterBtns = document.querySelector('.filter-btns');
// console.log(filterBtns)
filterBtns.addEventListener('click', e => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => {
            btn.classList.remove("active")
        });
        isotope.arrange({ filter: filterOption })
    }
})


const staggeringOption = {
    delay: 300,
    /*延迟*/
    distance: "50px",
    /*从上到下50px的移动*/
    duration: 500,
    origin: "bottom",
    /*从上到下*/
}

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350 });
// console.log(ScrollReveal())
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350 })

const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-pice .num",
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 2000,
            round: 1,
            /*增长的数值*/
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
})


window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
})


const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset: -80
});


document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
    console.log(111)
})


const exploreBtnEl = document.querySelectorAll(".explore-btn");
for (var i of exploreBtnEl) {
    i.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"))
    })
}


// 折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open")
})