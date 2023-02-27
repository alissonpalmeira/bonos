import React, { useState } from 'react';
import { Box, Button, Card, CheckBox, Heading, Text } from 'grommet';
import { useBonos } from 'services/business';

const TestWarning = ({ onClose }) => {
    const [ notShowAgain, setNotShowAgain ] = useState(false);
    const { setShowTestWarning } = useBonos();

    const close = () => {
        setShowTestWarning(!notShowAgain);
        onClose();
    }

    return (
        <Box fill='horizontal'>
            <Card fill='horizontal'>           
                <Heading fill level='3'>Warning</Heading>

                <Text textAlign='center' size='small'>By continuing, I understand that this is an experimental technology running on Flow Testnet and data can be lost without any notification.</Text>

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
            </Card>
        </Box>
    );
}

export default TestWarning;
