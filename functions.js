const flipClock = document.getElementById("flip-clock");
flipClock.addEventListener("click", () => {
    const card = document
        .getElementById("4th")
        .querySelector(".top")
        .querySelectorAll(".card");

    // Toggle the flip class on cards
    // start with last one and work backwards with delay
    for (let i = card.length - 1; i >= 0; i--) {
        setTimeout(() => {
            // is first card don't add class
            if (i === 0) return;
            card[i].classList.toggle("flipped");

            // translateZ add -1px to fix order issue
            card[i].style.transform = `rotateX(-180deg) translateZ(-${-i + card.length}px) translateY(5px)`;
            
        }, 800 * (card.length - i));
    }
});
