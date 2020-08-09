const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
functions.logger.info("Hello logs!", {structuredData: true});
response.send("Hello from Firebase!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('new activity', doc))
})

exports.todoCreated = functions.firestore.document('todos/{todoId}').onCreate(doc => {
        const todo = doc.data();
        const notification = {
        content: 'new idea',
        user: `${todo.authorFirstName} ${todo.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        userId: todo.authorId
    }

    return createNotification(notification);
});

exports.userJoined = functions.auth.user()
    .onCreate(user => {

    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
            content: 'registration',
            user: `${newUser.firstName} ${newUser.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            userId: user.uid
        }
        return createNotification(notification);
    })
})
