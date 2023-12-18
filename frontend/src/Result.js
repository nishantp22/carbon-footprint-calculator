import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from "framer-motion"

export default function Result(props) {
    const monthMapping = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
    }
    const fossilInstances = props.fossilInstances;
    const fugitiveInstances = props.fugitiveInstances;
    const electricityInstances = props.electricityInstances;
    const waterInstances = props.waterInstances;
    const wasteInstances = props.wasteInstances;
    const travelInstances = props.travelInstances;
    const offsetInstances = props.offsetInstances;

    const componentWise = {
        labels: ['Fossil Fuels', 'Fugitive', 'Electricity', 'Water', 'Waste', 'Travel'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: ['#FFE45E', "#9CF6F6", '#345995', '#03CEA4', "#FB4D3D", "#CA1551"],
                hoverBackgroundColor: ['#FFE45E', "#9CF6F6", '#345995', '#03CEA4', "#FB4D3D", "#CA1551"],
                borderWidth: 1,
            },
        ],
    };
    const scopeWise = {
        labels: ['Scope 1', 'Scope 2', 'Scope 3'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: ['#034101', '#059a00', "#3df136"],
                hoverBackgroundColor: ['#034101', '#059a00', '#3df136'],
                borderWidth: 1,
            }
        ]
    }
    const monthWise = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Emission in 2022',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(116, 23, 222, 1)',
                backgroundColor: 'rgba(116, 23, 222, 0.3)'
            },
            {
                label: 'Total Emission in 2023',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(222, 23, 192,1)',
                backgroundColor: 'rgba(222, 23, 192, 0.3)'

            },
            {
                label: 'Total Offset in 2022',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(60, 110, 113,1)',
                backgroundColor: 'rgba(60, 110, 113, 0.3)'

            },
            {
                label: 'Total Offset in 2023',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(209 , 122, 34,1)',
                backgroundColor: 'rgba(209, 122, 34, 0.3)'

            }
        ],
    };
    const facilityWise = {
        labels: ['Residential Areas', 'Hostels', 'Academic Area', 'Health Centre', 'Schools', "Visitor's Hostel", "Servant's Quarters", "Shops/Bank/PO", "Lawns and Horticulture", "Dhobhighat", 'Others'],
        datasets: [
            {
                label: 'Total Emission in 2022',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgb(127, 200, 248,0.5)',
                borderColor: 'rgb(0, 106, 177)',
                borderWidth: 3,
            },
            {
                label: 'Total Emission in 2023',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(88, 99, 248, 0.5)',
                borderColor: 'rgba(37, 52, 255)',
                borderWidth: 3,
            }
        ]
    }

    let totalEmission = 0;
    let totalOffset = 0;


    fossilInstances.forEach((fossilInstance) => {
        if (fossilInstance.fuelNet !== '' || fossilInstance.fuelNet !== null) {

            totalEmission = parseFloat(totalEmission) + parseFloat(fossilInstance.fuelNet) / 1000;

            componentWise.datasets[0].data[0] += parseFloat(fossilInstance.fuelNet) / 1000;
            scopeWise.datasets[0].data[0] += parseFloat(fossilInstance.fuelNet) / 1000;

            if (fossilInstance.month !== null && fossilInstance.year !== null) {
                if (fossilInstance.year == '2022') {
                    monthWise.datasets[0].data[monthMapping[fossilInstance.month] - 1] += parseFloat(fossilInstance.fuelNet) / 1000;
                }
                else if (fossilInstance.year == '2023') {
                    monthWise.datasets[1].data[monthMapping[fossilInstance.month] - 1] += parseFloat(fossilInstance.fuelNet) / 1000;
                }
            }

            const idx = facilityWise.labels.indexOf(fossilInstance.facilityName);
            if (idx === -1) {
                facilityWise.labels.push(fossilInstance.facilityName);
                if (fossilInstance.year !== null) {
                    if (fossilInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(fossilInstance.fuelNet) / 1000);
                    }
                    else if (fossilInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(fossilInstance.fuelNet) / 1000);
                    }
                }
            }
            else {
                if (fossilInstance.year !== null) {
                    if (fossilInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(fossilInstance.fuelNet) / 1000;
                    }
                    else if (fossilInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(fossilInstance.fuelNet) / 1000;
                    }
                }
            }
        }
    });
    
    fugitiveInstances.forEach((fugitiveInstance) => {
        if (fugitiveInstance.fugitiveNet !== '' && fugitiveInstance.fugitiveNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(fugitiveInstance.fugitiveNet) / 1000;
            
            componentWise.datasets[0].data[1] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
            scopeWise.datasets[0].data[0] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
            
            if (fugitiveInstance.month !== null && fugitiveInstance.year !== null) {
                if (fugitiveInstance.year == 2022) {
                    monthWise.datasets[0].data[monthMapping[fugitiveInstance.month] - 1] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
                }
                else if (fugitiveInstance.year == 2023) {
                    monthWise.datasets[1].data[monthMapping[fugitiveInstance.month] - 1] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
                }
            }

            const idx = facilityWise.labels.indexOf(fugitiveInstance.facilityName);
            if (idx === -1) {
                facilityWise.labels.push(fugitiveInstance.facilityName);
                if (fugitiveInstance.year != null) {
                    if (fugitiveInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(fugitiveInstance.fugitiveNet) / 1000);
                    }
                    else if (fugitiveInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(fugitiveInstance.fugitiveNet) / 1000);
                    }
                }
            }
            else {
                if (fugitiveInstance.year != null) {
                    if (fugitiveInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
                    }
                    else if (fugitiveInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(fugitiveInstance.fugitiveNet) / 1000;
                    }
                }
            }
        }
    })

    electricityInstances.forEach((electricityInstance) => {
        if (electricityInstance.electricityNet !== '' && electricityInstance.electricityNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(electricityInstance.electricityNet) / 1000;

            componentWise.datasets[0].data[2] += parseFloat(electricityInstance.electricityNet) / 1000;
            scopeWise.datasets[0].data[1] += parseFloat(electricityInstance.electricityNet) / 1000;

            if (electricityInstance.month !== null && electricityInstance.year !== null) {
                if (electricityInstance.year == 2022) {
                    monthWise.datasets[0].data[monthMapping[electricityInstance.month] - 1] += parseFloat(electricityInstance.electricityNet) / 1000;
                }
                else if (electricityInstance.year == 2023) {
                    monthWise.datasets[1].data[monthMapping[electricityInstance.month] - 1] += parseFloat(electricityInstance.electricityNet) / 1000;
                }
            }

            const idx = facilityWise.labels.indexOf(electricityInstance.facilityName);
            if (idx === -1) {
                facilityWise.labels.push(electricityInstance.facilityName);
                if (electricityInstance.year != null) {
                    if (electricityInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(electricityInstance.electricityNet) / 1000);
                    }
                    else if (electricityInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(electricityInstance.electricityNet) / 1000);
                    }
                }
            }
            else {
                if (electricityInstance.year != null) {
                    if (electricityInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(electricityInstance.electricityNet) / 1000;
                    }
                    else if (electricityInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(electricityInstance.electricityNet) / 1000;
                    }
                }
            }
        }
    });

    waterInstances.forEach((waterInstance) => {
        if (waterInstance.waterNet !== '' || waterInstance.waterNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(waterInstance.waterNet) / 1000;

            componentWise.datasets[0].data[3] += parseFloat(waterInstance.waterNet) / 1000;
            scopeWise.datasets[0].data[2] += parseFloat(waterInstance.waterNet) / 1000;

            if (waterInstance.month !== null && waterInstance.year !== null) {
                if (waterInstance.year == 2022) {
                    monthWise.datasets[0].data[monthMapping[waterInstance.month] - 1] += parseFloat(waterInstance.waterNet) / 1000;
                }
                else if (waterInstance.year == 2023) {
                    monthWise.datasets[1].data[monthMapping[waterInstance.month] - 1] += parseFloat(waterInstance.waterNet) / 1000;
                }
            }

            const idx = facilityWise.labels.indexOf(waterInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(waterInstance.facilityName);
                if (waterInstance.year != null) {
                    if (waterInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(waterInstance.waterNet) / 1000);
                    }
                    else if (waterInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(waterInstance.waterNet) / 1000);
                    }
                }
            }
            else {
                if (waterInstance.year != null) {
                    if (waterInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(waterInstance.waterNet) / 1000;
                    }
                    else if (waterInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(waterInstance.waterNet) / 1000;
                    }
                }
            }
        }
    });

    wasteInstances.forEach((wasteInstance) => {
        if (wasteInstance.wasteNet !== '' || wasteInstance.wasteNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(wasteInstance.wasteNet) / 1000;

            componentWise.datasets[0].data[4] += parseFloat(wasteInstance.wasteNet) / 1000;
            scopeWise.datasets[0].data[2] += parseFloat(wasteInstance.wasteNet) / 1000;

            if (wasteInstance.month !== null && wasteInstance.year !== null) {
                if (wasteInstance.year == 2022) {
                    monthWise.datasets[0].data[monthMapping[wasteInstance.month] - 1] += parseFloat(wasteInstance.wasteNet) / 1000;
                }

                else if (wasteInstance.year == 2023) {
                    monthWise.datasets[1].data[monthMapping[wasteInstance.month] - 1] += parseFloat(wasteInstance.wasteNet) / 1000;
                }
            }
            const idx = facilityWise.labels.indexOf(wasteInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(wasteInstance.facilityName);
                if (wasteInstance.year != null) {
                    if (wasteInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(wasteInstance.wasteNet) / 1000);
                    }
                    else if (wasteInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(wasteInstance.wasteNet) / 1000);
                    }
                }
            }
            else {
                if (wasteInstance.year != null) {
                    if (wasteInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(wasteInstance.wasteNet) / 1000;
                    }
                    else if (wasteInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(wasteInstance.wasteNet) / 1000;
                    }
                }
            }
        }
    });

    travelInstances.forEach((travelInstance) => {
        if (travelInstance.travelNet !== '' || travelInstance.travelNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(travelInstance.travelNet) / 1000;

            componentWise.datasets[0].data[5] += parseFloat(travelInstance.travelNet) / 1000;
            scopeWise.datasets[0].data[2] += parseFloat(travelInstance.travelNet) / 1000;

            if (travelInstance.month !== null && travelInstance.year !== null) {
                if (travelInstance.year == 2022) {
                    monthWise.datasets[0].data[monthMapping[travelInstance.month] - 1] += parseFloat(travelInstance.travelNet) / 1000;
                }
                else if (travelInstance.year == 2023) {
                    monthWise.datasets[1].data[monthMapping[travelInstance.month] - 1] += parseFloat(travelInstance.travelNet) / 1000;
                }
            }
            const idx = facilityWise.labels.indexOf(travelInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(travelInstance.facilityName);
                if (travelInstance.year != null) {
                    if (travelInstance.year == 2022) {
                        facilityWise.datasets[0].data.push(parseFloat(travelInstance.travelNet) / 1000);
                    }
                    else if (travelInstance.year == 2023) {
                        facilityWise.datasets[1].data.push(parseFloat(travelInstance.travelNet) / 1000);
                    }
                }
            }
            else {
                if (travelInstance.year != null) {
                    if (travelInstance.year == 2022) {
                        facilityWise.datasets[0].data[idx] += parseFloat(travelInstance.travelNet) / 1000;
                    }
                    else if (travelInstance.year == 2023) {
                        facilityWise.datasets[1].data[idx] += parseFloat(travelInstance.travelNet) / 1000;
                    }
                }
            }
        }
    });

    offsetInstances.forEach((offsetInstance) => {
        if (offsetInstance.offsetNet !== '' || offsetInstance.offsetNet !== null) {
            totalOffset = parseFloat(totalOffset) + parseFloat(offsetInstance.offsetNet) / 1000;
        }

        if (offsetInstance.month !== null && offsetInstance.year !== null) {
            if (offsetInstance.year == 2022) {
                monthWise.datasets[2].data[monthMapping[offsetInstance.month] - 1] += parseFloat(offsetInstance.offsetNet) / 1000;
            }
            else if (offsetInstance.year == 2023) {
                monthWise.datasets[3].data[monthMapping[offsetInstance.month] - 1] += parseFloat(offsetInstance.offsetNet) / 1000;
            }
        }

    });

    totalEmission = (Number(parseFloat(totalEmission).toFixed(2)));
    totalOffset = (Number(parseFloat(totalOffset).toFixed(2)));

    if (!totalEmission) {
        return (
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginTop: '35vh' }}>Oops! it appears that you did not fill the form correctly, or uploaded an incomplete Excel Sheet. Please go back and fill the form again.</motion.h1>
        )
    }
    props.setResult(1);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className='result'>
            <h1><b>Results</b></h1>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Total Carbon Emission :<b> {totalEmission} </b>Tonnes of CO2</h2>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Total Offset Due to Absorption of CO2 :<b> {-totalOffset} </b>Tonnes of CO2</h2>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Net Carbon Footprint : <b>{((totalEmission + totalOffset).toFixed(2))} </b>Tonnes of CO2</h2>
            <div className='charts'>
                <div className='pieChart'>
                    <h3 style={{ textAlign: "center" }}>Component-wise distribution<br /><h5>(Tonnes of CO2)</h5></h3>

                    <Doughnut data={componentWise} />
                </div>
                <div className='pieChart'>
                    <h3 style={{ textAlign: "center" }}>Scope-wise distribution<br /><h5>(Tonnes of CO2)</h5></h3>
                    <Doughnut data={scopeWise} />
                </div>
                <div className='bar'>
                    <h3 style={{ textAlign: "center" }}>Month-wise distribution<br /><h5>(Tonnes of CO2)</h5></h3>
                    <Line id="bar" data={monthWise} options={{ scales: { y: { beginAtZero: true } } }} />
                </div>
                <div className='bar'>
                    <h3 style={{ textAlign: "center" }}>Facility-wise distribution<br /><h5>(Tonnes of CO2)</h5></h3>
                    <Bar id="bar" data={facilityWise} options={{ scales: { y: { beginAtZero: true } } }} />
                </div>
            </div>
        </motion.div>
    );
}

