import { debounce } from "./utils/debounce.js";

//------------------------------------------------//
//------------------------------------------------//
// Function to set initial actuator states from database
const setActuatorStates = async () => {
  try {
    // Fetch actuator states from the server
    const response = await fetch("/api/v1/actuator/getslideractuators");

    // Check for successful response status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    let actuators = await response.json();

    // Reverse the order of actuators
    actuators = actuators.reverse();

    // Handle the retrieved actuators
    console.log("Retrieved actuators:", actuators);

    // Set the initial value of the slider to the state of the first actuator
    if (actuators.length > 0) {
      // Find the first actuator for rotor and aerator respectively
      const rotorActuator = actuators.find(
        (actuator) => actuator.name === "rotor"
      );
      const aeratorActuator = actuators.find(
        (actuator) => actuator.name === "aerator"
      );

      // Set initial values for rotor slider and display
      if (rotorActuator) {
        const rotorSlider = document.getElementById("sliderRotor");
        const rotorOutput = document.getElementById("displayRotor");
        rotorOutput.value = rotorActuator.state;
        rotorSlider.value = rotorActuator.state;
      }

      // Set initial values for aerator slider and display
      if (aeratorActuator) {
        const aeratorSlider = document.getElementById("sliderAerator");
        const aeratorOutput = document.getElementById("displayAerator");
        aeratorOutput.value = aeratorActuator.state;
        aeratorSlider.value = aeratorActuator.state;
      }
    }
  } catch (error) {
    console.error("Error setting actuator states:", error);
  }
};

