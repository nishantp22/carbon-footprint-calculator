
import emissionFactors from './emissionFactors.json';
import ExcelJS from 'exceljs';


// eslint-disable-next-line import/no-anonymous-default-export

// eslint-disable-next-line no-restricted-globals
async function processFossilSheet(workbook) {
    const fossil = workbook.getWorksheet('Fossil Fuel');
    const newFossilInstances = [];
    fossil.eachRow((row, rowNumber) => {
        if (rowNumber >= 8) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'fuelType': '',
                'fuelUnit': '',
                'fuelAmount': '',
                'fuelNet': ''
            };
            newInstance.facilityName = fossil.getCell(`B${rowNumber}`).value;
            newInstance.year = fossil.getCell(`C${rowNumber}`).value;
            newInstance.month = fossil.getCell(`D${rowNumber}`).value;
            newInstance.fuelType = fossil.getCell(`E${rowNumber}`).value;
            newInstance.fuelUnit = fossil.getCell(`F${rowNumber}`).value;
            newInstance.fuelAmount = fossil.getCell(`G${rowNumber}`).value;
            if (newInstance.fuelType === null || newInstance.fuelUnit === null || newInstance.fuelAmount === null) {
                throw new Error('Data is inconsistent with the template requirements.');
            }
            else {
                newInstance.fuelNet = (newInstance.fuelAmount * emissionFactors.fuels[newInstance.fuelType][newInstance.fuelUnit]);
            }
            newFossilInstances.push(newInstance);
        }
    });
    return newFossilInstances
}

async function processElectricitySheet(workbook) {
    const electricity = workbook.getWorksheet('Electricity');
    const newElectricityInstances = [];
    electricity.eachRow((row, rowNumber) => {
        if (rowNumber >= 7) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'electricityType': '',
                'electricitySource': '',
                'electricityUnit': '',
                'electricityAmount': '',
                'electricityNet': ''
            };
            newInstance.facilityName = electricity.getCell(`B${rowNumber}`).value;
            newInstance.year = electricity.getCell(`C${rowNumber}`).value;
            newInstance.month = electricity.getCell(`D${rowNumber}`).value;
            newInstance.electricityType = electricity.getCell(`E${rowNumber}`).value;
            newInstance.electricitySource = electricity.getCell(`F${rowNumber}`).value;
            newInstance.electricityUnit = electricity.getCell(`G${rowNumber}`).value;
            newInstance.electricityAmount = electricity.getCell(`H${rowNumber}`).value;
            if (newInstance.electricityType === null || newInstance.electricitySource === null || (newInstance.electricityUnit === null) || newInstance.electricityAmount === null) {
                throw new Error('Data is inconsistent with the template requirements.');
            }
            else {
                newInstance.electricityNet = (newInstance.electricityAmount * parseFloat(emissionFactors.electricity[newInstance.electricityType]));
            }
            newElectricityInstances.push(newInstance);
        }
    });
    return newElectricityInstances
}

async function processWaterSheet(workbook) {
    const water = workbook.getWorksheet('Water');
    const newWaterInstances = [];
    water.eachRow((row, rowNumber) => {
        if (rowNumber >= 8) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'waterType': '',
                'waterDischargeSite': '',
                'waterUnit': '',
                'waterAmount': '',
                'waterNet': ''
            };
            newInstance.facilityName = water.getCell(`B${rowNumber}`).value;
            newInstance.year = water.getCell(`C${rowNumber}`).value;
            newInstance.month = water.getCell(`D${rowNumber}`).value;
            newInstance.waterType = water.getCell(`E${rowNumber}`).value;
            newInstance.waterDischargeSite = water.getCell(`F${rowNumber}`).value;
            newInstance.waterUnit = water.getCell(`G${rowNumber}`).value;
            newInstance.waterAmount = water.getCell(`H${rowNumber}`).value;
            if (newInstance.waterType === null || newInstance.waterDischargeSite === null || (newInstance.waterUnit === null) || newInstance.waterAmount === null) {
                throw new Error('Data is inconsistent with the template requirements.');
            }
            else {
                newInstance.waterNet = (newInstance.waterAmount * emissionFactors.water[newInstance.waterType][newInstance.waterUnit]);
            }
            newWaterInstances.push(newInstance);
        }
    });
    return newWaterInstances
}

async function processWasteSheet(workbook) {
    const waste = workbook.getWorksheet('Waste');
    const newWasteInstances = [];
    waste.eachRow((row, rowNumber) => {
        if (rowNumber >= 8) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'wasteType': '',
                'wasteTreatmentType': '',
                'wasteUnit': '',
                'wasteAmount': '',
                'wasteNet': ''
            };
            newInstance.facilityName = waste.getCell(`B${rowNumber}`).value;
            newInstance.year = waste.getCell(`C${rowNumber}`).value;
            newInstance.month = waste.getCell(`D${rowNumber}`).value;
            newInstance.wasteType = waste.getCell(`E${rowNumber}`).value;
            newInstance.wasteTreatmentType = waste.getCell(`F${rowNumber}`).value;
            newInstance.wasteUnit = waste.getCell(`G${rowNumber}`).value;
            newInstance.wasteAmount = waste.getCell(`H${rowNumber}`).value;
            if (newInstance.wasteType === null || newInstance.wasteTreatmentType === null || (newInstance.wasteUnit === null) || newInstance.wasteAmount === null) {
                throw new Error('Data is inconsistent with the template requirements.');
            }
            else {
                newInstance.wasteNet = (newInstance.wasteAmount * emissionFactors.waste[newInstance.wasteTreatmentType][newInstance.wasteType][newInstance.wasteUnit]);
            }
            newWasteInstances.push(newInstance);
        }
    });
    return newWasteInstances
}

