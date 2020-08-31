if (window.location.href.includes('mangaowl.net')) {
  let firstTime = false

  chrome.storage.sync.get('lastChapter', function (data) {
    if (data.lastChapter === '') {
      firstTime = true
    }
  })

  const executed = setInterval(() => {
    const lastEpisode = document.querySelector('.chapter-title')
    if (lastEpisode) {
      clearInterval(executed)
      let chapter = lastEpisode.innerHTML
      // chrome.storage.sync.set({lastChapter: lastEpisode.innerHTML})

      chrome.storage.sync.get(['lastChapter', 'window'], function (data) {
        if (chapter != data.lastChapter && firstTime === true) {
          chrome.storage.sync.set({ lastChapter: chapter })
          chrome.runtime.sendMessage({
              message: 'createNotification',
              params: {
                  title: 'MangaDate',
                  message: 'Initialized, enjoy.',
                  iconUrl: 'https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png',
                  type: 'basic',
                  buttonLabel: 'Ok'
              }
          })
        } else if (chapter != data.lastChapter && firstTime === false) {
          chrome.storage.sync.set({ lastChapter: chapter })
          chrome.notifications.create('New manga has arrived', {
            type: 'basic',
            iconUrl:
              'https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png',
            title: 'New manga',
            message: 'The manga has been updated, go check it out!',
            buttons: [{ title: 'Accept' }],
          })
        }
      })
    }
    chrome.runtime.sendMessage({message: 'closeTab'})
  }, 1000)
}
