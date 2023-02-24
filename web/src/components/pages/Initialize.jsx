import React from 'react';
import { Box, Button, Card, Text } from 'grommet';
import { useAuth } from 'services/auth';
import { useBonos } from 'services/business';

export const Initialize = () => {
    const { signOut } = useAuth();
    const { initializeAccount } = useBonos();

    return(
        <Box background='brand' fill justify='center' pad='medium'>
            <Card>
                <Text size='xxlarge'>Let's begin!</Text>
                <Text textAlign='center'>Your account has not been initialized yet</Text>
                <Button
                    color='primary'
                    fill='horizontal'
                    label='Initialize Account'
                    onClick={initializeAccount}
                    primary
                    size='large'
                />

                <Box direction="row">
                    <Text>Don't want to join?&nbsp;</Text>
                    <Button
                        color='primary'
                        label='Sign Out'
                        onClick={signOut}
                        plain
                    />
                </Box>
            </Card>
        </Box>
    )
}
