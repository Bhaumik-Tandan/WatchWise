import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Image, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  thumbnail: {
    width: 80,
    height: 60,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  duration: {
    color: 'gray',
  },
});

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await fetchYouTubeData(query); // Call the API function
      setResults(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter search query"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {/* Display search results */}
      {results.map((item) => (
        <View key={item.id.videoId} style={styles.result}>
          <Image source={{ uri: item.snippet.thumbnails.default.url }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.snippet.title}</Text>
            <Text style={styles.duration}>Duration: {item.duration}</Text>
            <Button title='Add to watch latter'/>
          </View>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}


export async function fetchYouTubeData(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&part=snippet&maxResults=10&type=video`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
