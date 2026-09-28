(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const aosTargets = document.querySelectorAll('[data-aos]');
    const sectionTargets = new Set();
    const main = document.querySelector('main');

    if (main) {
        Array.from(main.children).forEach((block) => {
            const nestedSections = block.tagName === 'SECTION'
                ? [block]
                : Array.from(block.querySelectorAll('section')).filter(
                    (section) => !section.parentElement.closest('section')
                );
            const candidates = nestedSections.length ? nestedSections : [block];

            candidates.forEach((element) => {
                const hasContent = element.textContent.trim() || element.querySelector('img, video, svg, canvas, iframe');
                if (element.tagName !== 'FOOTER' && element.getBoundingClientRect().height > 120 && hasContent) {
                    sectionTargets.add(element);
                }
            });
        });
    }

    const authTargets = document.querySelectorAll(
        '.onboarding-wrapper__image-container, .onboarding-wrapper__content-container'
    );

    if (reducedMotion || !('IntersectionObserver' in window)) {
        aosTargets.forEach((element) => element.classList.add('aos-animate'));
        return;
    }

    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .scroll-section-reveal, .scroll-auth-reveal {
            opacity: 0 !important;
            transform: translate3d(0, 32px, 0) !important;
            transition: opacity 650ms ease, transform 650ms cubic-bezier(.2, .7, .2, 1);
        }
        .scroll-section-reveal.is-visible, .scroll-auth-reveal.is-visible {
            opacity: 1 !important;
            transform: translate3d(0, 0, 0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
            .scroll-section-reveal, .scroll-auth-reveal {
                opacity: 1 !important;
                transform: none !important;
                transition: none;
            }
        }
    `;
    document.head.append(revealStyles);

    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    aosTargets.forEach((element) => {
        element.classList.remove('aos-animate');
        element.classList.add('aos-init');
        revealObserver.observe(element);
    });

    sectionTargets.forEach((element) => {
        element.classList.add('scroll-section-reveal');
        revealObserver.observe(element);
    });

    authTargets.forEach((element) => {
        element.classList.add('scroll-auth-reveal');
        revealObserver.observe(element);
    });
})();