import React, { useRef } from 'react';
import { Box, Button } from 'grommet';
import { Edit } from 'grommet-icons';
import { ProfileBasicInfo, TitleBar } from 'components/molecules';
import { useAuth } from 'services/auth';

const Profile = () => {
    const { user, signOut } = useAuth();
    const ref = useRef();

    return(
        <Box fill gap='medium' ref={ref}>
            <TitleBar
                title='My Profile'
                icon={<Edit />}
                // onClick={() => navigate({ to: 'insert' })}
            />

            <Box fill gap='medium'>
                <ProfileBasicInfo
                    name={user?.addr}
                    bio={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor dapibus metus'}
                    // picture={}
                />

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

export default Profile;