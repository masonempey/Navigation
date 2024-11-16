import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import AddTransaction from './component/AddTransaction';
import Details from './component/Details';
import EditTransaction from './component/EditTransaction';

const Stack = createNativeStackNavigator();

type Transaction = {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
};

function Main() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //Chat GPT helped create this method in order to properly update the transaction and now replace.
  const updateTransactions = (updatedTransaction: Transaction) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: 'Transactions',
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
          }}>
          {props => <Home {...props} transactions={transactions} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddTransaction"
          options={{
            title: 'Add Transaction',
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: '#fff',
          }}>
          {props => (
            <AddTransaction
              {...props}
              addTransaction={(newTransaction: Transaction) =>
                setTransactions(prev => [...prev, newTransaction])
              }
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Transaction Details',
            headerStyle: {backgroundColor: 'red'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="EditTransaction"
          options={{
            title: 'Edit Transaction',
            headerStyle: {backgroundColor: 'green'},
            headerTintColor: '#fff',
          }}>
          {props => (
            <EditTransaction
              {...props}
              updateTransactions={updateTransactions}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
