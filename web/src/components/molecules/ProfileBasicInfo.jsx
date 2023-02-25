import React from 'react';
import { Avatar, Box, Image, Text } from "grommet";

const defaultPicture = process.env.REACT_APP_DEFAULT_PICTURE_URL

export const ProfileBasicInfo = ({ picture, name, bio }) => (
    <Box 
        direction='row' 
        fill='horizontal' 
        flex={false} 
        gap='medium'
    >
        <Avatar flex={false} pad='xsmall' size='large'>
            <Image
                fit="cover"
                src={picture ?? defaultPicture}
                fallback={defaultPicture}
            />
        </Avatar>

        <Box fill='horizontal'>
            <Text weight='bold'>{name}</Text>
            <Text size='medium'>{bio}</Text>
        </Box>
    </Box>
)
