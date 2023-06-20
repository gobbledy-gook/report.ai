# **report.ai**

# A chrome extension to rate, review and summarize websites.

![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-informational)
[![Python](https://img.shields.io/badge/Python-%203.8%20%7C%203.9%20%7C%203.10-informational)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/gobbledy-gook/report.ai/blob/main/LICENSE)
[![Code style: Black](https://img.shields.io/badge/Code%20style-Black-000.svg)](https://github.com/psf/black)

## **Installation**

1. Clone the repository on your local machine using -

```bash
git clone https://github.com/gobbledy-gook/report.ai.git
```

2. Once cloned, run

```python
python server.py
```

To start the local server

3. In Google Chrome, go to `chrome://extensions`. Click on `Load Unpacked`, and select the cloned repository from your computer.

4. Now have fun trying out the **report.ai** extension.

---

## **Techstack**

- **Extension:** HTML, CSS, JS
- **Backend:** Flask
- **Database:** MongoDB
- **LeaderBoard Frontend:** ReactJS

---

## **Features**

1. **Crowd Sourced Rating Mechanism:** Useful in detecting less reliable websites.

2. **Quick Glance:** Word cloud of most frequently occuring words will be generated. It will help user to know if the information on the webpage is relevant before going through the entire webpage.

3. **Summarizer:** GPT3 powered summary generation.

4. **Context Query:** User will be able to ask information related to content on the webpage and it will be answered by GPT3.

5. **Public Leaderboard:** A public leaderboard is maintained, data on the leaderboard in crowdsourced. Everyone will able to access top rated websites.

---

### How to Give Feedback

We encourage your feedback! You can share your thoughts with us by:

- [Opening an issue](https://github.com/IceKhan13/purplecaffeine/issues) in the repository

---

### Contribution Guidelines

For information on how to contribute to this project, please take a look at our [contribution guidelines](https://github.com/IceKhan13/purplecaffeine/blob/main/CONTRIBUTING.md).

> Made by Team **Paper Hat** for DotSlash 6.0
