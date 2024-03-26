const section2023Observer = new IntersectionObserver(entries => {
    const section2023 = entries[0];

    const card = document.getElementById("4th").querySelector(".top").querySelector(".card:last-of-type");

    if (section2023.isIntersecting) {
        card.classList.toggle("flipped", section2023.isIntersecting);
    } else {
        card.classList.remove("flipped");
    }
},{
    threshold: 1,
});

section2023Observer.observe(document.getElementById("2023"));


const sectionsObserver = new IntersectionObserver(entries => {
    const section2024 = entries[0];
    const section2023 = entries[1];
    const section2022 = entries[2];
    const section2021 = entries[3];
    const section2020 = entries[4];
    const section2019 = entries[5];
    const section2018 = entries[6];
    const section2017 = entries[7];
    const section2016 = entries[8];
    const section2015 = entries[9];
    const section2014 = entries[10];
    const section2013 = entries[11];

    const card = document.getElementById("4th").querySelector(".top").querySelectorAll(".card");

    if (section2024.isIntersecting) {
       card.forEach (card => card.classList.remove("flipped"));
    } else if (section2023.isIntersecting) {
        card[0].classList.add("flipped", section2023.isIntersecting);
        card[1].classList.remove("flipped");
    } else if (section2022.isIntersecting) {
        card[1].classList.add("flipped", section2022.isIntersecting);
        card[2].classList.remove("flipped");
    }



}, {
    threshold: 1,
});


sectionsObserver.observe(document.querySelectorAll(".section"));



        // const flipClock = document.getElementById("flip-clock");
// flipClock.addEventListener("click", () => {
//     const card = document
//         .getElementById("4th")
//         .querySelector(".top")
//         .querySelectorAll(".card");

//     // Toggle the flip class on cards
//     // start with last one and work backwards with delay
//     for (let i = card.length - 1; i >= 0; i--) {
//         setTimeout(() => {
//             // is first card don't add class
//             if (i === 0) return;
//             card[i].classList.toggle("flipped");

//             // translateZ add -1px to fix order issue
//             card[i].style.transform = `rotateX(-180deg) translateZ(-${-i + card.length}px) translateY(5px)`;
            
//         }, 800 * (card.length - i));
//     }
// });