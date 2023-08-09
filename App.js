import React,{useState} from 'react';
import Search from './search';
import { Button, View,Text } from 'react-native';

export default function App() {
  const [page,setPage]=useState(false)

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    }}>
    <Button title={page?"Search":"Shelf"} 
    onPress={
      ()=>setPage((p)=>!p)
    }
    />
    { page?<Search/>:<Text>Page</Text>}

    </View>
  );
}

