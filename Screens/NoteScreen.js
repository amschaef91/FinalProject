import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../assets/Background.png');
//https://www.drivethrurpg.com/product/352522/Worlds-Without-Number-Art-Pack?src=newest Image is royalty free

const nKey = "@MyApp:nKey"
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
                alert("An error occurred while saving the note");
            }
        } else {
            alert("Type and Text must have input");
        }
    };


    return (
        <ImageBackground source={image} style={styles.backgroundImage}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                            <Pressable style={styles.button} onPress={() => { saveNote(value, noteText); setNoteText(""); }}>
                                <Text style={styles.buttonText}>Save Note
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.textInput}
                            onChangeText={text => setNoteText(text)}
                            placeholder='Write your note'
                            multiline={true}
                            value={noteText}>

                        </TextInput>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#tomato',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 10,
        zIndex: 100,
    },
    picker: {
        flex: 1,
        marginRight: 5,
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        padding: 12,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
    },
    textInput: {
        textAlign: 'center',
        flex: 1,
        fontSize: 24,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
        opacity: .7
    },
    warning: {
        position: 'absolute',
        top: 70,
        alignSelf: 'center',
        color: 'red',
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});