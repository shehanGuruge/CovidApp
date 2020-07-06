import * as firebase from 'firebase'

function initFirebase(){
    return new Promise((resolve, reject) => {
        try{
            var firebaseConfig = {
                apiKey: "AIzaSyDAYYjIaMsYfD71xsUhnJxweF_NJT_gFJ0",
                authDomain: "letmein-a7d65.firebaseapp.com",
                databaseURL: "https://letmein-a7d65.firebaseio.com",
                projectId: "letmein-a7d65",
                storageBucket: "letmein-a7d65.appspot.com",
                messagingSenderId: "827326013761",
                appId: "1:827326013761:web:20e964935a0fe9fb7741c0",
                measurementId: "G-XM7R2HBYR5"
            };

              if(!firebase.apps.length){
                  firebase.initializeApp(firebaseConfig);
              }

              resolve("Success");
        }catch(err){
            reject(err)
        }
    })
}


export {initFirebase}