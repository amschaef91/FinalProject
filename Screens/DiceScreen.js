import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useState, useEffect } from "react";
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';



export default function DiceScreen() {
    const [open, setOpen] = useState(false);
    const [sides, setSides] = useState([
        { label: "D4", value: 4 },
        { label: "D6", value: 6 },
        { label: "D8", value: 8 },
        { label: "D10", value: 10 },
        { label: "D12", value: 12 },
        { label: "D20", value: 20 },
        { label: "D100", value: 100 },]);
    const [value, setValue] = useState(null);
    const [rolls, setRolls] = useState(null);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [header, setHeader] = useState(false);

    const DiceRoll = (numSides, numDice) => {
        let parseNum = parseInt(numDice)
        let parseSide = parseInt(numSides)
        let rolls = [];
        let total = 0;
        if (isNaN(parseNum) || isNaN(parseSide) || !Number.isInteger(parseNum)) {
            alert("# of Dice must be whole numbers")
            return;
        }
        else {
            for (let i = 0; i < parseNum; i++) {
                let roll = Math.floor(Math.random() * parseSide) + 1;
                rolls.push(roll);
                total += roll;
            }
            setResults(rolls);
            setTotal(total);
            setHeader(true);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setRolls(text)}
                        keyboardType='number-pad'
                        placeholder='Number of Rolls'
                        decimal={false}
                    />
                </View>
                <View style={styles.dropDownContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={sides}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setSides}
                        placeholder='Die Type'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            DiceRoll(value, rolls);
                            console.log(value, rolls)
                        }}>
                        <Text style={styles.buttonText}>Roll Dice</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.totalContainer}>
                {header && (
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Total: {total}</Text>
                    </View>
                )}
            </View>
            <View style={styles.resultsContainer}>
                {results.length > 0 && (
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {results.map((roll, index) => (
                            <View style={styles.rollContainer} key={index}>
                                <Text style={styles.rollText}>
                                    Roll {index + 1}: {roll}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 100
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 100,
        paddingTop: 5,
    },
    inputContainer: {
        flex: 1,
        marginRight: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    dropDownContainer: {
        flex: 1,
        marginRight: 5,
        zIndex: 100
    },
    dropDown: {
        flex: 1,
        width: 100,
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 50,
    },
    rollContainer: {
        width: '33.33%',
        alignItems: 'center',
        marginVertical: 10,
    },
    rollText: {
        textAlign: 'center',
    },
    totalContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});