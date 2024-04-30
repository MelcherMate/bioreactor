import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Display from "./components/Display";
import Slider from "./components/Slider";
import Switch from "./components/Switch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="grid">
        <header>Bioversee</header>
        <main>
          <Switch
            name="switchWarmWaterPump"
            label="Warm water pump"
            url="/api/v1/actuator/getswitchesactuators"
            updateUrl="/api/v1/actuator/postswitchactuator"
          />
          <Switch
            name="switchColdWaterPump"
            label="Cold water pump"
            url="/api/v1/actuator/getswitchesactuators"
            updateUrl="/api/v1/actuator/postswitchactuator"
          />
          <Switch
            name="switchAcidPump"
            label="Acid pump"
            url="/api/v1/actuator/getswitchesactuators"
            updateUrl="/api/v1/actuator/postswitchactuator"
          />
          <Switch
            name="switchBasePump"
            label="Base pump"
            url="/api/v1/actuator/getswitchesactuators"
            updateUrl="/api/v1/actuator/postswitchactuator"
          />
          <Display
            name="rotorDisplay"
            label="Rotor display" //value="0"
          />
          <Display
            name="aeratorDisplay"
            label="Aerator display" //value="0"
          />
          <Slider
            name="rotor"
            label="Rotor"
            url="/api/v1/actuator/getslideractuators"
            updateUrl="/api/v1/actuator/postslideractuator"
          />
          <Slider
            name="aerator"
            label="Aerator"
            url="/api/v1/actuator/getslideractuators"
            updateUrl="/api/v1/actuator/postslideractuator"
          />
          <Display
            name="tempDisplay"
            label="Temperature display" //value="0"
          />
          <Display
            name="pHDisplay"
            label="pH display" //value="0"
          />
          <Button name="tempCall" label="Temperature button" />
          <Button name="phCall" label="pH value button" />
        </main>
        <footer>Bioversee open-source software</footer>
      </div>
    </>
  );
}

export default App;
