let firstTime= false;


chrome.storage.sync.get("lastChapter", function(data){
    if (data.lastChapter === ""){
        firstTime = true;
    }
})
let lastEpisode = document.querySelector(".chapter-title");
let chapter = lastEpisode.innerHTML;
// chrome.storage.sync.set({lastChapter: lastEpisode.innerHTML})


chrome.storage.sync.get(["lastChapter", "window"], function(data){
    if ((chapter != data.lastChapter) && firstTime === true){
        chrome.storage.sync.set({lastChapter: chapter})
        chrome.notifications.create("Initialized", {
            type: "basic",
            iconUrl:"https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png",
            title: "MangaDate",
            message:"The extension is fully initialized, hope you enjoy!",
            buttons:[{title:"Accept"}]
        })
    }else if ((chapter!= data.lastChapter) && firstTime === false){
        chrome.storage.sync.set({lastChapter: chapter})
        chrome.notifications.create("New manga has arrived", {
            type: "basic",
            iconUrl:"https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png",
            title: "New manga",
            message:"The manga has been updated, go check it out!",
            buttons:[{title:"Accept"}]
        })
    }
})


