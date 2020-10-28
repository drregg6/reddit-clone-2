// get username with db.firebase and return the username
import db from '../db';

export default function(id) {
  let user = '';
  db.collection('users').where('id', '==', id).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      user = doc.data();
    })
  });
  return {
    name: user.name,
    image: user.image
  };
}