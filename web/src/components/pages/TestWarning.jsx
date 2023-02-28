import React, { useState } from 'react';
import { Box, Button, Card, CheckBox, Text } from 'grommet';
import { useAuth } from 'services/auth';
import { useBonos } from 'services/business';

const TestWarning = () => {
    const [ notShowAgain, setNotShowAgain ] = useState(false);
    const { setShowTestWarning, setWarned } = useBonos();
    const { signOut } = useAuth();

    const close = () => {
        setShowTestWarning(!notShowAgain);
        setWarned(true);
    }

    return (
        <Box background='brand' fill justify='center' pad='medium'>
            <Card>           
                <Text size='xxlarge'>Warning</Text>

                <Text textAlign='center'>By continuing, I understand that this is an experimental technology running on Flow Testnet and data can be lost without any notification.</Text>

                <Box alignSelf='start'>
                    <CheckBox
                        checked={notShowAgain}
                        label={<Text size='small'>{`Don't show again`}</Text>}
                        onChange={(event) => setNotShowAgain(event.target.checked)}
                    />
                </Box>

                <Button
                    color='primary'
                    label='Continue'
                    onClick={close}
                    primary
                    size='medium'
                    // plain
                />            

                <Box direction="row">
                    <Text>Don't want to play?&nbsp;</Text>
                    <Button
                        color='primary'
                        // disabled={initializing}
                        label='Sign Out'
                        onClick={signOut}
                        plain
                    />
                </Box>
            </Card>
        </Box>
    );
}

export default TestWarning;
