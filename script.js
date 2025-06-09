document.addEventListener('DOMContentLoaded', function() {
    const menuListContainer = document.querySelector('.menu-list-container');
    const modal = document.getElementById('audio-warning-modal');
    const enableBtn = document.getElementById('enable-audio-btn');

    function handleHoverSound() {
        const audio = this.nextElementSibling;
        if(audio) {
            audio.volume = 1.0;
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio error:", e));
        }
    }

    function playOpenSound() {
        const openSound = document.getElementById('open-sound');
        openSound.currentTime = 0;
        openSound.play().catch(e => console.log("Open sound error:", e));
    }

    function showMainMenu() {
        document.querySelector('.main-menu-container h1').textContent = 'Main Menu';
        
        const mainMenuHTML = `
            <ol>
                <li><a href="#" class="hover-sound">START GAME</a><audio class="hover-audio" src="Assets/hover.MP3" preload="auto"></audio></li>
                <li><a href="#" class="hover-sound">OPTIONS</a><audio class="hover-audio" src="Assets/hover.MP3" preload="auto"></audio></li>
                <li><a href="#" class="hover-sound">QUIT GAME</a><audio class="hover-audio" src="Assets/hover.MP3" preload="auto"></audio></li>
            </ol>
        `;
        
        menuListContainer.innerHTML = mainMenuHTML;
        document.querySelector('.main-menu-container').style.display = 'block';
        menuListContainer.style.display = 'flex';
        
        initHoverSounds();
        initClickSounds();
    }

    function initHoverSounds() {
        document.querySelectorAll('.hover-sound').forEach(link => {
            link.removeEventListener('mouseenter', handleHoverSound);
            link.addEventListener('mouseenter', handleHoverSound);
        });
    }

    function initClickSounds() {
        document.querySelectorAll('.hover-sound').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                playOpenSound();
            });
        });
    }

    if(modal && enableBtn) {
        modal.style.display = 'flex';
        
        enableBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            
            document.querySelectorAll('.hover-audio').forEach(audio => {
                audio.volume = 1.0;
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(e => console.log("Audio activation error:", e));
            });
        });
    }

    initHoverSounds();
    showMainMenu();
});