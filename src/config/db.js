import * as firebase from 'firebase'

function initFirebase(){
    return new Promise((resolve, reject) => {
        try{
            var firebaseConfig = {
                apiKey: "AIzaSyDnbht89E0t5X20ANR0vV_sRw_SXJhjprA",
                authDomain: "covid-app-d6654.firebaseapp.com",
                databaseURL: "https://covid-app-d6654.firebaseio.com",
                projectId: "covid-app-d6654",
                storageBucket: "covid-app-d6654.appspot.com",
                messagingSenderId: "641884851862",
                appId: "1:641884851862:web:49acd6c54925c745293cb7",
                measurementId: "G-91CW9LDQMG"
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