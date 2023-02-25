import React from "react";
import { AmountInput } from "./AmountInput";
import { FormField } from "grommet";

export const AmountInputField = ({max, prefix, suffix, ...rest}) => (
    <FormField
        max={max}
        prefix={prefix}
        suffix={suffix}
        component={AmountInput}
        {...rest}
    />
);
