import React from 'react';
import { Box, Button, Text } from 'grommet';
import { useAuth } from 'services/auth';

export const Case = () => {
    const { user, signOut } = useAuth();

    return(
        <Box fill align='center' justify='center' gap='large'>
            <Text size='xlarge'>Case</Text>
            <Text>{user?.addr}</Text>
            <Button
                color='primary'
                label='Sign Out'
                onClick={signOut}
                primary
                size='large'
            />
        </Box>
    )
}
