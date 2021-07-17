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
const isotope = new Isotope(".cases",{
    layoutMode:"fitRows",
    itemSelector:".case-item"
});
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click",e=>{
    const filterOption = e.target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn=>btn.classList.remove("active"));
        e.target.classList.add("active");
        isotope.arrange({filter:filterOption});
    }
});