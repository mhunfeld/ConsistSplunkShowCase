require([
    'jquery',
    'splunkjs/mvc/simplexml/ready!'
], function($) {

    //cookies
    var showCookieText = function(cookieText) {
        $('#readCookie')
            .empty()
            .text(cookieText);
    }

    $('#setCookie').on('click', function(event) {
        document.cookie = 'testCookie=testCookieWert';
        showCookieText(document.cookie);
    });

    $('#resetCookie').on('click', function(event) {
        document.cookie = "testCookie="
        showCookieText(document.cookie);
    });

    showCookieText(document.cookie);


    //local storage
    var myLocalStorage = window.localStorage;
    var showLocalStorage = function(ItemName) {
        $('#readLocalStorage')
            .empty()
            .text(myLocalStorage.getItem(ItemName));
    }

    $('#setLocalStorage').on('click', function(event) {
        myLocalStorage.setItem('testlocalEintrag', 'testWert')
        showLocalStorage('testlocalEintrag');
    });

    $('#resetLocalStorage').on('click', function(event) {
        myLocalStorage.removeItem('testlocalEintrag');
        showLocalStorage('testlocalEintrag');
    });

    showLocalStorage('testlocalEintrag');


    //session storage
    var mySessionStorage = window.sessionStorage;
    var showSessionStorage = function(ItemName) {
        $('#readSessionStorage')
            .empty()
            .text(mySessionStorage.getItem(ItemName));
    }

    $('#setSessionStorage').on('click', function(event) {
        mySessionStorage.setItem('testlocalEintrag', 'testWert')
        showSessionStorage('testlocalEintrag');
    });

    $('#resetSessionStorage').on('click', function(event) {
        mySessionStorage.removeItem('testlocalEintrag');
        showSessionStorage('testlocalEintrag');
    });

    showSessionStorage('testlocalEintrag');


});