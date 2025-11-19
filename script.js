// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Performance optimization: Debounce function (moved to top)
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll performance
function throttle(func, wait = 100) {
    let timeout = null;
    let previous = 0;
    
    return function() {
        const now = Date.now();
        const context = this;
        const args = arguments;
        
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    };
}

// Active Navigation removed - nav links now only highlight on hover

// Photography Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.remove('hidden');
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            }
        });
    });
});

// Recommendations Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Newsletter Form (removed from site, keeping code commented for reference)
// const newsletterForm = document.querySelector('.newsletter-form');
// if (newsletterForm) {
//     newsletterForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const email = newsletterForm.querySelector('input[type="email"]').value;
//         alert(`Thank you for subscribing with: ${email}`);
//         newsletterForm.reset();
//     });
// }

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Use scrollIntoView with scroll-margin-top from CSS
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards (but not gallery-item to avoid interference with lightbox)
document.querySelectorAll('.writing-card, .recommendation-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Separate observer for gallery items to ensure they remain clickable
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Parallax effect for hero section (disabled to prevent overlap issues)
// Keeping code commented for future reference
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        // Only apply parallax while hero is in view
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
*/

// Image lazy loading fallback
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Consolidated scroll event handler with throttling
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar shadow removed - keeping scroll handler for potential future use
    
    lastScroll = currentScroll;
    ticking = false;
};

// Use requestAnimationFrame for optimal scroll performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// Gallery Lightbox Functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryWrappers = document.querySelectorAll('.gallery-image-wrapper');

    if (!lightbox || !lightboxImage || !lightboxCaption || galleryWrappers.length === 0) {
        console.error('Lightbox elements not found');
        return;
    }

    let currentImageIndex = 0;
    let visibleImages = [];

    // Function to update visible images based on current filter
    function updateVisibleImages() {
        visibleImages = Array.from(galleryWrappers).filter(wrapper => {
            const item = wrapper.closest('.gallery-item');
            return item && item.style.display !== 'none' && !item.classList.contains('hidden');
        });
    }

    // Open lightbox
    function openLightbox(index) {
        updateVisibleImages();
        currentImageIndex = index;
        const wrapper = visibleImages[currentImageIndex];
        const img = wrapper.querySelector('img');
        const title = wrapper.getAttribute('data-title');
        const caption = wrapper.getAttribute('data-caption');
        
        lightboxImage.src = img.src.replace('w=800', 'w=1600'); // Load higher resolution
        lightboxImage.alt = img.alt;
        lightboxCaption.querySelector('h3').textContent = title;
        lightboxCaption.querySelector('p').textContent = caption;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigate to previous image
    function previousImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        openLightbox(currentImageIndex);
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        openLightbox(currentImageIndex);
    }

    // Add click event to all gallery images
    galleryWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Gallery image clicked'); // Debug log
            updateVisibleImages();
            const visibleIndex = visibleImages.indexOf(wrapper);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            previousImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    console.log('Lightbox initialized with', galleryWrappers.length, 'images');
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLightbox);
} else {
    initializeLightbox();
}

