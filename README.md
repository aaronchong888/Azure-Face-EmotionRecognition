# Face API - Emotion Recognition Sample

<p align="center"><img alt="" src="https://github.com/aaronchong888/Azure-Face-EmotionRecognition/blob/master/screenshot.png" width="50%"></p>

## Description

This sample demonstrates a simple web app with server side Node.js codes for ranking uploaded photos in terms of the happiness using Face API from [Microsoft Cognitive Services][].

[Microsoft Cognitive Services]: https://azure.microsoft.com/en-us/services/cognitive-services/

## Getting Started

### Prerequisites

- Node.js
- npm (Node.js package manager)
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview) with [Shared Access Signature](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-javascript-client-libraries#create-a-shared-access-signature)

### Installation

```
npm install
```

### Usage

1. Get Face API key from [Microsoft Cognitive Services - Face API][]

2. Open `server.js` in any code editor (e.g. [VSCode](https://code.visualstudio.com/)), change `API_URL`, `API_KEY` and `SAS_SIGNATURE` to your desired API and the corresponding keys

3. Open `index.html` (under `/public` folder) in any code editor, change `STORAGE_ACCOUNT_NAME` and `BLOB_CONTAINER_NAME` to specify your desired Azure Storage Account and Blob container

4. Start your Node.js server by running `npm start`- browse to `localhost:1337` and try to upload your own photos in any modern web browsers!

[Microsoft Cognitive Services - Face API]: https://azure.microsoft.com/en-us/try/cognitive-services/?api=face-api

## Credits

* **Fine Uploader** - *JavaScript file upload library* - [fine-uploader](https://github.com/FineUploader/fine-uploader)

## Contributors

* **Aaron Chong** - *Initial work* - [aaronchong888](https://github.com/aaronchong888)