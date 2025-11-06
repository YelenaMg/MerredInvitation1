document.addEventListener('DOMContentLoaded', () => {

    // ====================================================
    // Գլխավոր Նկարների Սլայդեր (Անփոփոխ)
    // ====================================================

    const images = [
       './couple-3.jpg' , './couple-2.jpg', './couple-1.jpg', './couple-4.jpg'
    ];
    const imgBox = document.querySelector('.img-box');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;

    function updateBackgroundImage() {
        if(imgBox) imgBox.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateBackgroundImage();
    }
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateBackgroundImage();
    }

    if(prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if(nextBtn) nextBtn.addEventListener('click', showNextImage);
    if(imgBox) updateBackgroundImage();

    
    // ====================================================
    // ՀԵՏՀԱՇՎԱՐԿԻ ՖՈՒՆԿՑԻՈՆԱԼՈՒԹՅՈՒՆԸ (Անփոփոխ)
    // ====================================================

    const weddingDate = new Date("2025-12-10T18:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownTimerBox = document.querySelector('.running-numbers-box');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if(countdownTimerBox) {
                countdownTimerBox.innerHTML = '<h2 class="runing-numbers-title">Մեր Հարսանիքը Արդեն Տեղի է Ունեցել։ Շնորհակալություն Միանալու Համար։</h2>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown(); 
    const countdownInterval = setInterval(updateCountdown, 1000);


    // ====================================================
    // 🔊 ՎԵՐՋՆԱԿԱՆ ԵՐԱԺՇՏՈՒԹՅԱՆ ԿԱՌԱՎԱՐՈՒՄ
    // Միացում ցանկացած իսկական click-ից հետո
    // ====================================================

    const audioEl = document.getElementById('wedding-music');
    const toggleBtn = document.getElementById('music-toggle-btn');
    const iconPlaying = document.querySelector('.music-toggle-btn .playing');
    const iconPaused = document.querySelector('.music-toggle-btn .paused');
    let isPlaying = false;
    let hasInteracted = false; 

    // Օժանդակ ֆունկցիա՝ կոճակի վիճակը թարմացնելու համար
    function updateToggleButton(playing) {
        if (iconPlaying && iconPaused) {
            if (playing) {
                iconPlaying.classList.remove('hidden');
                iconPaused.classList.add('hidden');
                isPlaying = true;
            } else {
                iconPlaying.classList.add('hidden');
                iconPaused.classList.remove('hidden');
                isPlaying = false;
            }
        }
    }
    
    // Ֆունկցիա՝ ԵՐԱԺՇՏՈՒԹՅՈՒՆԸ ԱՎՏՈՄԱՏ ՄԻԱՑՆԵԼՈՒ ՀԱՄԱՐ (միայն click-ից հետո)
    function autoPlayOnClick() {
        if (!audioEl || hasInteracted) {
            return;
        }

        audioEl.play()
            .then(() => {
                hasInteracted = true;
                updateToggleButton(true);
                console.log('Երաժշտությունը հաջողությամբ միացավ առաջին Click-ից հետո։');
                // Հեռացնել լսողը, որպեսզի կրկին չփորձի
                document.removeEventListener('click', autoPlayOnClick);
            })
            .catch(error => {
                console.warn("Ավտոմատ երաժշտության միացումը ձախողվեց:", error);
                hasInteracted = true;
                document.removeEventListener('click', autoPlayOnClick);
                updateToggleButton(false);
            });
    }
    
    // Կոճակով միացման/անջատման ֆունկցիա
    function toggleMusic(e) {
        if (e) e.stopPropagation(); 
        if (!audioEl) return;

        if (audioEl.paused) {
            audioEl.play()
                .then(() => {
                    hasInteracted = true; 
                    updateToggleButton(true);
                })
                .catch(error => {
                    alert("Երաժշտությունը չի կարող միանալ։");
                });
        } else {
            audioEl.pause();
            updateToggleButton(false);
        }
    }

    // Կոճակի կապումը ֆունկցիային
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMusic);
    }
    
    // Նախնական վիճակի կարգավորում
    if (audioEl) {
         audioEl.volume = 0.7; 
         audioEl.pause();
         updateToggleButton(false); 
    }
    
    // ԼՍԵԼ ՑԱՆԿԱՑԱԾ CLICK ԷՋՈՒՄ՝ ԵՐԱԺՇՏՈՒԹՅՈՒՆԸ ՄԻԱՑՆԵԼՈՒ ՀԱՄԱՐ
    document.addEventListener('click', autoPlayOnClick);
    // document.addEventListener('scroll', autoPlayOnClick); // Հեռացված է, քանի որ անվստահելի է


    // ====================================================
    // SCROLL REVEAL (Intersection Observer) (Անփոփոխ)
    // ====================================================

    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealElement(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed'); 
                observer.unobserve(entry.target); 
            }
        });
    }

    const observer = new IntersectionObserver(revealElement, {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
    

    // ====================================================
    // ԴՐԵՍ-ԿՈԴԻ ՍԼԱՅԴԵՐՆԵՐ (Անփոփոխ)
    // ====================================================

    const womenImages = [
        './dress-women-1.jpg', './dress-women-2.jpg', './dress-women-3.jpg'
    ];
    const manImages = [
        './dress-man-1.jpg', './dress-man-2.jpg', './dress-man-3.jpg'
    ];

    function setupDressCodeSlider(imagesArray, displayId, prevBtnClass, nextBtnClass) {
        const displayEl = document.getElementById(displayId);
        const prevBtn = document.querySelector(prevBtnClass);
        const nextBtn = document.querySelector(nextBtnClass);
        let currentIndex = 0;

        function updateDisplay() {
            if(displayEl) displayEl.style.backgroundImage = `url('${imagesArray[currentIndex]}')`;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            updateDisplay();
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            updateDisplay();
        }
        
        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        if (nextBtn) nextBtn.addEventListener('click', showNext);
        
        if(displayEl) updateDisplay();
    }

    setupDressCodeSlider(womenImages, 'women-display', '.prev-btn-women', '.next-btn-women');
    setupDressCodeSlider(manImages, 'man-display', '.prev-btn-man', '.next-btn-man');

});