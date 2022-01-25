import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Task = props => {
  {
    return props.status ? (
      <View style={[styles.item,{backgroundColor:"#cdcdcd"}]}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[
                styles.itemText,
                {fontSize: 16, fontWeight: 'bold', color: 'black'},
              ]}>
              {props.Title}
            </Text>
            <Text style={styles.itemText}>{props.description}</Text>
          </View>
        </View>
        <View style={styles.circular}></View>
        <Text style={{color:"red"}}>Completed</Text>
      </View>
    ) : (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[
                styles.itemText,
                {fontSize: 16, fontWeight: 'bold', color: 'black'},
              ]}>
              {props.Title}
            </Text>
            <Text style={styles.itemText}>{props.description}</Text>
          </View>
        </View>
        <View style={styles.circular}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '75%',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '100%',
    fontSize: 12,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
