import { Account, Case, Main } from 'components/pages';
import { Credits, Profile, Wishlist } from 'components/organisms';

const paths = [ 'Credits', 'Wishlist', 'Profile' ]

export const routes = [
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'account',
                element: <Account />,
            },
            {
                path: 'case',
                element: <Case paths={paths} />,
                children: [
                    {
                        path: 'credits',
                        element: <Credits />,
                    },
                    {
                        path: 'wishlist',
                        element: <Wishlist />,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                ]
            },
        ]
    }
];
