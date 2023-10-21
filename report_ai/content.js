/* global chrome */

let theText = ''
const toSelect = ['p', 'h1', 'h2', 'h3', 'h5', 'h6', 'li'] // tags to extract texts from

// extracting the data
toSelect.forEach((t) => {
  const selected = document.querySelectorAll(t)
  selected.forEach((s) => {
    theText += s.innerText
  })
})

// creating a frequency map for the extracted words
function wordFreq (string) {
  const words = string.replace(/[.]/g, '').split(/\s/)
  const freqMap = {}
  words.forEach(function (w) {
    if (!freqMap[w]) {
      freqMap[w] = 0
    }
    freqMap[w] += 1
  })

  return freqMap
}

// sorting the frequency to get the most frequent words
const freqMap = wordFreq(theText)
const sortedMap = []
for (const word in freqMap) {
  sortedMap.push([word, freqMap[word]])
}
sortedMap.sort(function (a, b) {
  return b[1] - a[1]
})

const commonWords = [
  'i',
  '-',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  "you're",
  "you've",
  "you'll",
  "you'd",
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  "she's",
  'her',
  'hers',
  'herself',
  'it',
  "it's",
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  "that'll",
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'a',
  'an',
  'the',
  'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  's',
  't',
  'can',
  'will',
  'just',
  'don',
  "don't",
  'should',
  "should've",
  'now',
  'd',
  'll',
  'm',
  'o',
  're',
  've',
  'y',
  'ain',
  'aren',
  "aren't",
  'couldn',
  "couldn't",
  'didn',
  "didn't",
  'doesn',
  "doesn't",
  'hadn',
  "hadn't",
  'hasn',
  "hasn't",
  'haven',
  "haven't",
  'isn',
  "isn't",
  'ma',
  'mightn',
  "mightn't",
  'mustn',
  "mustn't",
  'needn',
  "needn't",
  'shan',
  "shan't",
  'shouldn',
  "shouldn't",
  'wasn',
  "wasn't",
  'weren',
  "weren't",
  'won',
  "won't",
  'wouldn',
  "wouldn't",
  'always',
  'already',
  'would',
  'without'
]

const mostCommon = []

// removing the common words from the sorted freq list
sortedMap.forEach((t) => {
  if (!commonWords.includes(t[0].toLowerCase()) && t[0].length > 4) {
    mostCommon.push(t[0])
  }
})

// storing the top 10 frequent words in freqWord
const freqWord = []
for (let i = 0; i < Math.min(mostCommon.length, 10); i++) {
  freqWord.push(mostCommon[i])
}

console.log(freqWord)

// fetching the summary of the content through the API
const pageMeta = {
  freqWord,
  text: theText
}

// saving the data in local storage
chrome.storage.local.set({ key: pageMeta })
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension')
    request.to === 'content_script' && sendResponse({ pageMeta })
  }
)
