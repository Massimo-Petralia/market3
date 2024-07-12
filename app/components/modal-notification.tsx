import {Portal, Modal, Text, Button} from 'react-native-paper';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';
import {
  selectNotification,
  selectIsVisible,
} from '../store/selectors/alerts-selectors';
import {NotificationType} from '../../models/models';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../store/slices/alerts-slice';

interface CustomModal {
  iconName: string;
  color: string;
}

export const ModalNotification = () => {
  const theme = useTheme();
  const isVisible = useSelector(selectIsVisible)
  const dispatch = useDispatch()
  const customizeModal = (type: NotificationType): CustomModal => {
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
  return (
    <Portal>
        <Modal visible={isVisible} onDismiss={()=>dispatch(toggleModal())}>
            <Text>Hello world !</Text>
        </Modal>
    </Portal>
  )
};
