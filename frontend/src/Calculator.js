import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Input from '@mui/joy/Input';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import AC from "./images/AC.png";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import emissionFactors from './emissionFactors.json';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FacilityYearMonth from './FacilityYearMonth';

export default function Calculator(data) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    data.setFossilInstances([data.initialFossilInstance]);
    data.setFugitiveInstances([data.initialFugitiveInstance]);
    data.setElectricityInstances([data.initialElectricityInstance]);
    data.setWaterInstances([data.initialWaterInstance]);
    data.setWasteInstances([data.initialWasteInstance]);
    data.setTravelInstances([data.initialTravelInstance]);
    data.setOffsetInstances([data.initialOffsetInstance]);
    setLoading(false);
  }, []);

  const navigate = useNavigate();
  function showResults() {
    if (data.fossilInstances[data.fossilInstances.length - 1].fuelNet === '' || data.electricityInstances[data.electricityInstances.length - 1].electricityNet === '' || data.waterInstances[data.waterInstances.length - 1].waterNet === '' || data.wasteInstances[data.wasteInstances.length - 1].wasteNet === '' || data.travelInstances[data.travelInstances.length - 1].travelNet === '' || data.offsetInstances[data.offsetInstances.length - 1].offsetNet === '') {
      alert('Please ensure that you have saved your last instances in each tab before proceeding.');
      return;
    }
    else {
      navigate('/Result');
    }
  }

  function handleChange(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
  };

  function handleInput(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
  };

  const [activeTab, setActiveTab] = useState('Fossil Fuel');
  function changeTab(value) { setActiveTab(value); };

  function calculateFuel(index) {
    const instance = data.fossilInstances[index];
    if (instance.fuelType === '' || (instance.vehicle === '' & instance.fuelUnit === '') || instance.fuelAmount === '') window.alert('Please fill out all the mandatory fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.fossilInstances];
      updatedInstances[index]['fuelNet'] = (instance.fuelAmount * emissionFactors.fuels[instance.fuelType][instance.fuelUnit]);
      data.setFossilInstances(updatedInstances);
    }
  }
  function calculateFugitive(index) {
    const instance = data.fugitiveInstances[index];
    if (instance.applicationType === '' || instance.number === '') window.alert('Please fill out all the mandatory fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.fugitiveInstances];
      updatedInstances[index]['fugitiveNet'] = (instance.number * emissionFactors.fugitive[instance.applicationType]);
      data.setFugitiveInstances(updatedInstances);
    }
  }

  function calculateElectricity(index) {
    const instance = data.electricityInstances[index];
    if (instance.electricityType === '' || instance.electricitySource === '' || instance.electricityUnit === '' || instance.electricityAmount === '') window.alert('Please fill out all the mandatory fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.electricityInstances];
      updatedInstances[index]['electricityNet'] = (instance.electricityAmount * emissionFactors.electricity[instance.electricityType]);
      data.setElectricityInstances(updatedInstances);
    }
  }

  function calculateWater(index) {
    const instance = data.waterInstances[index];
    if (instance.waterType === '' || instance.waterDischargeSite === '' || instance.waterUnit === '' || instance.waterAmount === '') window.alert('Please fill out all the mandatory fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.waterInstances];
      updatedInstances[index]['waterNet'] = (instance.waterAmount * emissionFactors.water[instance.waterType][instance.waterUnit]);
      data.setWaterInstances(updatedInstances);
    }
  }

  function calculateWaste(index) {
    const instance = data.wasteInstances[index];
    if (instance.wasteType === '' || instance.wasteTreatmentType === '' || instance.wasteUnit === '' || instance.wasteAmount === '') window.alert('Please fill out all the mandatory fields.');
    else {
      window.alert('Saved Sucessfully.');
      const updatedInstances = [...data.wasteInstances];
      updatedInstances[index]['wasteNet'] = (instance.wasteAmount * emissionFactors.waste[instance.wasteTreatmentType][instance.wasteType][instance.wasteUnit]);
      data.setWasteInstances(updatedInstances);
    }
  }
  function calculateOffset(index) {
    const instance = data.offsetInstances[index];
    if (instance.offsetTrees === '' || instance.offsetGrass === '' || instance.offsetSoil === '' || instance.offsetWater === '') window.alert('Please fill all the fields (Enter 0 if data not available).');
    else {
      window.alert('Saved Sucessfully.');
      const updatedInstances = [...data.offsetInstances];
      updatedInstances[index]['offsetNet'] = (instance.offsetTrees * emissionFactors.offset.Trees + instance.offsetGrass * emissionFactors.offset['Grass Area'] + instance.offsetSoil * emissionFactors.offset['Soil Area'] + instance.offsetWater * emissionFactors.offset['Water Body']);
      data.setOffsetInstances(updatedInstances);
    }
  }

  function calculateTravel(index) {
    const instance = data.travelInstances[index];
    if (instance.travelType === '' || instance.travelDistance === '') window.alert('Please fill out all the mandatory fields.');
    else {
      if (instance.travelType === 'Airways') {
        if (instance.airFlightLength === '' || instance.travelDistance === '') window.alert('Please fill out all the mandatory fields.')
        else {
          window.alert('Saved Sucessfully.');
          const updatedInstances = [...data.travelInstances];
          updatedInstances[index]['travelNet'] = (instance.travelDistance * emissionFactors.travel[instance.travelType][instance.airFlightLength]);
          data.setTravelInstances(updatedInstances);
        }
      }
      else if (instance.travelType === 'Roadways') {
        if (instance.roadVehicleOwnership === '' || instance.roadVehicleType === '' || (instance.roadVehicleOwnership === 'Personal' && instance.roadFuelType === '')) window.alert('Please fill out all the mandatory fields.')
        else {
          window.alert('Saved Sucessfully.');
          const updatedInstances = [...data.travelInstances];
          updatedInstances[index]['travelNet'] = instance.roadVehicleOwnership === 'Personal' ? (instance.travelDistance * (instance.roadVehicleType !== 'Motorcycle' ? emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType][instance.roadFuelType] : emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType])) : (instance.travelDistance * emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType]);
          data.setTravelInstances(updatedInstances);
        }
      }
      else if (instance.travelType === 'Railways') {
        if (instance.railType === '') window.alert('Please fill out all the mandatory fields')
        else {
          window.alert('Saved Sucessfully.');
          const updatedInstances = [...data.travelInstances];
          updatedInstances[index]['travelNet'] = emissionFactors.travel[instance.travelType][instance.railType] * instance.travelDistance;
          data.setTravelInstances(updatedInstances);
          console.log(updatedInstances);
        }
      }

    }
  }

  const lastFossilInstance = data.fossilInstances[data.fossilInstances.length - 1];
  const lastFugitiveInstance = data.fugitiveInstances[data.fugitiveInstances.length - 1];
  const lastElectricityInstance = data.electricityInstances[data.electricityInstances.length - 1];
  const lastWaterInstance = data.waterInstances[data.waterInstances.length - 1];
  const lastWasteInstance = data.wasteInstances[data.wasteInstances.length - 1];
  const lastTravelInstance = data.travelInstances[data.travelInstances.length - 1];
  const lastOffsetInstance = data.offsetInstances[data.offsetInstances.length - 1];

  return (
    loading ? <div style={{display:"flex",justifyContent:'center',marginTop:'20%'}}><h1>Please Wait..</h1></div> :
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="calculatorDiv">
        <div className="instructions">
          <h1 style={{ width: '100%', textAlign: 'center' }}><b>Calculate your Carbon Footprint</b></h1>
          <h2 id="instructionsH2">Instructions for filling out the form:</h2>
          <ul id="instructionsList">
            <li>For each tab, fill out the form and click on <b>'Save'</b> to save your changes.</li>
            <li>To add another instance for the same tab, click on <b>'Add Another Instance'</b> after saving the current instance.</li>
            <li>Use <b>'Go to Next/Previous Tab'</b> to navigate between the tabs.</li>
            <li>Fields marked as &nbsp;<p style={{ display: 'inline', color: 'red' }}>*</p> are mandatory fields.</li>
            <li>Ensure that you have saved your last instances in each tab. If you do not have the data for any particular Tab/Facility, choose any option for mandatory fields and enter <b>'0'</b> in the <b>'Amount/Distance'</b> fields.</li>
          </ul>
        </div>
        <Tabs value={activeTab} onChange={(event, value) => { changeTab(value) }} >
          <TabList underlinePlacement="bottom">
            <div className="tabsDiv">
              <Tab className="tabContent" value="Fossil Fuel" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faGasPump} />&nbsp;&nbsp;Fossil Fuel
              </Tab>
              <Tab className="tabContent" value="Fugitive" indicatorPlacement="bottom">
                <img style={{ width: "25px", marginBottom: "0px" }} alt="acIcon" src={AC} />&nbsp;&nbsp;Fugitive
              </Tab>
              <Tab className="tabContent" value="Electricity" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faBolt} />&nbsp;&nbsp;Electricity
              </Tab>
              <Tab className="tabContent" value="Water" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faWater} />&nbsp;&nbsp; Water
              </Tab>
              <Tab className="tabContent" value="Waste" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp; Waste
              </Tab>
              <Tab className="tabContent" value="Travel" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faPlaneDeparture} />&nbsp;&nbsp; Travel
              </Tab>
              <Tab className="tabContent" value="Offset" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faLeaf} />&nbsp;&nbsp; Offset
              </Tab>
            </div>

          </TabList>
          <TabPanel value="Fossil Fuel">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastFossilInstance} array={data.fossilInstances} setArray={data.setFossilInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Fuel Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select required value={lastFossilInstance.fuelType ? lastFossilInstance.fuelType : null} placeholder="Choose Fuel Type" onChange={(event, value) => { handleChange(data.fossilInstances, data.setFossilInstances, value, data.fossilInstances.length - 1, 'fuelType') }} className="Select">
                    <Option value="CNG">CNG</Option>
                    <Option value="Petrol/Gasoline">Petrol/Gasoline</Option>
                    <Option value="Diesel">Diesel</Option>
                    <Option value="PNG">PNG</Option>
                    <Option value="LPG">LPG</Option>
                  </Select>
                </div>

                <div className='inputs'><h3>Unit<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select required value={lastFossilInstance.fuelUnit ? lastFossilInstance.fuelUnit : null} onChange={(event, value) => { handleChange(data.fossilInstances, data.setFossilInstances, value, data.fossilInstances.length - 1, 'fuelUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kg">kg</Option>
                    <Option value="tonne">tonne</Option>
                    {lastFossilInstance.fuelType === 'Diesel' || lastFossilInstance.fuelType === 'Petrol/Gasoline' ? <Option value="litre">litre</Option> : null}
                    {lastFossilInstance.fuelType === 'CNG' || lastFossilInstance.fuelType === 'PNG' ? <Option value="cubic metre">cubic metre</Option> : null}
                  </Select>
                </div>
                <div className='inputs'><h3>Amount Consumed<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Input required type="number" value={lastFossilInstance.fuelAmount ? lastFossilInstance.fuelAmount : ''} onChange={(event) => { handleInput(data.fossilInstances, data.setFossilInstances, event.target.value, data.fossilInstances.length - 1, 'fuelAmount') }} className="Select" placeholder='Enter Amount' />
                </div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateFuel(data.fossilInstances.length - 1)} id="getStarted">Save</Button>
                {lastFossilInstance.fuelNet !== '' ? <Button onClick={() => { data.setFossilInstances([...data.fossilInstances, data.initialFossilInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Fugitive">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastFugitiveInstance} array={data.fugitiveInstances} setArray={data.setFugitiveInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Application Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastFugitiveInstance.applicationType ? lastFugitiveInstance.applicationType : null} onChange={(event, value) => { handleChange(data.fugitiveInstances, data.setFugitiveInstances, value, data.fugitiveInstances.length - 1, 'applicationType') }} className="Select" placeholder="Choose Application Type">
                    <Option value="Domestic Refrigeration">Domestic Refrigeration</Option>
                    <Option value="Commercial Refrigeration">Commercial Refrigeration</Option>
                    <Option value="Industrial Refrigeration">Industrial Refrigeration</Option>
                    <Option value="Residential and Commercial A/Cs">Residential and Commercial A/Cs</Option>
                  </Select>
                </div>
                <div className='inputs'>
                  <h3>Number of Units<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Input type="number" value={lastFugitiveInstance.number ? lastFugitiveInstance.number : ''} className="Select" placeholder="Enter Number of Units" onChange={(event) => { handleInput(data.fugitiveInstances, data.setFugitiveInstances, event.target.value, data.fugitiveInstances.length - 1, 'number') }} />
                </div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => { calculateFugitive(data.fugitiveInstances.length - 1) }} id="getStarted">Save</Button>
                {lastFugitiveInstance.fugitiveNet !== '' ? <Button onClick={() => { data.setFugitiveInstances([...data.fugitiveInstances, data.initialFugitiveInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>

          </TabPanel>



          <TabPanel value="Electricity">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastElectricityInstance} array={data.electricityInstances} setArray={data.setElectricityInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Electricity Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastElectricityInstance.electricityType ? lastElectricityInstance.electricityType : null} onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricityType') }} className="Select" placeholder="Choose Electricity Type">
                    <Option value="Coal/Thermal">Coal/Thermal</Option>
                    <Option value="Solar">Solar</Option>
                  </Select>
                </div>
                <div className='inputs'>
                  <h3>Electricity Source<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastElectricityInstance.electricitySource ? lastElectricityInstance.electricitySource : null} className="Select" placeholder="Choose Electricity Source" onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricitySource') }}>
                    <Option value="Purchased">Purchased</Option>
                    <Option value="Self-Produced">Self-Produced</Option>
                  </Select>
                </div>
                <div className='inputs'><h3>Unit<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastElectricityInstance.electricityUnit ? lastElectricityInstance.electricityUnit : null} onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricityUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kWH">kWH</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount Consumed<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Input type="number" value={lastElectricityInstance.electricityAmount ? lastElectricityInstance.electricityAmount : ''} onChange={(event) => { handleChange(data.electricityInstances, data.setElectricityInstances, event.target.value, data.electricityInstances.length - 1, 'electricityAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => { calculateElectricity(data.electricityInstances.length - 1) }} id="getStarted">Save</Button>
                {lastElectricityInstance.electricityNet !== '' ? <Button onClick={() => { data.setElectricityInstances([...data.electricityInstances, data.initialElectricityInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Water">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastWaterInstance} array={data.waterInstances} setArray={data.setWaterInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Water Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastWaterInstance.waterType ? lastWaterInstance.waterType : null} onChange={(event, value) => { handleChange(data.waterInstances, data.setWaterInstances, value, data.waterInstances.length - 1, 'waterType') }} className="Select" placeholder="Choose Water Type">
                    <Option value="Supplied Water">Supplied Water</Option>
                    <Option value="Treated Water">Treated Water</Option>
                  </Select>
                </div>
                <div className='inputs'>
                  <h3>Discharge Site<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                  <Input value={lastWaterInstance.waterDischargeSite ? lastWaterInstance.waterDischargeSite : ''} onChange={(event) => { handleInput(data.waterInstances, data.setWaterInstances, event.target.value, data.waterInstances.length - 1, 'waterDischargeSite') }} className="Select" placeholder='Enter Discharge Site' />
                </div>
                <div className='inputs'><h3>Unit<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastWaterInstance.waterUnit ? lastWaterInstance.waterUnit : null} onChange={(event, value) => { handleChange(data.waterInstances, data.setWaterInstances, value, data.waterInstances.length - 1, 'waterUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="cubic metre">cubic metre</Option>
                    <Option value="million litres">million litres</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount<p style={{ display: 'inline', color: 'red' }}>*</p> </h3><Input type="number" value={lastWaterInstance.waterAmount ? lastWaterInstance.waterAmount : ''} onChange={(event) => { handleInput(data.waterInstances, data.setWaterInstances, event.target.value, data.waterInstances.length - 1, 'waterAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateWater(data.waterInstances.length - 1)} id="getStarted">Save</Button>
                {lastWaterInstance.waterNet !== '' ? <Button onClick={() => { data.setWaterInstances([...data.waterInstances, data.initialWaterInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Waste">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastWasteInstance} array={data.wasteInstances} setArray={data.setWasteInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Waste Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastWasteInstance.wasteType ? lastWasteInstance.wasteType : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteType') }} className="Select" placeholder="Choose Waste Type">
                    <Option value="Household Residue">Household Residue</Option>
                    <Option value="Food and Drink Waste">Food and Drink Waste</Option>
                    <Option value="Garden Waste">Garden Waste</Option>
                    <Option value="Commercial and Industrial Waste">Commercial and Industrial Waste</Option>
                  </Select>
                </div>
                <div className="inputs">
                  <h3>Treatment Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastWasteInstance.wasteTreatmentType ? lastWasteInstance.wasteTreatmentType : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteTreatmentType') }} className="Select" placeholder="Choose Treatment Type">
                    <Option value="Landfills">Landfills</Option>
                    {lastWasteInstance.wasteType === 'Food and Drink Waste' || lastWasteInstance.wasteType === 'Garden Waste' ? <Option value="Composting">Composting</Option> : null}
                    <Option value="Combustion">Combustion</Option>
                    <Option value="Recycling">Recycling</Option>
                  </Select>
                </div>
                <div className='inputs'><h3>Unit<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastWasteInstance.wasteUnit ? lastWasteInstance.wasteUnit : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kg">kg</Option>
                    <Option value="tonne">tonne</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount<p style={{ display: 'inline', color: 'red' }}>*</p> </h3><Input type="number" value={lastWasteInstance.wasteAmount ? lastWasteInstance.wasteAmount : ''} onChange={(event) => { handleInput(data.wasteInstances, data.setWasteInstances, event.target.value, data.wasteInstances.length - 1, 'wasteAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateWaste(data.wasteInstances.length - 1)} id="getStarted">Save</Button>
                {lastWasteInstance.wasteNet !== '' ? <Button onClick={() => { data.setWasteInstances([...data.wasteInstances, data.initialWasteInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Travel">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastTravelInstance} array={data.travelInstances} setArray={data.setTravelInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Mode of Transport<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                  <Select value={lastTravelInstance.travelType ? lastTravelInstance.travelType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'travelType') }} className="Select" placeholder="Choose Mode of Transport">
                    <Option value="Airways">Airways</Option>
                    <Option value="Roadways">Roadways</Option>
                    <Option value="Railways">Railways</Option>
                  </Select>
                </div>
                {lastTravelInstance.travelType === 'Airways' ?
                  <div className='inputs'>
                    <h3>Flight Length<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                    <Select value={lastTravelInstance.airFlightLength ? lastTravelInstance.airFlightLength : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'airFlightLength') }} className="Select" placeholder="Choose Flight Length">
                      <Option value="Domestic">Domestic</Option>
                      <Option value="Short Haul">Short Haul</Option>
                      <Option value="Long Haul">Long Haul</Option>
                      <Option value="International">International</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' ?
                  <div className='inputs'>
                    <h3>Vehicle Ownership<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                    <Select value={lastTravelInstance.roadVehicleOwnership ? lastTravelInstance.roadVehicleOwnership : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleOwnership') }} className="Select" placeholder="Choose Vehicle Ownership">
                      <Option value="Personal">Personal</Option>
                      <Option value="Public">Public</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Personal' ?
                  <div className='inputs'>
                    <h3>Vehicle Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                    <Select value={lastTravelInstance.roadVehicleType ? lastTravelInstance.roadVehicleType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleType') }} className="Select" placeholder="Choose Vehicle Type">
                      <Option value="Small Sized Car">Small Sized Car</Option>
                      <Option value="Medium Sized Car">Medium Sized Car</Option>
                      <Option value="Large Sized Car">Large Sized Car</Option>
                      <Option value="Motorcycle">Motorcycle</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Public' ?
                  <div className='inputs'>
                    <h3>Vehicle Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                    <Select value={lastTravelInstance.roadVehicleType ? lastTravelInstance.roadVehicleType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleType') }} className="Select" placeholder="Choose Vehicle Type">
                      <Option value="Bus">Bus</Option>
                      <Option value="Taxi">Taxi</Option>
                    </Select>
                  </div> : null}{
                  lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Personal' && lastTravelInstance.roadVehicleType !== 'Motorcycle' ?
                    <div className='inputs'>
                      <h3>Fuel Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                      <Select value={lastTravelInstance.roadFuelType ? lastTravelInstance.roadFuelType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadFuelType') }} className="Select" placeholder="Choose Fuel Type">
                        {lastTravelInstance.roadVehicleType !== 'Small Sized Car' ? <Option value="CNG">CNG</Option> : null}
                        <Option value="Petrol/Gasoline">Petrol/Gasoline</Option>
                        <Option value="Diesel">Diesel</Option>
                        <Option value="Electric">Electric</Option>
                      </Select>
                    </div> : null
                }
                {
                  lastTravelInstance.travelType === 'Railways' ?
                    <div className='inputs'>
                      <h3>Rail Type<p style={{ display: 'inline', color: 'red' }}>*</p> </h3>
                      <Select value={lastTravelInstance.railType ? lastTravelInstance.railType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'railType') }} className="Select" placeholder="Choose Rail Type">
                        <Option value="National Railways">National Railways</Option>
                        <Option value="Metro">Metro</Option>
                      </Select>
                    </div> : null
                }
                <div className="inputs">
                  <h3>Distance Travelled(KM)<p style={{ display: 'inline', color: 'red' }}>*</p>  </h3>
                  <Input type="number" value={lastTravelInstance.travelDistance ? lastTravelInstance.travelDistance : ''} onChange={(event) => { handleInput(data.travelInstances, data.setTravelInstances, event.target.value, data.travelInstances.length - 1, 'travelDistance') }} className="Select" placeholder='Enter Approximate Distance' />
                </div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateTravel(data.travelInstances.length - 1)} id="getStarted">Save</Button>
                {lastTravelInstance.travelNet !== '' ? <Button onClick={() => { data.setTravelInstances([...data.travelInstances, data.initialTravelInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Offset">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastOffsetInstance} array={data.offsetInstances} setArray={data.setOffsetInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Number of Trees in the Facility<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                  <Input type="number" value={lastOffsetInstance.offsetTrees ? lastOffsetInstance.offsetTrees : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetTrees') }} className="Select" placeholder='Enter Approximate Number' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Soil(m<sup>2</sup>)<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                  <Input type="number" value={lastOffsetInstance.offsetSoil ? lastOffsetInstance.offsetSoil : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetSoil') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Grass(m<sup>2</sup>)<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                  <Input type="number" value={lastOffsetInstance.offsetGrass ? lastOffsetInstance.offsetGrass : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetGrass') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Water(m<sup>2</sup>)<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                  <Input type="number" value={lastOffsetInstance.offsetWater ? lastOffsetInstance.offsetWater : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetWater') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateOffset(data.offsetInstances.length - 1)} id="getStarted">Save</Button>
                {lastOffsetInstance.offsetNet !== '' ? <Button onClick={() => { data.setOffsetInstances([...data.offsetInstances, data.initialOffsetInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button style={{ marginTop: '30px' }} onClick={showResults} id="getStarted">Finalise and Show Results</Button>
              </div>
            </motion.div>
          </TabPanel>
        </Tabs>
      </motion.div>
  );
}
