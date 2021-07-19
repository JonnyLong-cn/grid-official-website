// glide
const glide = new Glide('.glide');
const captionsEl = document.querySelectorAll('.slide-caption');
glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        // 延迟从300ms开始，然后每个元素增加400ms。
        delay: anime.stagger(400, { start: 200 }),
        translateY: [anime.stagger([40, 10]), 0]
    });
})

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption>*").forEach(el => {
        el.style.opacity = 0;
    });
})

glide.mount();

// isotope
const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", e => {
    const filterOption = e.target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        isotope.arrange({ filter: filterOption });
    }
});

// 控制导航栏的向下滑动和返回顶部
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");
window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset - height > 600) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
})

// 动画加载效果
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom",
};

// interval设置等待时间
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: (el) => {
                return [0, el.innerHTML];
            },
            duration: 1500,
            round: 1,
            easinge: "easeInExpo",
        });
        dataSectionEl.style.backgroundPosition = "center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)";
    },
});
window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect.top;
    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = "center calc(50% - ${bottom/5}px)";
    }
});

const scroll = new SmoothScroll(
    'nav a[href*="#"] , .scroll-to-top a[href*="#"]',
    {
        header: "header",
        offset: 50,
    }
);

document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});
// 折叠按钮事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
})
