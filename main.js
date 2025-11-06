
// ... մնացած կոդը ...
// 1. Սահմանում ենք բոլոր նկարների հասցեները
// Խնդրում եմ փոխել այս հասցեները ձեր նկարների իրական հասցեներով:
const images = [
    './couple-1.jpg',
    './couple-2.jpg',
    './couple-3.jpg',
    './couple-4.jpg'
];

// 2. Տարրերի ստացում HTML-ից
const imgBox = document.querySelector('.img-box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// 3. Ընթացիկ նկարի ինդեքսը
let currentImageIndex = 0;

// 4. Ֆունկցիա՝ ֆոնային նկարը թարմացնելու համար
function updateBackgroundImage() {
    // Փոխում ենք imgBox-ի CSS background-image հատկությունը
    imgBox.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    
    // Կամընտրական՝ ավելացնել անցումային էֆեկտներ CSS-ով
    // Օրինակ՝ imgBox-ին ավելացրեք transition: background-image 0.5s ease;
}

// 5. Նախորդ նկարին անցնելու ֆունկցիա
function showPrevImage() {
    // Ինդեքսը նվազեցնում ենք, եթե 0-ից փոքր է, անցնում ենք զանգվածի վերջին էլեմենտին
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateBackgroundImage();
}

// 6. Հաջորդ նկարին անցնելու ֆունկցիա
function showNextImage() {
    // Ինդեքսը մեծացնում ենք, եթե հասնում է վերջին էլեմենտին, անցնում ենք 0
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateBackgroundImage();
}

// 7. Իրադարձությունների լսում (Event Listeners)
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// 8. Էջը բեռնվելիս ցույց տալ առաջին նկարը
updateBackgroundImage();




/*********հետհաշվարկ */


// script.js (Հետհաշվարկի Կոդի Սկիզբ)

// ------------------------------------------
// ՀԵՏՀԱՇՎԱՐԿԻ ՖՈՒՆԿՑԻՈՆԱԼՈՒԹՅՈՒՆԸ
// ------------------------------------------

// 1. ՍԱՀՄԱՆԵՔ ՀԱՐՍԱՆԻՔԻ ԱՄՍԱԹԻՎԸ ԵՎ ԺԱՄԸ
// Օրինակ: 2026 թվականի Հոկտեմբերի 30, ժամը 18:00:00 (Երևանի ժամանակով)
// Կարևոր է ճիշտ ֆորմատը: (YYYY-MM-DDTHH:MM:SS)
const weddingDate = new Date("2026-10-30T18:00:00").getTime();

// 2. ՏԱՐՐԵՐԻ ՍՏԱՑՈՒՄ HTML-ից
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownTimerBox = document.querySelector('.running-numbers-box');

// 3. ՀԻՄՆԱԿԱՆ ՖՈՒՆԿՑԻԱՆ՝ ԺԱՄԱՆԱԿԸ ԹԱՐՄԱՑՆԵԼՈՒ ՀԱՄԱՐ
function updateCountdown() {
    // Ընթացիկ ժամանակը
    const now = new Date().getTime();
    
    // Տարբերությունը հարսանիքի և ընթացիկ ժամանակի միջև
    const distance = weddingDate - now;

    // Եթե ժամանակը սպառվել է (հարսանիքը տեղի է ունեցել)
    if (distance < 0) {
        clearInterval(countdownInterval);
        if(countdownTimerBox) {
            countdownTimerBox.innerHTML = '<h2 class="runing-numbers-title">Մեր Հարսանիքը Արդեն Տեղի է Ունեցել։ Շնորհակալություն Միանալու Համար։</h2>';
        }
        return;
    }

    // Հաշվարկում ենք օրերը, ժամերը, րոպեները և վայրկյանները
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 4. HTML ՏԱՐՐԵՐԻ ԹԱՐՄԱՑՈՒՄ (Ավելացնում ենք "0", եթե միանիշ թիվ է)
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// 5. ԳՈՐԾԱՐԿԵԼ ՀԵՏՀԱՇՎԱՐԿԸ
// Թարմացնել ֆունկցիան անմիջապես, որպեսզի չսպասենք մեկ վայրկյան
updateCountdown(); 

// Թարմացնել ֆունկցիան յուրաքանչյուր վայրկյանը մեկ
const countdownInterval = setInterval(updateCountdown, 1000);




// script.js (Երաժշտության Կոդի Սկիզբ)

// ------------------------------------------
// ԵՐԱԺՇՏՈՒԹՅԱՆ ՆՎԱԳԱՐԿԻՉ
// ------------------------------------------

const audioEl = document.getElementById('wedding-music');
const toggleBtn = document.getElementById('music-toggle-btn');
const iconPlaying = document.querySelector('.music-toggle-btn .playing');
const iconPaused = document.querySelector('.music-toggle-btn .paused');

let isPlaying = false; // Սկզբնական վիճակը

// Ֆունկցիա՝ երաժշտությունը միացնելու/անջատելու համար
function toggleMusic() {
    if (isPlaying) {
        audioEl.pause();
        isPlaying = false;
        iconPlaying.classList.add('hidden');
        iconPaused.classList.remove('hidden');
    } else {
        // audioEl.play()-ը վերադարձնում է Promise, որը կարող է ձախողվել
        // ավտոմատ նվագարկման սահմանափակումների պատճառով:
        audioEl.play()
            .then(() => {
                isPlaying = true;
                iconPlaying.classList.remove('hidden');
                iconPaused.classList.add('hidden');
            })
            .catch(error => {
                // Եթե ավտոմատ նվագարկումը արգելված է, ապա նվագարկիչը կմնա անջատված
                console.log("Ավտոմատ նվագարկումը արգելված է:", error);
                isPlaying = false;
                iconPlaying.classList.add('hidden');
                iconPaused.classList.remove('hidden');
            });
    }
}

// Փորձում ենք ավտոմատ միացնել երաժշտությունը
// Քանի որ բրաուզերների մեծ մասը արգելում է դա, այն հաճախ չի աշխատի մինչև օգտատիրոջ գործողությունը:
audioEl.volume = 0.7; // Ձայնի մակարդակը նվազեցնել (կամընտրական)
toggleMusic(); // Փորձում ենք միացնել, բայց այն կարող է ձախողվել

// Կոճակի կապումը ֆունկցիային
if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
}

// Ապահովում ենք, որ եթե օգտատերը սեղմի կոճակը, այն անպայման միանա
// (Եթե սկզբնական փորձը ձախողվի, կոճակի սեղմումը կգործի):

// script.js ֆայլի այս մասը աշխատում է բոլոր նոր էլեմենտների համար
// script.js ֆայլի վերջում

// ------------------------------------------
// SCROLL REVEAL (Intersection Observer)
// ------------------------------------------

// 1. Ստանում ենք անիմացիա ունեցող բոլոր էլեմենտները
const revealElements = document.querySelectorAll('.scroll-reveal');

// 2. Ֆունկցիա, որը կաշխատի, երբ բլոկը հայտնվի էկրանին
function revealElement(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed'); 
            observer.unobserve(entry.target); 
        }
    });
}

