import React from "react";
import { Box, Text } from "grommet";
import { formatAmount } from "services/utils";

const sizes = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge"];

export const Amount = ({children, prefix, size='medium', ...rest}) => {
    const getPrefixSize = () => {
        let index = sizes.indexOf(size) - 2;
        if (index < 1) index = 1;
        return sizes[index];
    }
    
    return (
        <Box align="end" direction="row">
            { prefix && (
                <Text size={getPrefixSize()} {...rest}>{prefix}&nbsp;</Text>
            )}
            <Text size={size} {...rest}>{formatAmount(children)}</Text>
        </Box>
    );
}
