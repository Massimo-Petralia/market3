import {FormUserAddress} from './form-user-address';
import {
  selectUserDetail,
  selectPatchSuccess,
} from '../../../store/selectors/user-selectors';
import {useSelector, useDispatch} from 'react-redux';
import {resetPatchSuccess, userThunks} from '../../../store/slices/user-slice';
import {Address} from '../../../../models/models';
import {User} from '../../../../models/models';
import {AppDispatch} from '../../../store/store';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserStackNavigationProp} from '../../../navigation/navigation-types';
import Routes from '../../../navigation/routes';

export const FormUserAddressPage = () => {
  const navigation = useNavigation<UserStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const {address, id} = useSelector(selectUserDetail);
  const patchSuccess = useSelector(selectPatchSuccess);
  const onPatchAddress = (address: Partial<User>) => {
    if (id) {
      dispatch(userThunks.patchUserPropertyThunk(id, 'address', address));
    }
  };

  useEffect(() => {
    if (patchSuccess) {
      navigation.navigate(Routes.MainTabs.UserStack.Profile);
      dispatch(resetPatchSuccess());
    }
  }, [patchSuccess]);
  return (
    <>
      <FormUserAddress address={address} onPatchAddress={onPatchAddress} navigation={navigation}/>
    </>
  );
};
