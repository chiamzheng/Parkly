# SC2006 Project - Parkly
Welcome to the our repository for NTU SC2006 Software Engineering group project **_Parkly_**

Parkly App aims to **revolutionize the way users navigate and plan their journeys** by providing comprehensive and real-time transportation information. By leveraging **OneMap API and Government API and data**, the app will offer users a seamless and efficient experience in **selecting the most appropriate location for their parking needs**. By providing a comprehensive and user-friendly platform, Parkly App empowers users to **make informed decisions** about their travel and **optimize their journeys**.

## Team Members
We are group 70 from lab group SDAB, Nanyang Technological University, Singapore. There are 6 members in our group:

| Name         | Github Account                                  | Email                 |
|--------------|-------------------------------------------------|-----------------------|         
| Chiam Zheng | [chiamzheng](https://github.com/chiamzheng) | [zchiam005@e.ntu.edu.sg](mailto:zchiam005@e.ntu.edu.sg) |
| Kent Karsten Pangestu | [dinitrophenol](https://github.com/dinitrophenol)  | [kent0008@e.ntu.edu.sg](mailto:kent0008@e.ntu.edu.sg) |
| Lee Yue Hang  | [lyh0805](https://github.com/lyh0805)   | [d230003@e.ntu.edu.sg](mailto:d230003@e.ntu.edu.sg)  |
| Nguyen Tung Lam | [Lamnu1902](https://github.com/Lamnu1902)   | [lam025@e.ntu.edu.sg](mailto:lam025@e.ntu.edu.sg)  |
| Zeng Zhuyu | [ZhuyuZeng](https://github.com/ZhuyuZeng)          | [zzeng008@e.ntu.edu.sg](mailto:zzeng008@e.ntu.edu.sg) |
| Tan Pei Wen, Jamie | [jamietannn](https://github.com/jamietannn)   | [tanp0125@e.ntu.edu.sg](mailto:tanp0125@e.ntu.edu.sg)  |

## Table of Contents
### 1.0 Demo Video
1.1 Youtube link to our [Demo Video](https://www.youtube.com/watch?v=GZ4Z2GCu7Ts) 
1.2 [Presentation Slides](https://www.canva.com/design/DAGWXt_WhOw/ZkWJLQ50WYH5vN1SkcJwpA/edit?)

### 2.0 Software Requirements Specification
2.1 [SRS]
### 3.0 Suporting Documents
[3.1 Use Case Model](https://github.com/softwarelab3/2006-SDAB-70/blob/main/lab5/Use%20Case%20Model.docx.pdf)

[3.1.1 Use Case Diagram](https://github.com/softwarelab3/2006-SDAB-70/blob/main/lab5/Use%20Case%20Diagram.jpg)

[3.2 Class Diagram + Key boundary and Control classes](https://github.com/softwarelab3/2006-SDAB-70/blob/main/lab5/Class%20Diagram%20%2B%20Key%20boundary%20and%20Control%20classes.jpg)

[3.3 Sequence Diagrams](https://github.com/softwarelab3/2006-SDAB-70/tree/main/lab5/Sequence%20Diagrams)

[3.4 Dialog Map](https://github.com/softwarelab3/2006-SDAB-70/blob/main/lab5/Dialog%20Map.png)

[3.5 System Architecture](https://github.com/softwarelab3/2006-SDAB-70/blob/main/lab5/System%20Architecture.png)

[3.6 UI MockUps](https://github.com/softwarelab3/2006-SDAB-70/tree/main/lab5/UI%20Mockups)

## Setup Instructions using Visual Studio Code 
### Using Visual Studio Code
1) Open Visual Studio Code

2) Click on File > 'Import' > 'Git' > 'Projects from Git' > 'Clone URI'

3) In the Clone URI window, paste the following URL
   > 'https://github.com/chiamzheng/Parkly.git'
   > Fun Fact: This was our actual working Git throughtout the semester for our project!

4) Follow prompts and finish cloning process

Go to the 'Parkly' directory.

### Backend
5) In your terminal, type 'cd backend'
6) To install dependencies, run:
   
```bash
npm install
```

   > npm install any other dependencies if required
8) To run our backend, run 'node APIServer/server.js'

```bash
node APIServer/server.js
```
   
   > note : API for routing requires OneMap token, which expires every 3 days

You have successfully runned our backend!

### Frontend
8) Open a new terminal, to install frontend dependencies, run:

```bash
npm install
```
   
11) Open a new terminal, to install frontend dependencies, run:

```bash
npx expo start
```
   
You have successfully runned our frontend!

Here on, you may use your mobile device to scan the QR code generated (Expo App) or you may use your favourite emulator. We have used Andriod Studios platform for our emulator in the demo.

You have successfully loaded Parkly!

Please contact any of our team members if you have issues importing and running Parkly as we have tried out best to document the instructions with reference to our own experience!
