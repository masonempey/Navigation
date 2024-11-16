import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EditTransactionProps = {
  route: any;
  updateTransactions: (updatedTransaction: {
    id: number;
    title: string;
    description: string;
    amount: number;
    category: string;
  }) => void;
  navigation: any;
};

function EditTransaction({
  route,
  updateTransactions,
  navigation,
}: EditTransactionProps) {
  const {transaction} = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Essential', 'Leisure', 'Other'];

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!title) {
      newErrors.title = 'Title is required.';
    }
    if (!description) {
      newErrors.description = 'Description is required.';
    }
    if (!amount || isNaN(parseFloat(amount))) {
      newErrors.amount = 'Amount is required and must be a valid number.';
    }
    if (!category) {
      newErrors.category = 'Category is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedTransaction = {
      id: transaction.id,
      title,
      description,
      amount: parseFloat(amount),
      category,
    };

    updateTransactions(updatedTransaction);
    navigation.navigate('Home');

    setErrors({});
  };

  //Sets the fields to be of the transaction selected
  useEffect(() => {
    setTitle(transaction.title);
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setCategory(transaction.category);
  }, [transaction]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.selectedCategory,
            ]}
            onPress={() => setCategory(cat)}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
    padding: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedCategory: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  categoryText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default EditTransaction;
