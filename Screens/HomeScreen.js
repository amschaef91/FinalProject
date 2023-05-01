import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Pressable
} from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { openDatabase, deleteNote, createDB } from '../Database/Database';
import * as WebBrowser from 'expo-web-browser';

const db = openDatabase();

const image = require('../assets/Background.png');
//https://www.drivethrurpg.com/product/352522/Worlds-Without-Number-Art-Pack?src=newest Image is royalty free

function Notes() {
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    createDB();
    fetchNotes();
}, [isFocused]);

async function fetchNotes() {
  db.transaction((tx) => {
    tx.executeSql(
      `select id, type, content, date(inputDate) as Date from notes order by Date desc`,
      [],
      (_, { rows: { _array } }) => {
        setNotes([..._array]);
      }
    );
  }); 
}

async function handleDelete(id) {
  const isDeleteed = await deleteNote(id);
  if (isDeleteed) {
    fetchNotes();
  }
}

  if (!notes || notes.length === 0) {
    return (
      <View style={styles.notesContainer}>
        <Text style={styles.noteHeader}>No notes found</Text>
      </View>
    );
  }
  return (
    <ScrollView key={notes.length}>
      {notes.map(({ id, type, content, Date }) => (
        <View key={id} style={styles.notesContainer}>
          <Text style={styles.noteHeader}>{type} Note: </Text>
          <Text style={styles.content}>{'\t'}{content}</Text>
          <Text style={styles.date}>{Date}</Text>
          <TouchableOpacity onPress={() => handleDelete(id)} style={styles.deleteButton}>
            <FontAwesome5 name="ban" size={15} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

export default function HomeScreen() {
  const url = 'https://www.dndbeyond.com/spells';

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.scrollContainer}>
      <Notes/>
      </View>
      <Pressable style={styles.info} onPress={() => WebBrowser.openBrowserAsync(url)}><Text style={styles.buttonText}>DnD Spell List</Text></Pressable>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    bottom: 4,
    right: 4,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    color: 'white',
    alignSelf: 'flex-end',
  },
  info: {
    position: 'absolute', 
    top: 0,
    alignSelf: 'center',
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'white'
  },
  scrollContainer: {
    marginTop: 36
  }
});