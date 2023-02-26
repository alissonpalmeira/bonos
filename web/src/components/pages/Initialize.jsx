import React from 'react';
import { Box, Button, Card, Layer, Text } from 'grommet';
import { Pending } from 'components/molecules';
import { useAuth } from 'services/auth';
import { useBonos } from 'services/business';

const Initialize = () => {
    const { signOut } = useAuth();
    const { initializeAccount, initializing } = useBonos();

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
                    size='medium'
                />

                <Box direction="row">
                    <Text>Don't want to join?&nbsp;</Text>
                    <Button
                        color='primary'
                        disabled={initializing}
                        label='Sign Out'
                        onClick={signOut}
                        plain
                    />
                </Box>
            </Card>

            {initializing && (
                <Layer 
                    plain
                    responsive={false}
                >
                    <Pending />
                </Layer>
            )}
        </Box>
    )
}

export default Initialize;