// 3. Ստեղծում ենք Intersection Observer-ը
const observer = new IntersectionObserver(revealElement, {
    root: null, 
    rootMargin: '0px',
    threshold: 0.2 // Անիմացիան սկսել, երբ էլեմենտի 20%-ը հայտնվի էկրանին
});

// 4. Սկսում ենք դիտարկել յուրաքանչյուր reveal էլեմենտ
revealElements.forEach(element => {
    observer.observe(element);
});



// script.js (Դրես-կոդի Սլայդերների Կոդի Սկիզբ)

// ------------------------------------------
// ԴՐԵՍ-ԿՈԴԻ ՍԼԱՅԴԵՐՆԵՐ
// ------------------------------------------

// ԿԱՆԱՆՑ ՀԱՄԱՐ ՆԿԱՐՆԵՐ
const womenImages = [
    './dress-women-1.jpg',
    './dress-women-2.jpg',
    '/dress-women-3.jpg'
];
// ՏՂԱՄԱՐԴԿԱՆՑ ՀԱՄԱՐ ՆԿԱՐՆԵՐ
const manImages = [
    './dress-man-1.jpg',
    './dress-man-2.jpg',
    './dress-man-3.jpg'
];

function setupDressCodeSlider(imagesArray, displayId, prevBtnClass, nextBtnClass) {
    const displayEl = document.getElementById(displayId);
    const prevBtn = document.querySelector(prevBtnClass);
    const nextBtn = document.querySelector(nextBtnClass);
    let currentIndex = 0;

    function updateDisplay() {
        displayEl.style.backgroundImage = `url('${imagesArray[currentIndex]}')`;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        updateDisplay();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        updateDisplay();
    }
    
    // Կապում ենք կոճակները
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    
    // Ցույց տալ առաջին նկարը
    updateDisplay();
}

// ԳՈՐԾԱՐԿՈՒՄ
setupDressCodeSlider(womenImages, 'women-display', '.prev-btn-women', '.next-btn-women');
setupDressCodeSlider(manImages, 'man-display', '.prev-btn-man', '.next-btn-man');

// ՈՒՇԱԴՐՈՒԹՅՈՒՆ: Փոխեք հասցեները Ձեր նկարների ճիշտ հասցեներով: