import {UserSignup} from './user-signup-view';
import {useSignupMutation} from '../../../store/slices/api-services-slice';
import {User} from '../../../../models/models';

//al isSuccess = true resettiamo i campi del form e notifichiamo indicado di eseguire il login
//qui i valori di default del form non è necessario che facciano riferimento a nessuna variabile di stato o store
// essenzialmente perchè non devono più essere aggiornati anzi cancellati lato client
//SOLO PER QUESTO CASO SPECIFICO DEL FORM DI REGISTRAZIONE !

export const UserSignupPage = () => {
  const [signup, {isLoading, isSuccess, error}] = useSignupMutation();

  const onSignup = (user: User) => {
    signup(user);
  };
  return (
    <>
      <UserSignup
        onSignup={onSignup}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
      />
    </>
  );
};
