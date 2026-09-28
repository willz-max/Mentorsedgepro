(function () {
    var menuItems = document.querySelectorAll('.navigation__item');
    var dropdownItems = [];
    var ignoreClickUntil = 0;
    var touchStart = null;

    function setOpen(item, open) {
        var trigger = item.querySelector('.navigation__link');
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function toggleMenu(item) {
        var shouldOpen = !item.classList.contains('is-open');
        dropdownItems.forEach(function (menuItem) {
            setOpen(menuItem, false);
        });
        setOpen(item, shouldOpen);
    }

    Array.prototype.forEach.call(menuItems, function (item) {
        var dropdown = item.querySelector('.navDropdown-hover');
        var trigger = item.querySelector('.navigation__link');

        if (!dropdown || !trigger) {
            return;
        }

        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        dropdownItems.push(item);

        trigger.addEventListener('click', function () {
            if (Date.now() >= ignoreClickUntil) {
                toggleMenu(item);
            } else {
                ignoreClickUntil = 0;
            }
        });

        trigger.addEventListener('touchstart', function (event) {
            var touch = event.changedTouches[0];
            touchStart = { x: touch.clientX, y: touch.clientY };
        });

        trigger.addEventListener('touchend', function (event) {
            var touch = event.changedTouches[0];
            if (!touchStart || Math.abs(touch.clientX - touchStart.x) > 12 || Math.abs(touch.clientY - touchStart.y) > 12) {
                touchStart = null;
                return;
            }

            if (event.cancelable) {
                event.preventDefault();
            }
            ignoreClickUntil = Date.now() + 800;
            touchStart = null;
            toggleMenu(item);
        });

        trigger.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ' || event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                trigger.click();
            } else if (event.key === 'Escape' || event.keyCode === 27) {
                setOpen(item, false);
            }
        });
    });

    document.addEventListener('click', function (event) {
        var clickedMenu = dropdownItems.some(function (item) {
            return item.contains(event.target);
        });

        if (!clickedMenu) {
            dropdownItems.forEach(function (item) {
                setOpen(item, false);
            });
        }
    });
}());