(function () {
    function init() {
        $('.g-login').click(function () {
            removeCookie('name');
        })
    }
    init();
})();