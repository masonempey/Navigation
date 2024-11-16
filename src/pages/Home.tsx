import React from 'react';
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Transaction = {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
};

type HomeProps = {
  transactions: Transaction[];
  navigation: any;
};

function Home({transactions, navigation}: HomeProps) {
  const editTransaction = (transaction: Transaction) => {
    navigation.navigate('Details', {transaction});
  };

  return (
    <View>
      <Button title="+" onPress={() => navigation.navigate('AddTransaction')} />
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.transaction}
            onPress={() => editTransaction(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>${item.amount}</Text>
            <Text>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  transaction: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    color: '#008000',
  },
  type: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default Home;
