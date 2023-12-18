import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function handleChange(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
};

const FacilityYearMonth = (data) => {
    return (
        <div className="calcForm">
            <div className='inputs'>
                <h3>Facility<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select className="Select" value={data.lastInstance.facilityName ? data.lastInstance.facilityName : null} placeholder="Choose Facility" onChange={(event, value) => { handleChange(data.array, data.setArray, value, data.array.length - 1, 'facilityName') }}>
                    <Option value='Residential Areas'>Residential Areas</Option>
                    <Option value='Hostels'>Hostels</Option>
                    <Option value='Academic Area'>Academic Area</Option>
                    <Option value='Health Centre'>Health Centre</Option>
                    <Option value='Schools'>Schools</Option>
                    <Option value="Visitor's Hostel">Visitor's Hostel</Option>
                    <Option value="Servant's Quarters">Servant's Quarters</Option>
                    <Option value="Shops/Bank/PO">Shops/Bank/PO</Option>
                    <Option value="Lawns and Horticulture">Lawns and Horticulture</Option>
                    <Option value="Dhobhighat">Dhobhighat</Option>
                    <Option value='Others'>Others</Option>
                </Select>
            </div>
            <div className='inputs'>
                <h3>Year<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select value={data.lastInstance.year ? data.lastInstance.year : null} onChange={(event, value) => { handleChange(data.array, data.setArray, value, data.array.length - 1, 'year') }} className="Select" placeholder='Choose Year'>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                </Select>
            </div>
            <div className="inputs">
                <h3>Month<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select value={data.lastInstance.month ? data.lastInstance.month : null} className="Select" id="monthSelect" placeholder="Choose Month" onChange={(event, value) => { handleChange(data.array, data.setArray, value, data.array.length - 1, 'month') }}>
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                    <Option value="March">March</Option>
                    <Option value="April">April</Option>
                    <Option value="May">May</Option>
                    <Option value="June">June</Option>
                    <Option value="July">July</Option>
                    <Option value="August">August</Option>
                    <Option value="September">September</Option>
                    <Option value="October">October</Option>
                    <Option value="November">November</Option>
                    <Option value="December">December</Option>
                </Select>
            </div>
        </div>
    );
}
export default FacilityYearMonth;