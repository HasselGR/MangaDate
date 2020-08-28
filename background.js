let id = 0;


chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({lastChapter:""})
})


let checker= chrome.alarms.create("Hourly checker", {
    when: Date.now()+600,
    periodInMinutes:60    
})

chrome.tabs.onCreated.addListener(function(tab){
    chrome.storage.sync.set({window:tab.id})
    id = tab.id;
    return id;
})

chrome.alarms.onAlarm.addListener(function(){
    chrome.tabs.create({
        index:0,
        url: 'https://mangaowl.net/single/150/boku-no-hero-academia',
        active:false,
    },
    function(){
        chrome.tabs.executeScript(id, {
            file:'check.js'
        })
    })
});

