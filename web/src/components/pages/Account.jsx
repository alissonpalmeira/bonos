import React from 'react';
import { Box, Button, Card, Image, Text } from 'grommet';
import { useAuth } from 'services/auth';
import Logo from 'assets/images/logo.png';

export const Account = () => {
    const { signIn, signUp } = useAuth();

    return (
        <Box
            align='center'
            background='brand'
            gap='small'
            fill
            justify='center'
        >            
            <Box width={{max: 'medium'}}>
                <Card>
                    <Box height="small" width="small">
                        <Image fit='cover' width='small' src={Logo} />
                    </Box>

                    <Text size='xxlarge'>Bonos</Text>
                    <Text textAlign='center'>Be welcome to the circular credit system!</Text>
                    <Button
                        color='primary'
                        fill='horizontal'
                        label='Sign In'
                        onClick={signIn}
                        primary
                        size='large'
                    />

                    <Box direction="row">
                        <Text>Don't have an account?&nbsp;</Text>
                        <Button
                            color='primary'
                            label='Sign Up'
                            onClick={signUp}
                            plain
                        />
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}
