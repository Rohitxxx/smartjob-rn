import { View, StatusBar } from 'react-native'
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import Colors from './src/constants/Colors';
import { DataContext } from './src/Context/Contex';
const App = () => {
  return (
    <>
      <StatusBar barStyle={'default'} translucent={true} backgroundColor={Colors.primary700} />
      <View style={{ flex: 1 }}>
        <DataContext>
          <RootNavigation />
        </DataContext>
      </View>
    </>
  )
}

export default App
