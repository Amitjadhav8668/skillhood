// Performance Optimizations

// 1. API Response Caching
class CacheManager {
    constructor(ttl = 300000) { // 5 minutes default
        this.cache = new Map();
        this.ttl = ttl;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }

    clear() {
        this.cache.clear();
    }
}

window.cache = new CacheManager();

// 2. Debounce for Search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 3. Lazy Load Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 4. Prefetch Critical Data
async function prefetchUserData() {
    if (!localStorage.getItem('token')) return;
    
    try {
        const [profile, skills] = await Promise.all([
            api.getProfile(),
            api.getSkills()
        ]);
        
        cache.set('user-profile', profile);
        cache.set('user-skills', skills);
    } catch (error) {
        console.error('Prefetch failed:', error);
    }
}

// 5. Service Worker for Offline Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    prefetchUserData();
});

window.debounce = debounce;
