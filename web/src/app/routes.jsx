import { Account, Case, Initialize, Main } from 'components/pages';
import { Credits, Profile, Wishlist, WishUpsert } from 'components/organisms';
import { Queries } from 'services/data';

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
                path: 'initialize',
                element: <Initialize />,
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
                        loader:  async () => ({
                            wishlist: await Queries().getWishlist(),
                        }),
                        children: [
                            {
                                path: 'insert',
                                element: <WishUpsert />,
                            },
                            {
                                path: 'update',
                                element: <WishUpsert />,
                            },
                        ]
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
