(function () {
    var keywords = document.querySelector('[data-role="keywords"]');
    var words = keywords ? keywords.querySelectorAll('span') : [];
    var currentIndex = 0;

    if (words.length < 2) {
        return;
    }

    Array.prototype.forEach.call(words, function (word, index) {
        if (word.getAttribute('data-show') === 'show') {
            currentIndex = index;
        }
    });

    window.setInterval(function () {
        var previousIndex = currentIndex;
        currentIndex = (currentIndex + 1) % words.length;

        Array.prototype.forEach.call(words, function (word) {
            word.setAttribute('data-show', 'false');
        });

        words[previousIndex].setAttribute('data-show', 'prev');
        words[currentIndex].setAttribute('data-show', 'show');
        words[(currentIndex + 1) % words.length].setAttribute('data-show', 'next');
    }, 2400);
}());