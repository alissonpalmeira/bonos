import { Account, Case, Main } from 'components/pages';

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
                element: <Case />,
            },
        ]
    }
];
