import React from 'react';
import { getCapitalLetter } from '../../utilities/ui/formatters';
import BaseSelect from '../BaseSelect/BaseSelect';
import BaseTextField from '../BaseTextField/BaseTextField';




const BaseForm = ({ inputs = {}, selects = {}, width, spacing, handler }) => {
    const { keys: inputKeys } = inputs;
    const { keys: selectKeys, menuItems } = selects;

    const createLabel = (key) => getCapitalLetter(key.split('_').join(' '));

    const buildInputs = () => inputKeys.map(key => (
        <div style={{ marginTop: spacing, marginBottom: spacing }}>
        <BaseTextField style={{ width }} onChange={(e) => handler(e, key)} label={createLabel(key)} />
        </div>
        ))

    const buildSelects = () => selectKeys.map(key => (
        <div style={{ marginTop: spacing, marginBottom: spacing }}>
        <BaseSelect style={{ width }} onChange={(e) => handler(e, key)} label={createLabel(key)}>
            { menuItems}
        </BaseSelect>
        </div>));

    return (
        <div style={{ width }}>
            {inputs.keys ? buildInputs() : ''}
            {selects.keys ? buildSelects() : ''}
        </div>
    )

}

export default BaseForm;