import React from "react";
import { Box, Text } from "grommet";
import { FavoriteEmptyIcon, GiftcardIcon, ProfileIcon } from 'components/atoms';
import { useMatchRoute, useNavigate } from 'react-location';
import { slugify } from "services/utils";

const NavBar = ({ paths, ...rest }) => {
    const matchRoute = useMatchRoute();
    const navigate = useNavigate();

    const isCurrentRoute = (path) => {
        return matchRoute({to: `/case/${slugify(path)}`, fuzzy: true})
    }

    return (
        <Box
            border={{ color: 'black', size: "small", side: "bottom" }}
            direction="row"
            fill='horizontal'
            pad={{ top: 'small', bottom: 'small' }}
            {...rest}
        >
            <Box
                align='center'
                fill
                focusIndicator={false}
                gap='ssmall' 
                onClick={() => navigate({ to: slugify(paths[0]) })}
            >
                <GiftcardIcon
                    color={isCurrentRoute(paths[0]) ? 'primary' : 'brand'}
                    size='medium' 
                />
                <Text color={isCurrentRoute(paths[0]) ? 'primary' : 'brand'} size='small'>Credits</Text>
            </Box>

            <Box
                align='center'
                fill
                focusIndicator={false}
                gap='ssmall' 
                onClick={() => navigate({ to: slugify(paths[1]) })}
            >
                <FavoriteEmptyIcon
                    color={isCurrentRoute(paths[1]) ? 'primary' : 'brand'}
                    size='medium' 
                />
                <Text color={isCurrentRoute(paths[1]) ? 'primary' : 'brand'} size='small'>Wishlist</Text>
            </Box>
            
            <Box
                align='center'
                fill
                focusIndicator={false}
                gap='ssmall' 
                onClick={() => navigate({ to: slugify(paths[2]) })}
            >
                <ProfileIcon
                    color={isCurrentRoute(paths[2]) ? 'primary' : 'brand'}
                    size='medium' 
                />
                <Text color={isCurrentRoute(paths[2]) ? 'primary' : 'brand'} size='small'>Profile</Text>
            </Box>
        </Box>
    )
}

export default NavBar;