let id = 0;

const createNotification = ({iconUrl, title, message, buttonLabel, type}) => {
  chrome.notifications.create('Initialized', {
    type,
    iconUrl,
    title,
    message,
    buttons: [{ title: buttonLabel }],
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.message) {
      case 'createNotification':
        createNotification(request.params)
        break;
      case 'closeTab':
        chrome.tabs.remove(sender.tab.id)
        break;
      default:
        console.error('Request not handled', request)
    }
})

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

