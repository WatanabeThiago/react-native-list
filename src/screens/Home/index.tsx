import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import React, { useState } from 'react';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState<string>('')
  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante existe.', 'Já existe um participante na lista com esse nome.')
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')

    console.log('Voce clicou no botao de adicionar')
  }
  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', 'Deseja remover o participante?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name))
          Alert.alert('Deletado')
        }
      },
    ])



  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6b6b6b'
          onChangeText={text => setParticipantName(text)}
          value={participantName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => { handleParticipantRemove(item) }} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença.</Text>
        )}
      />


    </View>
  );
}