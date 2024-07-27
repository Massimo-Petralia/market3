import {User} from '../../models/models';
const usersURL = 'http://192.168.1.101:3000/users';
export class UserService {
   createUser = (user: User) => {
    return fetch(usersURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };
}
