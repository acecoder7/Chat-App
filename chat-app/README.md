
# My Chat App

The Chat App is a web application that allows users to engage in real-time conversations with other users. It provides a simple and intuitive interface for sending and receiving messages.


## Features

The application should have the following features:

- User authentication: Users can sign up and log in to the app using their email and password.
- User authentication via Google: Sing Up and SingIn with Google provider
- Real-time messaging: Users can send and receive messages in real time with other users.
- User search: Users can search for other users and initiate conversations with them.
- Conversation history: Users can view their past conversations and continue where they left off.
- Chat Rooms: Users should be able to create and join chat rooms.
- Share texts and images in chat.


## Technologies Used

The Chat App is built using the following technologies:

- React: JavaScript library for building the user interface.
- Firebase: Backend-as-a-Service platform for user authentication and real-time data synchronization.
- Firestore: Firebase's cloud-hosted NoSQL database for storing chat messages and user information.
- SCSS: CSS preprocessor for styling the application.


## Getting Started

To run the Chat App locally on your machine, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/chat-app.git

2. Install the dependencies:
   
   cd chat-app
   npm install

3. Configure Firebase:

- Create a new Firebase project at https://console.firebase.google.com.
- Enable Firestore and Authentication services in the Firebase project.
- Copy the Firebase configuration values (apiKey, authDomain, projectId, etc.) and replace them in the firebase.js file located in the src directory.

4. Start the development server:
  
   npm start

5. Open your browser and visit http://localhost:3000 to see the Chat App in action.


## Deployment

The Chat App is deployed at https://vercel.com/. 
Depl0yed Link- https://chat-pxvn4ok2d-acecoder7.vercel.app/

To deploy the Chat App to your own Firebase project, you can follow these steps:

1. Build the app for production:

   npm run build

2. Deploy the build directory to Firebase Hosting:

   firebase deploy


## Folder Structure

- public: Contains the static assets and the index.html file.
- src: Contains the source code of the Chat App.
- components: Contains reusable components used throughout the app.
- context: Contains React context providers for managing user authentication and chat state.
- firebase: Contains the Firebase configuration and initialization code.
- image: Contains images used in the app.
- pages: Contains the main pages of the app, such as the login page, chat room page, and user profile page.
- style: Contains SCSS files for styling the app.
- App.js: The main entry point of the app.
- index.js: Renders the app and mounts it to the DOM.
- firebase.js: Firebase configuration and initialization.


## Contributing
Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.


## License
The My Chat App is licensed under the [MIT License]

Feel free to modify and customize the README file according to your specific chat app. Remember to provide instructions for installation, configuration, and deployment, as well as information about the app's features, technologies used, folder structure, and how to contribute.