async function processOffsetSheet(workbook) {
    const offset = workbook.getWorksheet('Offset');
    const newOffsetInstances = [];
    offset.eachRow((row, rowNumber) => {
        if (rowNumber >= 8) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'offsetTrees': '',
                'offsetGrass': '',
                'offsetSoil': '',
                'offsetWater': '',
                'offsetNet': ''
            };
            newInstance.facilityName = offset.getCell(`B${rowNumber}`).value;
            newInstance.year = offset.getCell(`C${rowNumber}`).value;
            newInstance.month = offset.getCell(`D${rowNumber}`).value;
            newInstance.offsetTrees = offset.getCell(`E${rowNumber}`).value;
            newInstance.offsetSoil = offset.getCell(`F${rowNumber}`).value;
            newInstance.offsetGrass = offset.getCell(`G${rowNumber}`).value;
            newInstance.offsetWater = offset.getCell(`H${rowNumber}`).value;
            if (newInstance.offsetTrees === null || newInstance.offsetSoil === null || (newInstance.offsetGrass === null) || newInstance.offsetWater === null) {
                throw new Error('Data is inconsistent with the template requirements.');
            }
            else {
                newInstance.offsetNet = (newInstance.offsetTrees * emissionFactors.offset.Trees + newInstance.offsetGrass * emissionFactors.offset['Grass Area'] + newInstance.offsetSoil * emissionFactors.offset['Soil Area'] + newInstance.offsetWater * emissionFactors.offset['Water Body']);
            }
            newOffsetInstances.push(newInstance);
        }
    });
    return newOffsetInstances
}

async function processTravelSheet(workbook) {
    const travel = workbook.getWorksheet('Travel');
    const newTravelInstances = [];
    travel.eachRow((row, rowNumber) => {
        if (rowNumber >= 8) {
            const newInstance = {
                'facilityName': '',
                'year': '',
                'month': '',
                'travelType': '',
                'airFlightLength': '',
                'roadVehicleOwnership': '',
                'roadVehicleType': '',
                'roadFuelType': '',
                'travelDistance': '',
                'travelNet': ''
            };
            newInstance.facilityName = travel.getCell(`B${rowNumber}`).value;
            newInstance.year = travel.getCell(`C${rowNumber}`).value;
            newInstance.month = travel.getCell(`D${rowNumber}`).value;
            newInstance.travelType = travel.getCell(`E${rowNumber}`).value;
            newInstance.airFlightLength = travel.getCell(`F${rowNumber}`).value;
            newInstance.roadVehicleOwnership = travel.getCell(`G${rowNumber}`).value;
            newInstance.roadVehicleType = travel.getCell(`H${rowNumber}`).value;
            newInstance.roadFuelType = travel.getCell(`I${rowNumber}`).value;
            newInstance.travelDistance = travel.getCell(`J${rowNumber}`).value;

            if (newInstance.travelType === null || newInstance.travelDistance === null) throw new Error('Data is inconsistent with the template requirements.');
            else {
                if (newInstance.travelType === 'Airways') {
                    if (newInstance.airFlightLength === null || newInstance.travelDistance === null) throw new Error('Data is inconsistent with the template requirements.');
                    else {
                        newInstance.travelNet = (newInstance.travelDistance * emissionFactors.travel[newInstance.travelType][newInstance.airFlightLength]);
                    }
                }
                else if (newInstance.travelType === 'Roadways') {
                    if (newInstance.roadVehicleOwnership === null || newInstance.roadVehicleType === null || (newInstance.roadVehicleOwnership === 'Personal' && newInstance.roadFuelType === '')) throw new Error('Data is inconsistent with the template requirements.');
                    else {
                        newInstance.travelNet = newInstance.roadVehicleOwnership === 'Personal' ? (newInstance.travelDistance * (newInstance.roadVehicleType !== 'Motorcycle' ? emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType][newInstance.roadFuelType] : emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType])) : (newInstance.travelDistance * emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType]);
                    }
                }
            }
            newTravelInstances.push(newInstance);
        }
    });
    return newTravelInstances;
}

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', async (e) => {
    const { file } = e.data;
    const workbook = new ExcelJS.Workbook();
    try {
        await workbook.xlsx.load(file);
        const fossilData = await processFossilSheet(workbook);
        const electricityData = await processElectricitySheet(workbook);
        const waterData = await processWaterSheet(workbook);
        const wasteData = await processWasteSheet(workbook);
        const travelData = await processTravelSheet(workbook);
        const offsetData = await processOffsetSheet(workbook);

        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
            result: 'Calculation completed successfully',
            fossilData: fossilData,
            electricityData: electricityData,
            waterData: waterData,
            wasteData: wasteData,
            travelData: travelData,
            offsetData: offsetData
        });
    } catch (error) {
        console.log(error)
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({ error: error.message });
    }
});