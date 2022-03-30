let fireBaseApp = require('firebase/app')
let admin = require("firebase-admin");
let _ = require('lodash')

// init firebase admin
let serviceAccount = require("./FBSec_key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfbase-28e82-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Initialize Firebase
const firebase = fireBaseApp.initializeApp({
    apiKey: "AIzaSyBFVbl2SiKW_2zLfbaXeN1HyOLb8h6ZRS0",
    authDomain: "testfbase-28e82.firebaseapp.com",
    projectId: "testfbase-28e82",
    storageBucket: "testfbase-28e82.appspot.com",
    messagingSenderId: "602460489292",
    appId: "1:602460489292:web:185173747b40dc4c8816e9",
    measurementId: "G-N1NV7L02C4",
    databaseURL : 'https://testfbase-28e82-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

let RT_database = (string) => admin.database().ref(string)

let fireStore = (string) => admin.firestore().collection(string)




try {

    let promise = async () => {

        let bookArray = [
            { name : 'first book' , pageNum : 100 , }
        ]

        RT_database('Books').set({
            book : {
                name : 'some Name', 
                id : 'asd',
                authorId : 1
            }
        })
    
        RT_database('Authors').set({
            author : {
                name : 'khoa',
                id : 1
            }
        })
    
        RT_database('Authors')
    
        await fireStore('Books').doc().set({
            name : "Sách 14",
            pageNum : 50,
            authorId : 'TDB8772HbS9xBBjgb52w'
            
        })

        // await fireStore('Authors').add({
        //     name : 'Khang',
        //     type : "love"
        // }).then(res => {
        //     console.log(res.id)
        // })

    }
    
    // promise().then(res => {

    // })


    
    fireStore('Authors').offset(0).limit(2).get().then( async res => {
        let arr = []
        
        let newPro = () => new Promise((resolve , reject) => {
            let a = res.docs.map(async (_forRes) => {
                let data = _forRes.data();
    
                let a = (await fireStore('Books').where('authorId', '==', _forRes.id).get())
                    .docs
                    .map((value) => value.data());
                data.books = a;
                return arr.push(data);
            })
            resolve(Promise.all(a))
        })

        newPro().then(res => {
            console.log(arr)
        })

    })

} catch (error) {
    console.log(error)
}





module.exports = { firebase , admin }