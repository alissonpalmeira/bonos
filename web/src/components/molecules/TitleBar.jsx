import React from 'react';
import { Box, Button, Text } from 'grommet';

export const TitleBar = ({ title, icon, onClick }) => {

    return (
        <Box align='center' direction='row' fill='horizontal' flex={false} gap='medium' justify='between'>
            <Box fill='horizontal'>
                <Text size='large' weight='bold'>
                    {title}
                </Text>
            </Box>

            <Button
                disabled={!onClick}
                icon={icon}
                onClick={onClick}
                plain
            />
        </Box>
    )
}