// Recommendation Detail Page Gallery
function initializeDetailGallery() {
    const galleryItems = document.querySelectorAll('.rec-detail-gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (galleryItems.length > 0 && lightbox) {
        // Create lightbox if it doesn't exist
        if (!lightbox) {
            const lightboxHTML = `
                <div id="lightbox" class="lightbox">
                    <button id="lightboxClose" class="lightbox-close">&times;</button>
                    <button id="lightboxPrev" class="lightbox-nav lightbox-prev">&#8249;</button>
                    <button id="lightboxNext" class="lightbox-nav lightbox-next">&#8250;</button>
                    <div class="lightbox-content">
                        <img id="lightboxImage" src="" alt="">
                        <div id="lightboxCaption" class="lightbox-caption">
                            <h3></h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => item.querySelector('img'));
        
        function openDetailLightbox(index) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightboxImage');
            const lightboxCaption = document.getElementById('lightboxCaption');
            
            currentIndex = index;
            const img = images[currentIndex];
            
            lightboxImage.src = img.src.replace('w=600', 'w=1600'); // Load higher resolution
            lightboxImage.alt = img.alt;
            lightboxCaption.style.display = 'none'; // Hide caption for detail gallery
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeDetailLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function navigateDetailLightbox(direction) {
            currentIndex = (currentIndex + direction + images.length) % images.length;
            openDetailLightbox(currentIndex);
        }
        
        // Add click events to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openDetailLightbox(index));
        });
        
        // Lightbox controls
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxElement = document.getElementById('lightbox');
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeDetailLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateDetailLightbox(-1);
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateDetailLightbox(1);
            });
        }
        
        if (lightboxElement) {
            lightboxElement.addEventListener('click', (e) => {
                if (e.target === lightboxElement) {
                    closeDetailLightbox();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox || !lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeDetailLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateDetailLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateDetailLightbox(1);
            }
        });
    }
}

// Initialize detail gallery if on detail page
if (document.querySelector('.rec-detail-gallery')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDetailGallery);
    } else {
        initializeDetailGallery();
    }
}

// Smooth scroll for recommendation cards on detail pages
const relatedCards = document.querySelectorAll('.rec-detail-related .recommendation-card');
relatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Modern Recommendation Detail Page Lightbox
function initializeModernDetailLightbox() {
    const clickableImages = document.querySelectorAll('.rd-image-clickable');
    const lightbox = document.getElementById('rdLightbox');
    const lightboxImage = document.getElementById('rdLightboxImage');
    const lightboxClose = document.querySelector('.rd-lightbox-close');
    const lightboxPrev = document.querySelector('.rd-lightbox-prev');
    const lightboxNext = document.querySelector('.rd-lightbox-next');
    const showAllButton = document.querySelector('.rd-show-all');
    
    if (!clickableImages.length || !lightbox) return;
    
    let currentIndex = 0;
    const images = Array.from(clickableImages);
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = images[currentIndex].src.replace('w=600', 'w=1600').replace('w=1200', 'w=1600');
        lightboxImage.alt = images[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src.replace('w=600', 'w=1600').replace('w=1200', 'w=1600');
        lightboxImage.alt = images[currentIndex].alt;
    }
    
    // Click events for images
    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
        img.style.cursor = 'pointer';
    });
    
    // Show all button
    if (showAllButton) {
        showAllButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(0);
        });
    }
    
    // Lightbox controls
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext?.addEventListener('click', () => navigateLightbox(1));
    
    // Close on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
}

// Initialize modern detail lightbox if on modern detail page
if (document.querySelector('.recommendation-detail-page')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeModernDetailLightbox);
    } else {
        initializeModernDetailLightbox();
    }
}

// Smooth scroll for similar cards
const similarCards = document.querySelectorAll('.rd-similar-card');
similarCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Hotels Page Filter
function initializeHotelsFilter() {
    const filterButtons = document.querySelectorAll('.hotel-filter-btn');
    const cards = document.querySelectorAll('.hotel-card');
    
    if (!filterButtons.length || !cards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            const filter = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const location = card.getAttribute('data-location');
                    if (location === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Minimal Recommendations Page Filter
function initializeRecommendationsFilter() {
    const filterButtons = document.querySelectorAll('.rec-nav-btn');
    const cards = document.querySelectorAll('.rec-minimal-card');
    
    if (!filterButtons.length || !cards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            const filter = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Initialize masonry filter
function initializeMasonryFilter() {
    const filterButtons = document.querySelectorAll('.masonry-filter-btn');
    const cards = document.querySelectorAll('.masonry-card, .thoughts-article-card');
    
    if (!filterButtons.length || !cards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            const filter = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                } else {
                    // Check both data-location (for hotels) and data-category (for thoughts)
                    const location = card.getAttribute('data-location');
                    const category = card.getAttribute('data-category');
                    const cardFilter = location || category;
                    
                    if (cardFilter === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Initialize hotels filter if on hotels page
if (document.querySelector('.recommendations-hotels-page')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHotelsFilter);
    } else {
        initializeHotelsFilter();
    }
}

// Initialize masonry filter if on masonry page (recommendations or thoughts)
if (document.querySelector('.recommendations-masonry-page') || document.querySelector('.thoughts-masonry-page')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMasonryFilter);
    } else {
        initializeMasonryFilter();
    }
}

// Initialize recommendations filter if on recommendations page
if (document.querySelector('.recommendations-minimal-page')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRecommendationsFilter);
    } else {
        initializeRecommendationsFilter();
    }
}

// Header scroll effect for all pages
function initializeHeaderScroll() {
    const header = document.querySelector('.masonry-header');
    if (!header) return;
    
    let isScrolled = false;
    
    const checkScroll = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > 50) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
            }
        }
    };
    
    // Check on scroll - using RAF instead of throttle for better performance
    let rafId = null;
    window.addEventListener('scroll', () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            checkScroll();
            rafId = null;
        });
    }, { passive: true });
    
    // Check initial state
    checkScroll();
}

// Initialize header scroll effect on all pages with masonry-header
if (document.querySelector('.masonry-header')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHeaderScroll);
    } else {
        initializeHeaderScroll();
    }
}

console.log('Portfolio & Travel Guide website loaded successfully!');

