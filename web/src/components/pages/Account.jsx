import React, { useRef } from 'react';
import { Box, Button, Card, Image, Text } from 'grommet';
import { useAuth } from 'services/auth';
import Logo from 'assets/images/logo.png';
import "@pwabuilder/pwainstall";

const Account = () => {
    const { signIn, signUp } = useAuth();
    const ref = useRef();

    // useEffect(() => {
    //     if (!ref.current) return;
    //     console.log(ref.current.getInstalledStatus());
    // });

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

                <Box align='center' justify='center' margin='small'>
                    <pwa-install ref={ref}></pwa-install>
                </Box>
            </Card>
        </Box>
    );
}

export default Account;