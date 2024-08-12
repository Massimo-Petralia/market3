import {Text, useTheme, Portal, Dialog, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store/store';
import {Product} from '../../models/models';
import {productThunks} from '../store/slices/product-slice';
import {selectAccessToken} from '../store/selectors/user-selectors';

export const NotificationModal = ({
  product,
  toggleNotification,
  isVisible,
}: {
  product: Product;
  toggleNotification: () => void;
  isVisible: boolean;
}) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => toggleNotification()}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{marginBottom:10}}>
            Are you sure you want to delete {product.name}
          </Text>
          <Dialog.Actions style={{justifyContent: 'space-between', marginVertical:10}}>
            <Button mode="contained" style={{width: 100}} onPress={() => toggleNotification()}>
              No
            </Button>
            <Button
              mode="contained" style={{width: 100}}
              onPress={() => {
                if (product.id) {
                  dispatch(
                    productThunks.deleteProductThunk(accessToken, product.id),
                  );
                 toggleNotification()
                }
              }}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
