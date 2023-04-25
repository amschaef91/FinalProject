import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';

const nKey = "@MyApp:nKey";
const image = require('../assets/Background.png');
//https://www.drivethrurpg.com/product/352522/Worlds-Without-Number-Art-Pack?src=newest Image is royalty free


export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    load();
  }, [isFocused]);

  const deleteNote = async (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
            await AsyncStorage.setItem(nKey, JSON.stringify(updatedNotes));
          }
        }
      ],
      { cancelable: true }
    );
  };

  const load = async () => {
    try {
      const notes = await AsyncStorage.getItem(nKey);
      const parseNotes = JSON.parse(notes)
      setNotes(parseNotes || []);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <ScrollView>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <View key={index} style={styles.notesContainer}>
              <Text style={styles.noteHeader}>{note.type} Note: </Text>
              <Text style={styles.content}>{'\t'}{note.content}</Text>
              <TouchableOpacity onPress={() => deleteNote(index)} styles={styles.deleteButton}>
                <FontAwesome5 name="ban" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.notesContainer}>
            <Text style={styles.content}>No notes found</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noteHeader: {
    textAlign: 'center',
    fontSize: 18,
  },
  content: {
    paddingBottom: 20,
    fontSize: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: 'red',
    alignSelf: 'flex-end',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});