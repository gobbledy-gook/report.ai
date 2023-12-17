/* global chrome, fetch */
let rating

function logger (result) {
  // return the rating of the site from the database
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url
    let currUrl = localStorage.getItem("report_ai_id");
    if(currUrl == currentUrl){
      document.querySelector("#review-system").innerHTML = 'Already rated';
    }
    console.log('Current URL: ' + currentUrl)
    getRating(currentUrl)
  })

  const btn0 = document.querySelector('#save_rating')
  const btn1 = document.querySelector('#generate_words')
  const btn2 = document.querySelector('#summary')
  const btn3 = document.querySelector('#askbtn')
  const btn4 = document.querySelector('#refreshBtn')

  btn0.onclick = () => {
    const review = document.getElementById('review').value
    const b1 = document.getElementsByClassName('radiobutton')
    for (let i = 0; i < 5; i++) {
      if (b1[i].checked) {
        console.log(5 - i)
        rating = 5 - i
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const currentUrl = tabs[0].url
            console.log('Current URL: ' + currentUrl)
            saveEntry(rating, currentUrl)
          }
        )
      }
    }
    btn0.style.backgroundColor = 'white'
    btn0.style.color = '#111'

    console.log('Review:', review)
  }

  btn1.onclick = () => {
    if (result?.key?.freqWord) {
      for (let i = 0; i < 10; i++) {
        const s = document.createElement('span')
        s.innerHTML = result.key.freqWord[i]
        s.style.backgroundColor = 'rgba(255, 255, 255, 0.212)'
        s.style.border = '1px solid rgba(255, 255, 255, 0.4)'
        s.style.borderRadius = '3px'
        s.style.padding = '3px'
        s.style.margin = '4px'
        s.style.display = 'inline'
        s.style.float = 'left'
        const parent = document.getElementsByClassName('worldcloudpara')
        parent[0].appendChild(s)
        if (i === 9) {
          btn1.style.display = 'none'
        }
      }
    } else {
      console.error('Error while fetching from local storage')
    }
  }

  btn2.onclick = async () => {
    btn2.style.display = 'none'
    const Parent = document.getElementById('SummaryParent')
    const gifParent = document.getElementById('loaderSummary')
    gifParent.style.display = 'flex'
    const gif = document.createElement('img')
    gif.src = 'assets/rotate-right.png'
    gif.style.animation = 'spin 1.5s linear infinite'
    gif.style.width = '6%'
    gifParent.appendChild(gif)
    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        },
        // sending text to summarize
        body: JSON.stringify(result.key.text)
      })
      const json = await response.json()
      const divSum = document.getElementById('summarizerDiv')
      const summary = json.summary
      divSum.innerHTML = summary
      Parent.removeChild(gifParent)
      divSum.style.display = 'block'
    } catch (error) {
      console.error('Error fetching summary:', error)
    }
  }

  btn3.onclick = async () => {
    try {
      const question = {
        question: document.getElementById('ask').value,
        context: result.key.text
      }
      btn3.disabled = true
      const Parent = document.getElementById('qnaParent')
      const gifParent = document.getElementById('loaderQNA')
      gifParent.style.display = 'flex'
      const gif = document.createElement('img')
      gif.src = 'assets/rotate-right.png'
      gif.style.animation = 'spin 1.5s linear infinite'
      gif.style.width = '6%'
      gifParent.appendChild(gif)
      const response = await fetch('http://127.0.0.1:5000/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        },
        // sending the question to the server
        body: JSON.stringify(question)
      })

      const json = await response.json()
      const answer = json.answer.answer

      console.log('Answer:', answer)
      // Update the UI with the received answer
      const answerDiv = document.getElementById('Answer')
      answerDiv.style.display = 'block'
      Parent.removeChild(gifParent)
      btn3.disabled = false
      answerDiv.innerHTML = answer
    } catch (error) {
      console.error('Error fetching answer:', error)
    }
  }

  btn4.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id)
      location.reload()
    })
  }
}

function getRating (url) {
  // get rating through the API
  const data = { url }
  fetch('http://127.0.0.1:5000/get_rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log('Response JSON:', json.rating)
      const rating = json.rating
      const freq = "(" + json.freq + " reviews)"
      
      console.log(rating.toFixed(2))
      document.getElementById('overallRating').innerHTML = rating.toFixed(2)
      document.getElementById('numReviews').innerHTML = freq;
    })
    .catch((error) => {
      console.log('Error while fetching the rating:', error)
    })
}

function saveEntry (rating, url) {
  const data = { rating, url}
  console.log(data)
  localStorage.setItem("report_ai_id",url);
  fetch('http://127.0.0.1:5000/save_entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json() // return the Promise from res.json()
    })
    .then((json) => {
      console.log('Response JSON:', json)
    })
    .catch((error) => {
      console.log('Error while saving the entry:', error)
    })
}

(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  console.log(tab);
  const response = await chrome.tabs.sendMessage(tab.id, {
    to: 'content_script',
  })
  console.log(response)
  logger({ key: response.pageMeta})
})();


function checkConnectionSignal () {
  const element = document.getElementById('connectionSignal')
  const text = element.querySelector('.text')
  const icon = element.querySelector('.icon')

  // Show loading state
  icon.style.backgroundColor = 'rgb(238, 210, 2)'
  text.innerHTML = 'waiting for connection...'

  // check if the server is running
  fetch('http://127.0.0.1:5000/healthcheck')
    .then((response) => {
      if (response.status === 200) {
        // Update UI for successful connection
        icon.style.backgroundColor = 'rgb(45, 246, 31)'
        text.innerHTML = 'connected to server'
      } else {
        // Update UI for server error
        icon.style.backgroundColor = 'rgb(209, 0, 31)'
        text.innerHTML = 'server unavailable'
      }
    })
    .catch((error) => {
      // Update UI for fetch error
      console.log("couldn't connect to server", error)
      icon.style.backgroundColor = 'rgb(209, 0, 31)'
      text.innerHTML = 'server unavailable'
    })
}

checkConnectionSignal()
setInterval(checkConnectionSignal, 5000)
