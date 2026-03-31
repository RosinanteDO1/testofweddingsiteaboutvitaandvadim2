// 🔒 ПРЕЛОАДЕР
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enterBtn');
const music = document.getElementById('music');
const site = document.getElementById('site'); // Находим блок сайта

document.body.classList.add('preloader-active');

enterBtn.onclick = () => {
  // 1. Показываем блок сайта (он был display: none)
  if (site) {
    site.style.display = "block";
  }

  // 2. Скрываем прелоадер
  preloader.style.opacity = "0";
  
  setTimeout(() => {
    preloader.style.display = "none";
    document.body.classList.remove('preloader-active');
    
    // Перезапускаем наблюдатель для анимаций, чтобы текст появился сразу после входа
    refreshObserver(); 

    positionIris();
  }, 1000);

  if (music) music.play();
};

// ⏳ ТАЙМЕР
const weddingDate = new Date("2026-07-03T15:00:00"); // Дата из твоего макета

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
}

function updateTimer() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        // Если дата прошла, можно обнулить или скрыть таймер
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if(document.getElementById('d-val')) {
        // Выводим цифры
        document.getElementById('d-val').textContent = d;
        document.getElementById('h-val').textContent = String(h).padStart(2, '0');
        document.getElementById('m-val').textContent = String(m).padStart(2, '0');
        document.getElementById('s-val').textContent = String(s).padStart(2, '0');

        // А ТЕПЕРЬ МАГИЯ: Склоняем подписи
        // Ищем тег <small> внутри каждого блока и меняем текст
        document.querySelector('#d-val + small').textContent = getNoun(d, 'день', 'дня', 'дней');
        document.querySelector('#h-val + small').textContent = getNoun(h, 'час', 'часа', 'часов');
        document.querySelector('#m-val + small').textContent = getNoun(m, 'минута', 'минуты', 'минут');
        document.querySelector('#s-val + small').textContent = getNoun(s, 'секунда', 'секунды', 'секунд');
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// ✨ АНИМАЦИИ (Появление при скролле)
function refreshObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Оставляем текст видимым (не исчезает при скролле назад)
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// 🔊 ЗВУК
const toggle = document.getElementById('soundToggle');
if (toggle) {
    toggle.onclick = () => {
      if (music.paused) {
        music.play();
        toggle.textContent = "🔊";
      } else {
        music.pause();
        toggle.textContent = "🔇";
      }
    };
}

function positionIris() {
  const hero = document.getElementById('hero');
  const timing = document.getElementById('timing');
  const contacts = document.getElementById('contacts');

  const iris1 = document.querySelector('.iris-1');
  const iris3 = document.querySelector('.iris-3');
  const iris4 = document.querySelector('.iris-4');

  function setPosition(section, iris, side) {
    if (!section || !iris) return;

    const top = section.offsetTop;

    iris.style.top = top + "px";
    iris.style.left = "";
    iris.style.right = "";

    if (side === "left") {
      iris.style.left = "0";
    } else {
      iris.style.right = "0";
    }
  }

  setPosition(hero, iris1, "right");
  setPosition(timing, iris3, "left");
  setPosition(contacts, iris4, "right");
}

window.addEventListener("load", positionIris);
window.addEventListener("resize", positionIris);