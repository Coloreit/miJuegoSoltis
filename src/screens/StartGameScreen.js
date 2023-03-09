import { Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../components/Card'
import Colors from '../contants/Colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import { titleStyle } from '../contants/TextStyles'

const StartGameScreen = ({ onStartGame }) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
        return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container}>
                <Text style={styles.title}>Comenzar juego</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.inputDescriptionText}>Escribe un número</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        value={enteredValue}
                        onChangeText={numberInputHandler}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <Button title='Limpiar' onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirmar' onPress={confirmInputHandler} rcolor={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmed &&
                    <Card style={styles.selectedNumberContainer}>
                        <Text>Tu seleccion</Text>
                        <NumberContainer>{selectedNumber}</NumberContainer>
                        <Button title='EMPEZAR JUEGO' onPress={()=>{
                            onStartGame(selectedNumber)
                        }}/>
                    </Card>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        ...titleStyle
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        padding: 20,
        alignItems: 'center',
    },
    inputDescriptionText: {
        textAlign: 'center',
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button:{
        width: 100,
    },
    selectedNumberContainer:{
        marginTop: 20,
        width: 200, 
        maxWidth: '80%',
        padding: 10,
        alignItems: 'center'
    }
})