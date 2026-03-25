// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Typed.js Effect
var typed = new Typed("#typed", {
  strings: [
    "Software Developer",
    "CSE Student",
    "Cybersecurity Enthusiast",
    "Problem Solver",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
});

// Particle Background logic
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 210, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

// Copy Email to Clipboard
function copyEmail() {
  const email = document.getElementById("user-email").innerText;
  navigator.clipboard.writeText(email).then(() => {
    const hint = document.querySelector(".copy-hint");
    hint.innerText = "Copied!";
    setTimeout(() => {
      hint.innerText = "Click to Copy";
    }, 2000);
  });
}

// Simple Form Feedback
const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-button");
const btnText = btn.querySelector("span");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  btnText.innerText = "Sending...";
  btn.disabled = true;

  const formData = new FormData(form);

  fetch("https://formcarry.com/s/GW6xia5rLzP", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => {
      if (response.ok) {
        // Success State
        btnText.innerText = "Message Sent! ✓";
        btn.style.background = "linear-gradient(45deg, #00ff88, #00d2ff)";
        form.reset(); // Clear the form
      } else {
        // Error State
        btnText.innerText = "Error! Try Again.";
        btn.style.background = "#ff4b2b";
      }
    })
    .catch((error) => {
      btnText.innerText = "Connection Error";
      btn.style.background = "#ff4b2b";
    })
    .finally(() => {
      // Revert button after 4 seconds
      setTimeout(() => {
        btnText.innerText = "Send Message";
        btn.style.background = ""; // Returns to CSS default
        btn.disabled = false;
      }, 4000);
    });
});
