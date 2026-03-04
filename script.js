// Hamburger menu
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}

// Close menu on link click
document.querySelectorAll('#nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

// Typing animation
const typingElement = document.querySelector(".typing");
const words = ["Software Developer","AI Enthusiast","Cloud & Networking Specialist","Innovator"];
let wordIndex = 0, letterIndex = 0, currentWord="", isDeleting=false;

function type() {
    if(wordIndex >= words.length) wordIndex = 0;
    currentWord = words[wordIndex];
    if(isDeleting){
        typingElement.textContent = currentWord.substring(0, letterIndex--);
        if(letterIndex < 0){ isDeleting=false; wordIndex++; setTimeout(type,300); }
        else setTimeout(type,100);
    } else {
        typingElement.textContent = currentWord.substring(0, letterIndex++);
        if(letterIndex > currentWord.length){ isDeleting=true; setTimeout(type,1000); }
        else setTimeout(type,150);
    }
}
type();

// Particle background
const canvas = document.getElementById("particles"), ctx = canvas.getContext("2d");
let particlesArray;
canvas.width = window.innerWidth;
canvas.height = document.querySelector(".hero").offsetHeight;

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;
    initParticles();
});

class Particle{
    constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*3+1; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; }
    update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x<0||this.x>canvas.width)this.speedX*=-1; if(this.y<0||this.y>canvas.height)this.speedY*=-1; }
    draw(){ ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
}

function initParticles(){ particlesArray=[]; for(let i=0;i<80;i++){ particlesArray.push(new Particle()); } }
initParticles();

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p=>{ p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Scroll reveal sections
const sections = document.querySelectorAll("section");
function revealSections(){
    sections.forEach(section=>{
        if(section.getBoundingClientRect().top < window.innerHeight-100){
            section.classList.add("show");
        }
    });
}
revealSections();
window.addEventListener("scroll",revealSections);

// Back to top button
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", ()=>{ backToTopBtn.style.display=(window.scrollY>300)?"block":"none"; });
backToTopBtn.addEventListener("click", ()=>{ window.scrollTo({top:0,behavior:"smooth"}); });

// Animate skill bars on scroll
const skills = document.querySelectorAll(".progress");
window.addEventListener("scroll", ()=>{
    skills.forEach(skill=>{
        if(skill.getBoundingClientRect().top < window.innerHeight-50){
            skill.style.width = skill.style.getPropertyValue('--progress-width');
        }
    });
});