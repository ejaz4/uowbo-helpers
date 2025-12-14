// ==UserScript==
// @name         NativeEventGrabberScript
// @namespace    http://uowbo.ceccun.com/
// @version      2025-12-14
// @description  Helper to grab events from Native
// @author       ejaz4
// @match        https://uwsu.native.fm/?allEvents=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=native.fm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const upstream = (message) => {
      window.ReactNativeWebView.postMessage(message);
    }
    
    console.log("Helper Triggered")
    upstream(JSON.stringify({
            status: 200,
            data: "triggered",
            respondingTo: "log",
    }))
    const eventListContainer = document.getElementById("all-events-list-container");
    const config = { attributes: true, childList: true, subtree: true };

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

            eventsList.push({
                name,
                location,
                time,
                date,
                priceMin,
                imageSrc
            })
        }


        upstream(JSON.stringify({
            status: 200,
            data: eventsList,
            respondingTo: "default",
        }))
    }

    // Mutation observer can monitor for changes
    const mutationObserver = new MutationObserver(getEvents);
    mutationObserver.observe(eventListContainer, config);

    // Your code here...
})();
