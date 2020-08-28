var wrap = document.getElementById("newChapter");
var chapter = document.createElement("h1")

chrome.storage.sync.get("lastChapter", function(data){
    let name= document.createTextNode(data.lastChapter);
    chapter.appendChild(name);
    wrap.appendChild(chapter);
})