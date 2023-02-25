import React, { useCallback, useState } from 'react';
import { TextInput } from 'grommet';
import { formatAmount } from 'services/utils';

export const AmountInput = ({ onChange, value, max=99999999999, prefix = '', ...rest }) => {
    const [amount, setAmount] = useState(value);

    const format = (value) => {
        // if (value===undefined || value===null) value = 0;
        // value = value.toString().padStart(3, '0');
        // value = value.slice(0, -2) + ',' + value.slice(-2)
        // if (value.length > 6) value = value.slice(0, -6) + '.' + value.slice(-6)
        // if (value.length > 10) value = value.slice(0, -10) + '.' + value.slice(-10)
        // value = value.slice(-14);
        value = prefix + ' ' + formatAmount(value);
        return value;
    }

    const onInputChange = useCallback((event, ...rest) => {
        let newAmount = parseInt(event.target.value.match(/\d+/g).join('') || '0');
        newAmount = newAmount <= max ? newAmount : amount;

        onChange && onChange(
            {
                ...event,
                target: {
                    ...event.target,
                    value: newAmount/100,
                }
            },
            ...rest
        );
        
        setAmount(newAmount);
    }, [amount, max, onChange]);

    return (
        <TextInput
            value={format(amount)}
            onChange={onInputChange}
            {...rest}
        />
    );
  };
