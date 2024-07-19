import {View} from 'react-native'
import { Text } from 'react-native-paper'
import { UserAuth } from '../../../../models/models'

export const UserProfile = ({userData}:{userData: UserAuth|undefined}) => {
    return (
        <View>
            <Text>User profile work !</Text>
            <Text>{userData?.user.name}</Text>
        </View>
    )
}