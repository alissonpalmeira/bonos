import React from 'react';
import { Box, Button, Card, Heading, Image, Text } from 'grommet';
import { useNavigate } from 'react-location';
import Logo from 'assets/images/logo.png';

export const Error = () => {
    const navigate = useNavigate();
    return (
        <Card>
            <Box height="small" width="small">
                <Image fit='cover' width='small' src={Logo} />
            </Box>
        
            <Heading fill level='3'>Oops...</Heading>

            <Text textAlign='center'>This is really embarrassing...</Text>

            <Text textAlign='center'>Sorry, but an unexpected error occurred.</Text>

            <Button
                color='primary'
                label='Close'
                onClick={() => navigate({ to: '..' })}
                primary
                size='medium'
                // plain
            />            
        </Card>
    );
}
