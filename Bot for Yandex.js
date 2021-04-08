// ==UserScript==
// @name         Yandex Bot 2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://crushdrummers.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать шоу барабанщиков","Барабанное шоу в Москве"]
}
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)];
let keywords = sites[site];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yaInput = document.getElementById('text');
let search = document.getElementsByClassName("button_theme_websearch")[0];
let links = document.links;
if(search!=undefined){ // Главная страница поисковика
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            search.click();
        }
    },300);
}else if(location.hostname == "yandex.ru"){ // Страница выдачи поисковых результатов
    site = getCookie("site");
    let nextYaPage = true;
    let currentYaPage = document.getElementsByClassName("pager__item_current_yes")[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site)!=-1){
            nextYaPage = false;
            link.removeAttribute("target");
            link.click(); // Кликаем по ссылке
            break; // Прерываем цикл
        }
    }
    if(nextYaPage && currentYaPage<11) setTimeout(()=>{document.getElementsByClassName("pager__item_kind_next")[0].click()},1500);
    else if(currentYaPage == 11) location.href = "yandex.ru";
}else{ // Мы находимся на найденом сайте
    setInterval(()=>{
        if(Math.random()>=0.8) location.href = "yandex.ru";
        let link = links[Math.floor(Math.random()*links.length)];
        if(link.href.indexOf(location.hostname)!=-1){
           link.click();}
        },3000);
}
