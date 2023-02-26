import React, { Suspense, lazy } from 'react';
import { Queries } from 'services/data';

const Account = lazy(() => import('components/pages/Account'));
const Case = lazy(() => import('components/pages/Case'));
const Initialize = lazy(() => import('components/pages/Initialize'));
const Main = lazy(() => import('components/pages/Main'));

const Credits = lazy(() => import('components/organisms/Credits'));
const CreditRedeem = lazy(() => import('components/organisms/CreditRedeem'));
const Profile = lazy(() => import('components/organisms/Profile'));
const Wishlist = lazy(() => import('components/organisms/Wishlist'));
const WishUpsert = lazy(() => import('components/organisms/WishUpsert'));

const paths = [ 'Credits', 'Wishlist', 'Profile' ]

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
                        children: [
                            {
                                path: 'redeem',
                                element: <CreditRedeem />,
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
