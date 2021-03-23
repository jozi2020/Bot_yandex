// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://yandex.ru/*
// @grant        none
// ==/UserScript==

let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexInput = document.getElementsById("text");
let btn = document.getElementsByClassName('button_there_websearch')[0];
let links = document.links;

if(btn!=undefined){
    let i = 0;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    },250);
}else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            nextYandexPage = false;
            link.click(); // Кликаем по ссылке
            break; // Прерываем цикл
        }
    }
    //if(nextYandexPage) {
    document.getElementByClassName("pager__item_kind_next") [0].click();
    //pager__item_kind_next
    //next.click();
}


