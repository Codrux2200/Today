import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CreditPin } from '../utils/creditsView/creditpin';
import { CustomText } from '../utils/text/text';
import Back from "../assets/bigback.svg";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApi from '../hooks/useApi'; // Assure-toi d'importer ton hook useApi
import { API_URL } from '../utils/courseviewtime/courseviewtime';



interface Session {
  time: Date; // Date complète
  duration: number;
  booked: number; // Nombre de membres inscrits
  capacity: number; // Nombre total de places
  intensity: number; // Intensité (à définir)
  courseId: string;
}

interface DaySessions {
  date: string; // Date formatée (ex: "Today, 12 Feb")
  sessions: Session[];
}



const formatApiDataToDaySessions= (apiData: any[]): DaySessions[] => {
  const groupedByDate: { [key: string]: Session[] } = {};

  apiData.forEach((session) => {
    // Convertir la date en format "Today, 12 Feb"
    const date = new Date(session.date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    // Convertir l'heure en objet Date
    const time = new Date(session.date);

    // Créer un objet Session
    const formattedSession: Session = {
      time, // Date complète
      duration: 60, // Durée fixe (à adapter si nécessaire)
      booked: session.members.length, // Nombre de membres inscrits
      capacity: session.slots, // Nombre total de places
      intensity: 6, // Intensité par défaut (à adapter si nécessaire)
      courseId: session.courseId,
    };

    // Grouper par date
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(formattedSession);
  });

  // Convertir en tableau de DaySessions
  return Object.keys(groupedByDate).map((date) => ({
    date,
    sessions: groupedByDate[date],
  }));
};


const HourChoosingPage = () => {
  const [data, setData] = useState<DaySessions[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const navigation = useNavigation();

  // Utilisation du hook useApi
  const { data: apiData, loading, error, request } = useApi<Session[]>(API_URL);


  
  // Récupérer les données de l'API
  useEffect(() => {
    const fetchData = async () => {
      const sessions = await request('/specific-courses/' + "4", "GET"); // Endpoint pour récupérer les sessions
      if (sessions) {
        console.log(sessions);
        const formattedData = formatApiDataToDaySessions(sessions);
        setData(formattedData);
      }
    };

    fetchData();
  }, [request]);

  // Sauvegarder la session sélectionnée
  useEffect(() => {
    const saveSelectedSession = async () => {
      if (selectedSession !== null) {
        await AsyncStorage.setItem('sessions', JSON.stringify(selectedSession));
        console.log(selectedSession);
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate("SignIn" as never);
        }
      }
    };

    saveSelectedSession();
  }, [selectedSession]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <CustomText style={{ fontWeight: "bold", fontSize: 20 }}>WOD with Erika</CustomText>
      </View>
      <ScrollView style={[styles.container, { marginTop: 40 }]}>
        {loading ? (
          <CustomText>Chargement en cours...</CustomText>
        ) : error ? (
          <CustomText style={{ color: 'red' }}>{error}</CustomText>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.dateCustomText}>{item.date}</CustomText>
                <View style={{ borderWidth: 1, borderColor: 'rgb(240,240,240)', borderRadius: 10 }}>
                  {item.sessions.map((session, index) => (
                    <TouchableOpacity
                      style={[styles.sessionCard, { borderBottomWidth: index === item.sessions.length - 1 ? 0 : 1 }]}
                      onPress={() => setSelectedSession(session)}
                    >
                      <CustomText style={styles.sessionTime}>
                        {new Date(session.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </CustomText>
                      <CustomText style={styles.sessionDuration}>60 min</CustomText>
                      <CreditPin />
                      <View style={{ height: 28, width: 68, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <CustomText style={[styles.sessionDetails, { textAlign: 'center', textAlignVertical: 'center' }]}>
                          {session.booked}/{session.capacity}👥
                        </CustomText>
                      </View>
                      <CustomText>{">"}</CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  dateCustomText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  sessionCard: {
    padding: 20,
    alignContent: "center",
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    borderBottomWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: 'rgb(240,240,240)'
  },
  sessionTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  sessionDuration: {
    color: 'gray',
    fontSize: 14,
  },
  sessionDetails: {
    fontSize: 14,
    color: '#555',
  },
  header: {
    height: 100,
    flexDirection: "row",
    gap: 20,
    padding: "3%",
    alignItems: "flex-end",
    alignContent: "center"
  },
});

export default HourChoosingPage;