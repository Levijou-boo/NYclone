const asciiArt = `
<!--
         0000000                         000        0000000
       111111111      11111111100          000      111111111
       00000        111111111111111111      00000      000000
       000        1111111111111111111111111100000         000
       000        1111       1111111111111111100          000
       000         11       0     1111111100              000
       000          1      00             1               000
       000               00      00       1               000
       000             000    00000       1               000
    00000            0000  00000000       1                00000
  11111            000 00    000000      000                 11111
    00000          0000      000000     00000              00000
       000        10000      000000      000              0000
       000        00000      000000       1               000
       000        000000     10000        1     0         000
       000        1000000 00              1    00         000
       000         1111111                1 0000          000
       000          1111111100           000000           000
       0000          111111111111111110000000            0000
       111111111        111111111111100000          111111111
         0000000              00000000              0000000

      NYTimes.com: All the code that's fit to window.print()
      We're hiring: https://boards.greenhouse.io/thenewyorktimes
   -->`
console.log(asciiArt)

const SCROLLHEIGHT = 200;

let navbar = document.getElementById('header-bar');
window.addEventListener('scroll', function () {
  if (window.scrollY > SCROLLHEIGHT) {
    navbar.classList.add('display-show');
  } else {
    navbar.classList.remove('display-show');
  }
})

let headerMenu = document.getElementById('header-menu');
let headerMeneWrapper = document.getElementById('header-menu-wrapper');
let headerMenuExtend = document.querySelector('.header-menu-extend');
let headerMenuMid = document.querySelector('.mid');

// headerMenu에 마우스를 올렸을 때
headerMenu.addEventListener('mouseover', function () {
  headerMenuExtend.classList.add('header-menu-extend-display-show');
});

// headerMenuExtend에 마우스를 올렸을 때
headerMenuExtend.addEventListener('mouseover', function () {
  this.classList.add('header-menu-extend-display-show');
});



let textElements = ["S&P 500", "NASDACK", "DOW JONES"];
let rateElements = ["+0.16", "-0.34", "+0.56"];
let currentIndex = 0;

function updateText() {
  currentIndex = (currentIndex + 1) % textElements.length;
  let stock = document.getElementById("stock");
  let stockRate = document.getElementById("stock-rate");
  let stockArrow = document.getElementById("stock-arrow");

  stock.style.opacity = 0;
  stockRate.style.opacity = 0;
  stockArrow.style.opacity = 0;

  setTimeout(() => {
    if (rateElements[currentIndex].startsWith('+')) {
      stockRate.style.color = "green";
      stockArrow.style.color = "green";
      stockArrow.textContent = "north";
    } else {
      stockRate.style.color = "red";
      stockArrow.style.color = "red";
      stockArrow.textContent = "south";
    }
    stock.textContent = textElements[currentIndex];
    stockRate.textContent = rateElements[currentIndex];
    stock.style.opacity = 1;
    stockRate.style.opacity = 1;
    stockArrow.style.opacity = 1;
  }, 500);
}
document.addEventListener('DOMContentLoaded', function () {
  //최초 1번 실행
  updateText();
  setInterval(updateText, 5000);
});


let timeoutId = null; // 타임아웃 ID를 저장할 변수

// headerMenuExtend에서 마우스가 벗어났을 때
headerMenuExtend.addEventListener('mouseout', function (event) {
  //  headerMenuExtend의 자식 요소로부터 발생했는지 확인
  if (!this.contains(event.relatedTarget)) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      this.classList.remove('header-menu-extend-display-show');
    }, 1000);
  }
});

headerMenuMid.addEventListener('mouseover', function () {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    headerMenuExtend.classList.remove('header-menu-extend-display-show');
  }, 1000);


});

//toggle headerMenu 
let toggle = document.getElementById('menu-icon');
let nav = document.getElementById('navbar');

toggle.addEventListener('change', function () {
  // 체크박스가 체크되면 nav를 표시, 아니면 숨김
  if (this.checked) {
    nav.classList.add('nav-display-show');
  } else {
    nav.classList.remove('nav-display-show');
  }
});

//sidebar close
nav.addEventListener('mouseleave', function () {
  nav.classList.remove('nav-display-show');
  toggle.checked = false; // 체크박스도 해제
});