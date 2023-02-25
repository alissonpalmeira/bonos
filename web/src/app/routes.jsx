import { Account, Case, Initialize, Main } from 'components/pages';
import { Profile, Vouchers, Wishlist, WishUpsert } from 'components/organisms';
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
                        element: <Vouchers />,
                        loader:  async () => ({
                            vouchers: await Queries().getVouchers(),
                        }),
                        children: [
                            {
                                path: 'redeem',
                                // element: <WishUpsert />,
                            },
                        ]
                    },
                    {
                        path: 'wishlist',
                        element: <Wishlist />,
                        loader:  async () => ({
                            wishlist: await Queries().getWishlist(),
                        }),
                        children: [
                            {
                                path: 'add',
                                element: <WishUpsert />,
                            },
                            {
                                path: 'edit',
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
