import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { SET_SELECTED_MONTH } from '../../redux/features/transaction/transactionSlice';

const options = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];
const SelectInput = () => {

    const dispatch = useDispatch()

    const [selectedOption, setSelectedOption] = useState(options[2]);

    // Handle select chage
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
        dispatch(SET_SELECTED_MONTH(selectedOption))

    }
    return (
        <div className='max-w-sm w-full' >
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}               
            />
        </div>
    )
}

export default SelectInput