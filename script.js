// --- KODE GACHA (DIBUNGKUS AGAR TIDAK ERROR DI HALAMAN LAIN) ---
const machine = document.getElementById('gacha-machine');
const gridLeft = document.getElementById('grid-left');
const gridRight = document.getElementById('grid-right');

// Cek apakah kita sedang di halaman yang ada Gacha-nya (Home)
if (machine) {
    const eggStages = ['egg_1.png', 'egg_2.png', 'egg_3.png', 'egg_4.png', 'egg_5.png'];
    const characterDatabase = ['pic_1.png', 'pic_2.png', 'pic_3.png', 'pic_4.png', 'pic_5.png', 'pic_6.png'];

    [...eggStages, ...characterDatabase].forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    machine.addEventListener('click', () => {
        machine.classList.add('machine-shake');
        machine.style.pointerEvents = 'none';
        gridLeft.innerHTML = '';
        gridRight.innerHTML = '';

        setTimeout(() => {
            machine.classList.remove('machine-shake');
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const targetGrid = (i < 3) ? gridLeft : gridRight;
                    createGachaItem(i, targetGrid, eggStages, characterDatabase);
                }, i * 250); 
            }
        }, 600);
    });
}

function createGachaItem(index, targetGrid, eggStages, characterDatabase) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('gacha-item');

    const eggLayers = eggStages.map((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('egg-layer');
        img.style.opacity = i === 0 ? '1' : '0';
        img.style.zIndex = 10 - i;
        itemDiv.appendChild(img);
        return img;
    });
    
    const charImg = document.createElement('img');
    charImg.classList.add('character-photo');
    charImg.src = characterDatabase[index];
    itemDiv.appendChild(charImg);
    targetGrid.appendChild(itemDiv);

    let stage = 0;
    const hatchInterval = setInterval(() => {
        if (stage < eggStages.length - 1) {
            eggLayers[stage].style.opacity = '0';
            stage++;
            eggLayers[stage].style.opacity = '1';
        } else {
            clearInterval(hatchInterval);
            eggLayers[stage].style.opacity = '0';
            setTimeout(() => {
                charImg.classList.add('reveal');
                if (index === 5) document.getElementById('gacha-machine').style.pointerEvents = 'auto';
            }, 100);
        }
    }, 200);
}

// --- KODE LOADING SCREEN (JALAN DI SEMUA HALAMAN) ---
window.addEventListener('load', () => {
    const loadingImg = document.getElementById('loading-img');
    const progressText = document.getElementById('progress-text');
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return; // Jika tidak ada loading screen, berhenti di sini

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1; 
        if (progressText) progressText.innerText = progress + "%";

        if (loadingImg) {
            if (progress < 25) {
                loadingImg.src = "egg_1.png";
            } else if (progress >= 25 && progress < 50) {
                loadingImg.src = "egg_2.png";
            } else if (progress >= 50 && progress < 75) {
                loadingImg.src = "egg_3.png";
            } else if (progress >= 75 && progress < 99) {
                loadingImg.src = "egg_4.png";
            } else if (progress >= 99) {
                loadingImg.src = "egg_6.png"; // Pastikan file egg_6.png ada ya!
            }
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
            }, 500); 
        }
    }, 7.5); 
});