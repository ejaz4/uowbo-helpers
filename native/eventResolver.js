// ==UserScript==
// @name         NativeEventResolverScript
// @namespace    http://tampermonkey.net/
// @version      2025-12-14
// @description  try to take over the world!
// @author       You
// @match        https://uwsu.native.fm/?allEvents=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=native.fm
// @grant        none
// ==/UserScript==

const eventListContainer = document.getElementById("all-events-list-container");
const config = { attributes: true, childList: true, subtree: true };

const upstream = (message) => {
  window.ReactNativeWebView.postMessage(message);
}

const getEvents = () => {
    const target = eventListContainer.children[0]
    const [heading, ...events] = target.children;

    let eventsList = [];

    for (const event of events) {
        const date = event.children[0].children[0].innerText;

        const infoCard = event.children[1].getElementsByClassName("MuiCardContent-root")[0];
        const imageSrc = event.children[1].children[0].children[0].style.backgroundImage.split('"')[1];

        const name = infoCard.children[0].children[0].innerText;
        const location = infoCard.children[0].children[1].innerText;
        const time = infoCard.children[0].children[2].innerText;

        const priceMin = infoCard.children[1].children[0].children[0].children[1].innerText;
    }

    upstream(JSON.stringify({
        status: 200,
        data: "ready",
        respondingTo: "log",
    }))
}

const openEvent = (position) => {
    const target = eventListContainer.children[0];
    const [heading, ...events] = target.children;

    const infoCard = events[position].children[1].getElementsByClassName("MuiCardContent-root")[0];
    const priceMin = infoCard.children[1].children[0].children[1].children[0].children[0].click();
    console.log(priceMin);
}

// Mutation observer can monitor for changes
const mutationObserver = new MutationObserver(getEvents);
mutationObserver.observe(eventListContainer, config);
