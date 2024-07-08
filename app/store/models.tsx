import {User} from '../../models/models';
export interface AuthState {
  accessToken: string;
  user: User;
}
