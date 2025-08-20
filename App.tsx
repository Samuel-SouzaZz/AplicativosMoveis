import React from 'react';
import { View, Text, StyleSheet , FlatList} from 'react-native';


const DATA = [ 
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
];
export default function ExFleatLits(){ 
    const renderItem = ({item}) => ( <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
    </View>
    );
    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.container}
        />
    );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }