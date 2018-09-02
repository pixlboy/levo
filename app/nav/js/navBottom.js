(function(utils) {


    function init() {
        var el = document.querySelector(".navBottom");
        el.setAttribute("data-uid", utils.getUID()); // adds a unique id (uid) to the component

        let mainTitleEl = document.querySelector(".navBottom-mainTitle");
        setTodayTitle(mainTitleEl);

        let subTitleEl = document.querySelector(".navBottom-subTitle");
        let lcWords = ["has", "offices", "in", "and"];
        let ucWords = ["NSW", "VIC.", "LEVO"];
        setSubTitle(subTitleEl, lcWords, ucWords);

        document.addEventListener("click", event => {
            if ( event.target.className.includes("btn")) vibrateOnTap();
        });
    }

    // Will be fired on tap of navigation button
    const vibrateOnTap = function(){
        //Check vibration support
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate) {
            // vibrate for 500 milli seconds
            navigator.vibrate(500);
        }
    };


    // Changes the upper case characters of '.topNav-subTitle' to pascal case
    function setSubTitle(el, lcWords, ucWords) {
        el.textContent = utils.toPascalCase(el.textContent, lcWords, ucWords);
    }


    // Replaces '--WEEK_DAY_NAME--' and '--MONTH_NAME--' with dynamic contents in element '.topNav-title'
    function setTodayTitle(el) {
        el.textContent = utils.replaceBetween('--WEEK_DAY_NAME', '--', el.textContent, utils.getWeekDay());
        el.textContent = utils.replaceBetween('--MONTH_NAME', '--', el.textContent, utils.getMonthName());
    }

    init();

})(window.utils);
