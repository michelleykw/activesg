import React from 'react';
import DatePicker from './DatePicker';
import CheckboxInput from './CheckboxInput';
import ToggleInput from './ToggleInput';

function FormElement(props) {
    const { type, ...rest } = props;
    switch (type) {
        case 'checkbox':
            return <CheckboxInput {...rest} />
        case 'toggle':
            return <ToggleInput {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        default:
            return null
    }
}

export default FormElement