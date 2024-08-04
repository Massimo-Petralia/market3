import {useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export const DotIndicator = ({
  index,
  counter,
}: {
  index: number;
  counter: number;
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        style.dot,
        {
          backgroundColor: index === counter ? theme.colors.primary : 'grey',
          height: index === counter ? 14 : 10,
          width: index === counter ? 14 : 10,
        },
      ]}></View>
  );
};

const style = StyleSheet.create({
  dot: {
    borderRadius: 50,
    width: 10,
    height: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
