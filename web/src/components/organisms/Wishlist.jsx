import React from 'react';
import { Box, Button, Text } from 'grommet';
import { useMatch } from 'react-location';
import { AddCircle } from 'grommet-icons';

export const Wishlist = () => {
    const { data: { wishlist } } = useMatch();
    
    console.log(wishlist);

    return(
        <Box fill gap='large'>
            <Box align='center' direction='row' fill='horizontal' flex={false} gap='medium' justify='between'>
                <Box fill='horizontal'>
                    <Text weight='bold'  size='large'>My Wishlist</Text>
                </Box>

                <Button
                    icon={<AddCircle />}
                    onClick={() => {}}
                    plain
                />
            </Box>
        </Box>
    )
}
