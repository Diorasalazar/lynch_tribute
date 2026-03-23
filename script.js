document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Time Injection
    const timeElements = document.querySelectorAll('.current-time');
    if (timeElements.length > 0) {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const timeString = `${hours}:${minutes} ${ampm}`;
            timeElements.forEach(el => el.textContent = timeString);
        };
        updateTime();
        setInterval(updateTime, 60000); // update every minute
    }

    // Subtle mouse move effect for the glow
    const glowTop = document.querySelector('.glow-top');
    const glowBottom = document.querySelector('.glow-bottom');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        if(glowTop) {
            glowTop.style.transform = `translateX(${(x - 0.5) * 10}px)`;
        }
        if(glowBottom) {
            glowBottom.style.transform = `translateX(${(x - 0.5) * -10}px)`;
        }
    });

    // Shuffle Functionality
    const shuffleElements = (containerSelector, itemSelector) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const itemsArray = Array.from(container.querySelectorAll(itemSelector));
        
        // Fisher-Yates Shuffle
        for (let i = itemsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [itemsArray[i], itemsArray[j]] = [itemsArray[j], itemsArray[i]];
        }
        
        // Clear and append shuffled
        container.innerHTML = '';
        itemsArray.forEach(item => {
            // Reset animations for fresh reveal
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            container.appendChild(item);
        });

        // Trigger reveal effect again
        itemsArray.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 + (index * 50));
        });
    };

    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            // Detect which page we are on
            if (document.querySelector('.gallery-grid')) {
                shuffleElements('.gallery-grid', '.gallery-item');
            } else if (document.querySelector('.messages-grid')) {
                shuffleElements('.messages-grid', '.message-card');
            }
        });
    }

    // Add visual reveal effect to gallery items on page load
    const items = document.querySelectorAll('.gallery-item, .message-card');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.8s ease ' + (index * 0.1) + 's';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const expandibleImages = document.querySelectorAll('.gallery-item img, .message-image');

    if (lightbox && expandibleImages.length > 0) {
        expandibleImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }
});
