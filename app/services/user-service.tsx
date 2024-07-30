import {User} from '../../models/models';
const usersURL = 'http://192.168.1.100:3000/users';
const signinURL = 'http://192.168.1.100:3000/signin';
class UserService {
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

  signinUser = ({email, password}: {email: string; password: string}) => {
    return fetch(signinURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
  };

updateUserProperty = (id: number,{key : property}:{key: keyof User, property: Partial<User>})=> {
  return fetch(`${usersURL}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({key: property})
  })
}

}

export const userService = new UserService()
