import React from 'react';
import { Account, Case, Initialize, Main, TestWarning } from 'components/pages';
import { Credits, CreditRedeem, Profile, Wishlist, WishUpsert } from 'components/organisms';
import { Queries } from 'services/data';

const paths = [ ['Credits', 'Redeem'], ['Wishlist', 'Add-Wish', 'Edit-Wish'], ['Profile'] ]

export const routes = [
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'account',
                element: <Account />
            },
            {
                path: 'warning',
                element: <TestWarning />,
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
                        loader:  async () => ({
                            credits: await Queries().getCredits(),
                        }),
                    },
                    {
                        path: 'wishlist',
                        element: <Wishlist />,
                        loader:  async () => ({
                            wishlist: await Queries().getWishlist(),
                        }),
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                        loader:  async () => ({
                            availableBalance: await Queries().getAvailableBalance(),
                        }),
                    },
                    {
                        path: 'add-wish',
                        element: <WishUpsert />,
                    },
                    {
                        path: 'edit-wish',
                        element: <WishUpsert />,
                    },
                    {
                        path: 'redeem',
                        element: <CreditRedeem />,
                    },
                ]
            },
        ]
    }
];
