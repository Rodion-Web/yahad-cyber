const tournamentDate = new Date("2026-09-18T10:00:00+03:00").getTime();
const countdownIds = ["days", "hours", "minutes", "seconds"];
const countdownNodes = countdownIds.map((id) => document.getElementById(id));
const cursorGlow = document.querySelector(".cursor-glow");
const regForm = document.getElementById("regForm");
const successMessage = document.getElementById("success");

function scrollToForm() {
    document.getElementById("form").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

function updateCountdown() {
    const distance = Math.max(tournamentDate - Date.now(), 0);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    [days, hours, minutes, seconds].forEach((value, index) => {
        countdownNodes[index].textContent = String(value).padStart(2, "0");
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

document.addEventListener("pointermove", (event) => {
    cursorGlow.style.setProperty("--x", `${event.clientX}px`);
    cursorGlow.style.setProperty("--y", `${event.clientY}px`);
});

regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.classList.add("visible");
    regForm.reset();

    window.setTimeout(() => {
        successMessage.classList.remove("visible");
    }, 4000);
});

updateCountdown();
window.setInterval(updateCountdown, 1000);
