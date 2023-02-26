import React from 'react';
import { Box, Button, Card, Image, Text } from 'grommet';
import { useAuth } from 'services/auth';
import Logo from 'assets/images/logo.png';

const Account = () => {
    const { signIn, signUp } = useAuth();

    return (
        <Box background='brand' fill justify='center' pad='medium'>
            <Card>
                <Box height="xsmall" width="xsmall">
                    <Image fit='cover' src={Logo} />
                </Box>

                <Text size='xxlarge'>Bonos</Text>
                
                <Text textAlign='center'>Be welcome to the circular credit system!</Text>
                
                <Button
                    color='primary'
                    fill='horizontal'
                    label='Sign In'
                    onClick={signIn}
                    primary
                    size='medium'
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
    );
}

export default Account;