import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const nKey ="@MyApp:nKey"
export default function NoteScreen({ navigation }) {
    
    const [type, setType] = useState([{
        label: 'Character', value: 'Character'
    },
    { label: 'Event', value: 'Event' }
    ])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [noteText, setNoteText] = useState('');
    const [note, setNote] = useState({ type: '', content: '' });
    const [message, setMessage] = useState("");
    
    const saveNote = async (value, noteText) => {
        if (value && noteText) {
          const newNote = { type: value, content: noteText };
          try {
            const notes = await AsyncStorage.getItem(nKey);
            let parsedNotes = JSON.parse(notes) || [];
            const updatedNotes = Array.isArray(parsedNotes) ? [...parsedNotes, newNote] : [newNote];
            await AsyncStorage.setItem(nKey, JSON.stringify(updatedNotes));
            navigation.goBack();
            setValue("");
            setMessage("");
          } catch (error) {
            console.log(error);
            setMessage("An error occurred while saving the note");
          }
        } else {
          setMessage("Type and Text cannot be null");
        }
      };


    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.picker}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={type}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setType}
                    placeholder='Note Type'
                />
                </View>
                <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => {saveNote(value, noteText); setNoteText("");}}>
                    <Text style={styles.buttonText}>Save Note
                    </Text>
                </Pressable>
                </View>
            </View>
            
            <View>
                <TextInput style={styles.textInput}
                    onChangeText={text => setNoteText(text)}
                    placeholder='Write your note'
                    multiline={true}
                    value={noteText}>
                    
                </TextInput>
            </View>
            <Text style={styles.warning}>{message}</Text>
        </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#tomato',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 100,
        paddingTop: 70,
    },
    picker: {
        flex: 1,
        zIndex: 100,
    },
    textInput: {
        fontSize: 24,
        marginTop: 50,
        flex: 3
    },
    button: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 5,
    },
    buttonContainer: {

    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        padding: 10,
    },
    warning: {
        position: 'absolute',
        top: 70,
        color: 'red',
        fontSize: 16,
    }
});