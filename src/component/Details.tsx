/* eslint-disable react/react-in-jsx-scope */
import {Text, TouchableOpacity, View} from 'react-native';

function Details({route, navigation}: any) {
  const {transaction} = route.params;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditTransaction', {transaction})}>
      <Text>{transaction.title}</Text>
      <Text>{transaction.description}</Text>
      <Text>${transaction.amount}</Text>
      <View>
        <Text>Click to Edit</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Details;
