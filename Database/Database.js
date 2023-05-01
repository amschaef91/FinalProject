import * as SQLite from "expo-sqlite";
import {Alert} from 'react-native'

export function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }
  const db = SQLite.openDatabase("notes.db");
  return db;
}

export async function createDB() {

  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql("create table if not exists notes(id integer primary key not null, type text, content text, inputDate real)")
  });
}

export async function deleteNote(id) {
  
  const db = openDatabase();
  return new Promise((resolve) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM notes WHERE id = ?', [id], () => {
                resolve(true);
              });
            });
          },
        },
      ],
      { cancelable: true },
    );
  });
};

export async function Add(type, content) {

  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "insert into notes (type, content, inputDate) values (?, ?, julianday('now'))",
      [type, content]
    );
  });
}


