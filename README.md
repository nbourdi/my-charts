# NTUA ECE SaaS 2023 Project - MyCharts
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
## SaaS23-13
 
MyCharts is a microservice-based application that allows users to upload their CSV files and transform them into sleek, modular charts. It offers a selection of six chart types based on Python's Matplotlib library. The application is fully dockerized and utilizes state-of-the-art technologies to achieve optimization and ensure scalability, reliability and real-time processing of user data. Users can connect with their Google Account to start their free trial with 9 credits and then buy more credits at opportune prices in our store. Charts created can be stored in our database or downloaded into the user's personal computer in whichever file-type they want. The user interface (web app) is built using React for a seamless and intuitive experience.

### Features
Users can upload their CSV files to have them turned into charts. MyCharts offers the following features:

**Sign-in using Google Account**: Users can make use of the MyCharts application with their Google Account.

**Multiple Chart Types**: Users can choose from six different chart types to visualize their data.

**Credit System**: The application utilizes a credit-based system to manage user access and chart generation.

**Save Charts**: Charts can be stored to view again and download by the user.

### Installation & Run
To set up the application, the Docker platform has to be installed on your machine. Assuming you meet this prerequisite, you can navigate to the main directory and build the microservice containers by executing: 
```
docker-compose build
```

To start the application after that, simply run:
```
docker-compose up
```
### Usage
Once the application is up and running, you can follow these steps to use MyCharts:

- Sign up using your Google Account or log-in if you're already a user.
- Navigate the home-page and choose the type of chart you would like created.
- Click on the "Upload" button and select your CSV file or drag and drop it to the appropriate box.
- Customize the chart settings.
- Your chart will be automatically generated and displayed. If you wish to save the chart to our database, you can click the "Save Chart" button.

### Members:

- Athina Mavrommati (el19120)
- Giorgos Mystriotis (el19065)
- Natalia Bourdi (el19031)
- Nikolaos Stamatopoulos (el19020)

###
###

![image](https://github.com/ntua/SaaS23-13/assets/115226054/655f8e37-67e9-4a06-a9c2-d7f5326b8149)

