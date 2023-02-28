import React from 'react';
import { Amount } from 'components/atoms';
import { Box, Button, Text } from 'grommet';
import { Edit } from 'grommet-icons';
import { ProfileBasicInfo, TitleBar } from 'components/molecules';
import { useAuth } from 'services/auth';
import { useMatch } from 'react-location';

const Profile = () => {
    const { user, signOut } = useAuth();
    const { data: { availableBalance } } = useMatch();

    // console.log(availableBalance);

    return(
        <Box fill gap='medium'>
            <TitleBar
                title='My Profile'
                icon={<Edit />}
                // onClick={() => {}}
            />

            <Box fill gap='medium'>
                <ProfileBasicInfo
                    name={user?.addr}
                    bio={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor dapibus metus'}
                    // picture={}
                />

                <Box
                        border={{size: 'small'}}
                        direction='row'
                        fill='horizontal'
                        flex={false}
                        gap='small'
                        pad='xsmall'
                        round='small'
                    >
                        <Box align='center' fill justify='center'>
                            <Text size='small'>Balance Available for Exchange</Text>
                            <Amount prefix='USD' size='large' weight='bold'>{availableBalance*100}</Amount>
                        </Box>
                </Box>
            
                <Button
                    color='primary'
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