import { useSelector } from "react-redux";
import RouterContainer from "./RoutesContainer";
import Notification from "./common/notification";
import { ModuleSettingsProvider } from "./components/moduleSettingsContext/ModuleSettingsContext";

function App() {
  // const reducer = useSelector((state) => state);
  // console.log('reducer: ', reducer);
  return (
    <ModuleSettingsProvider>
      <div id="wrapper">
        <RouterContainer />
        <Notification />
      </div>
    </ModuleSettingsProvider>
  );
}

export default App;
