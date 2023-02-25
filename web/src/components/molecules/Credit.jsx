import React from 'react';
import { Amount } from 'components/atoms';
import { Avatar, Box, Button, Image, Text } from "grommet";
import { Gift } from 'grommet-icons';

const defaultPicture = process.env.REACT_APP_DEFAULT_PICTURE_URL

export const Credit = ({ info, amount, onEdit, onShow }) => {
    // console.log(info, amount, defaultPicture);
    
    return (
        <Box
            background='brand'
            border={{size: 'small'}}
            direction='row'
            fill='horizontal'
            flex={false}
            gap='small'
            pad='small'
            round='medium'
        >
            <Box
                direction='row'
                fill='horizontal'
                gap='small'
                onClick={onShow}
            >
                <Avatar flex={false} size='medium'>
                    <Image
                        fit="cover"
                        src={info.picture ?? defaultPicture}
                        fallback={defaultPicture}
                    />
                </Avatar>
                <Box fill='horizontal'>
                    {/* TODO: rever processo de convite x cadastro */}
                    <Text weight='bold' truncate>@{info?.alias.split('@')[0]}</Text>
                    <Text size='medium' truncate>{info?.bio}</Text>
                </Box>
            </Box>
            <Box align='center' basis='1/4'>
                <Amount weight='bold'>{amount}</Amount>
                { onEdit && (
                    <Button
                        icon={<Gift />}
                        onClick={onEdit}
                        plain
                    />
                )}
            </Box>
        </Box>
    );
}
