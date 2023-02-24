import React from 'react';
import { Box, Button, Text } from 'grommet';
import { useAuth } from 'services/auth';
import { useBonos } from 'services/business';

export const Profile = () => {
    const { signOut } = useAuth();
    const { address } = useBonos();

    return(
        <Box fill align='center' justify='center' gap='large'>
            <Text size='xlarge'>Profile</Text>
            <Text>{address}</Text>
            <Button
                color='primary'
                // fill='horizontal'
                label='Sign Out'
                onClick={signOut}
                primary
                size='large'
            />
        </Box>
    )
}
