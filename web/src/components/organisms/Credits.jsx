import React, { useRef } from 'react';
import { Box, Text } from 'grommet';
import { TitleBar } from 'components/molecules';

export const Credits = () => {
    const ref = useRef();

    return(
        <Box fill gap='large' ref={ref}>
            <TitleBar
                title='My Credits'
                // icon={<AddCircle />}
                // onClick={() => navigate({ to: 'insert' })}
            />

            <Box align='center' fill gap='small' justify='center'>
                <Text size='medium' textAlign='center'>No credits earned yet...</Text>
                <Text size='medium' textAlign='center'>Try adding some wishes to your wishlist</Text>
            </Box>
        </Box>
    )
}
