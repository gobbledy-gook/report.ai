# **report.ai**

# A chrome extension to rate, review and summarize websites.

![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-informational)
[![Python](https://img.shields.io/badge/Python-%203.8%20%7C%203.9%20%7C%203.10-informational)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/gobbledy-gook/report.ai/blob/main/LICENSE)
[![Code style: Black](https://img.shields.io/badge/Code%20style-Black-000.svg)](https://github.com/psf/black)

---
## Quickstart
1. Download the `report_ai.zip` file from the release and extract its contents.
2. Open your web browser and go to `chrome://extensions/`.
3. Click on `Load unpacked` and select the extracted folder from Step 1.

Having troubles? Read the [installation guide](./INSTALLATION.md)

## **Dev Installation**

1. Clone the repository on your local machine using -

```bash
git clone https://github.com/gobbledy-gook/report.ai.git
```

2. Once cloned,To start the local server run

```bash
python3 server.py
```

3. In Google Chrome, go to `chrome://extensions`. Click on `Load Unpacked`, and select the `report_ai` folder from the clone.

4. Now have fun trying out the **report.ai** extension.

---

## **Features**

1. **Crowd Sourced Rating Mechanism:** Useful in detecting less reliable websites.

2. **Quick Glance:** Word cloud of most frequently occuring words will be generated. It will help user to know if the information on the webpage is relevant before going through the entire webpage.

3. **Summarizer:** Bart large CNN powered summary generation.

4. **Context Query:** User will be able to ask information related to content on the webpage and it will be answered by roberta.

5. **Public Leaderboard:** A public leaderboard is maintained, data on the leaderboard in crowdsourced. Everyone will able to access top rated websites.

---
### Release 0.0.3 Glimpse

<div>
  <img align = "right" src = "https://github.com/gobbledy-gook/report.ai/assets/96362727/de29b848-00d5-49f2-93e4-7f82290b506a.png" width = "30%">
<span>This design was implemented for DotSlash 6.0. We are looking forward to make it robust and refine it further.</span>
</div>



---

## **Techstack**

- **Extension:** HTML, CSS, JS
- **Backend:** Flask
- **Database:** MongoDB
- **LeaderBoard Frontend:** ReactJS

---

### How to Give Feedback

We encourage your feedback! You can share your thoughts with us by:

- [Opening an issue](./issues) in the repository

---

### Contribution Guidelines

For information on how to contribute to this project, please take a look at our [contribution guidelines](./CONTRIBUTING.md).

> Made by Team **Paper Hat** for DotSlash 6.0