//------------------------------------------------//
// Function to send actuator state to database
const addActuatorState = async (val, name) => {
  var output;
  if (name === "rotor") {
    output = document.getElementById("displayRotor");
  } else if (name === "aerator") {
    output = document.getElementById("displayAerator");
  }

  // Define the URL of the API endpoint
  const url = "/api/v1/actuator/addslideractuator";

  // Prepare the data to be added (usually in JSON format)
  const data = {
    name: name,
    state: val,
  };

  // Make the POST request
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }), // Convert data to JSON string
  })
    .then((response) => {
      // Check for successful response status before parsing as JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    // Now parse the JSON response
    .then((addedData) => {
      // Handle the added data here (e.g., update UI)
      console.log("Data added successfully:", addedData);
    })
    .catch((error) => {
      console.error("Error adding data:", error);
    });
};

// Debounce the addActuatorState function with a delay of 500 milliseconds
const debouncedAddActuatorState = debounce(addActuatorState, 500);

//------------------------------------------------//
//------------------------------------------------//
// Function to set initial switch states from database
const setSwitchStates = async () => {
  try {
    // Fetch switch states from the server
    const response = await fetch("/api/v1/actuator/getswitchesactuators");

    // Check for successful response status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const switches = await response.json();

    // Handle the retrieved switches
    console.log("Retrieved switches:", switches);

    // Set the initial value of the switches
    switches.forEach((sw) => {
      const switchElement = document.getElementById(sw.name);
      if (switchElement) {
        switchElement.checked = sw.state === true;
      }
    });
  } catch (error) {
    console.error("Error setting switch states:", error);
  }
};

//------------------------------------------------//
// Function to send switch state to database
const addSwitchState = async (val, id) => {
  // Define the URL of the API endpoint
  const url = "/api/v1/actuator/addswitchesactuator";

  // Prepare the data to be added (in JSON format)
  const data = {
    name: id,
    state: val,
  };

  // Make the POST request
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }), // Convert data to JSON string
  })
    .then((response) => {
      // Check for successful response status before parsing as JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    // Now parse the JSON response
    .then((addedData) => {
      // Handle the added data here
      console.log("Data added successfully:", addedData);
    })
    .catch((error) => {
      console.error("Error adding data:", error);
    });
};

// Debounce the addActuatorState function with a delay of 100 milliseconds
const debouncedAddSwitchState = debounce(addSwitchState, 100);

//------------------------------------------------//
//------------------------------------------------//
// Function to set initial sensor value from database
const setSensorValue = async (dataType) => {
  try {
    // Fetch sensor data from the server
    const response = await fetch("/api/v1/sensor/getsensordata");

    // Check for successful response status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const sensorData = await response.json();

    // Handle the retrieved sensor data
    console.log("Retrieved sensor data:", sensorData);

    // Reverse the order of sensor data
    sensorData.reverse();

    // Filter sensor data based on data type
    const filteredData = sensorData.filter((data) => data.name === dataType);

    // Check if filtered data is available
    if (filteredData.length > 0) {
      // Set the value to the corresponding display element
      const displayElement = document.getElementById(
        `display${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`
      );
      displayElement.textContent = `${
        dataType.charAt(0).toUpperCase() + dataType.slice(1)
      }: ${filteredData[0].value}`;
    } else {
      console.warn(`No ${dataType} data retrieved`);
    }
  } catch (error) {
    console.error(`Error setting ${dataType} data:`, error);
  }
};

// Add event listener to the refresh button for temperature
const buttonSetTemp = document.getElementById("buttonSetTemp");
buttonSetTemp.addEventListener("click", function () {
  // Call the function to set the temperature value
  setSensorValue("temperature");
  console.log("Temperature data has been refreshed successfully!");
});

// Add event listener to the refresh button for pH
const buttonSetPh = document.getElementById("buttonSetPh");
buttonSetPh.addEventListener("click", function () {
  // Call the function to set the pH value
  setSensorValue("ph");
  console.log("Ph data has been refreshed successfully!");
});

//------------------------------------------------//
// Function to set initial start sensor value from database
const setSensorStartValue = async () => {
  try {
    await setSensorValue("temperature");
    await setSensorValue("ph");
    console.log("Initial sensor start data has been loaded successfully!");
  } catch (error) {
    console.error("Error loading initial start sensor data:", error);
  }
};

//------------------------------------------------//
//------------------------------------------------//
//------------------------------------------------//
window.onload = async function () {
  // Set up sliders
  // Set up rotor slider and display
  var sliderRotor = document.getElementById("sliderRotor");
  var outputRotor = document.getElementById("displayRotor");
  outputRotor.value = sliderRotor.value;

  sliderRotor.oninput = function () {
    outputRotor.value = this.value;
    debouncedAddActuatorState(this.value, "rotor");
  };

  // Set up aerator slider and display
  var sliderAerator = document.getElementById("sliderAerator");
  var outputAerator = document.getElementById("displayAerator");
  outputAerator.value = sliderAerator.value;

  sliderAerator.oninput = function () {
    outputAerator.value = this.value;
    debouncedAddActuatorState(this.value, "aerator");
  };

  // Set up switches
  const switchWarmWaterPump = document.getElementById("switchWarmWaterPump");
  const switchColdWaterPump = document.getElementById("switchColdWaterPump");
  const switchAcidPump = document.getElementById("switchAcidPump");
  const switchBasePump = document.getElementById("switchBasePump");

  // Add event listeners to each checkbox
  switchWarmWaterPump.addEventListener("change", () => {
    debouncedAddSwitchState(
      switchWarmWaterPump.checked,
      switchWarmWaterPump.id
    );
  });

  switchColdWaterPump.addEventListener("change", () => {
    debouncedAddSwitchState(
      switchColdWaterPump.checked,
      switchColdWaterPump.id
    );
  });

  switchAcidPump.addEventListener("change", () => {
    debouncedAddSwitchState(switchAcidPump.checked, switchAcidPump.id);
  });

  switchBasePump.addEventListener("change", () => {
    debouncedAddSwitchState(switchBasePump.checked, switchBasePump.id);
  });

  // Set initial states for switches from database
  setSwitchStates();

  // Set initial states for actuators from database
  setActuatorStates();

  // Set initial states for sensors from database
  setSensorStartValue();
};
