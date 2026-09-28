(function () {
    var menuItems = document.querySelectorAll('.navigation__item');
    var dropdownItems = [];

    function setOpen(item, open) {
        var trigger = item.querySelector('.navigation__link');
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
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
            var shouldOpen = !item.classList.contains('is-open');
            dropdownItems.forEach(function (menuItem) {
                setOpen(menuItem, false);
            });
            setOpen(item, shouldOpen);
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