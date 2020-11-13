import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack"

import Home from "./src/components/Home"
import ScanScreem from "./src/components/ScanScreem"

const AppNavigator = createStackNavigator(
  {
    "Home": {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      }
    },
    "ScanScreem": {
      screen: ScanScreem,
      navigationOptions: {
        headerShown: false,
      }
    },
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer