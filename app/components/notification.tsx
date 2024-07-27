import {Portal, Modal, Text, Button, Snackbar} from 'react-native-paper';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';
import {
  selectNotification,
  selectIsVisible,
  selectCompType,
} from '../store/selectors/alerts-selectors';
import {NotificationType} from '../../models/models';
import {useSelector, useDispatch} from 'react-redux';
import {toggleNotification} from '../store/slices/alerts-slice';

interface CustomModal {
  iconName: string;
  color: string;
}

export const Notification = () => {
  const theme = useTheme();
  const isVisible = useSelector(selectIsVisible);
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();
  const customizeNotification = (type: NotificationType): CustomModal => {
    let stylizedContent: CustomModal = {
      iconName: '',
      color: '',
    };

    if (type === 'info') {
      stylizedContent = {
        iconName: 'info-circle',
        color: 'dodgerblue',
      };
    }
    if (type === 'warning') {
      stylizedContent = {
        iconName: 'warning',
        color: theme.colors.tertiary,
      };
    }
    if (type === 'delete') {
      stylizedContent = {
        iconName: 'warning',
        color: theme.colors.tertiary,
      };
    }
    return stylizedContent;
  };
  if (notification.compType === 'snackbar') {
    return (
      <Snackbar
        visible={isVisible}
        onDismiss={() => dispatch(toggleNotification())}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name={customizeNotification(notification.type).iconName}
            color={customizeNotification(notification.type).color}
          />
          <Text style={{color: customizeNotification(notification.type).color}}>
            {' '}
            {notification.text}
          </Text>
        </View>
      </Snackbar>
    );
  }

  if (notification.compType === 'modal') {
    return (
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={() => dispatch(toggleNotification())}>
          <Text>Hello world !</Text>
        </Modal>
      </Portal>
    );
  }
};
