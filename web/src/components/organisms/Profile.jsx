import React, { useRef } from 'react';
import { Box, Button, Text } from 'grommet';
import { TitleBar } from 'components/molecules';
import { useAuth } from 'services/auth';

export const Profile = () => {
    const { user, signOut } = useAuth();
    const ref = useRef();

    return(
        <Box fill gap='large' ref={ref}>
            <TitleBar
                title='My Profile'
                // icon={<AddCircle />}
                // onClick={() => navigate({ to: 'insert' })}
            />

            <Box fill align='center' justify='center' gap='large'>
                <Text>{user?.addr}</Text>
                <Button
                    color='primary'
                    // fill='horizontal'
                    label='Sign Out'
                    onClick={signOut}
                    primary
                    size='medium'
                />
            </Box>
        </Box>
    )
}
