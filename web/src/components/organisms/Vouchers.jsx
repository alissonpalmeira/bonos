import React, { useRef } from 'react';
import { Box, Layer, Text } from 'grommet';
import { MatchRoute, Outlet, useMatch, useNavigate } from 'react-location';
import { TitleBar, VoucherCard } from 'components/molecules';
import { useBonos } from 'services/business';

export const Vouchers = () => {
    const { setCurrentVoucher, resetCurrentVoucher } = useBonos();
    const { data: { vouchers } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    console.log(vouchers);

    const closeVoucher = () => {
        resetCurrentVoucher();
        navigate({ to: '.' });
    }

    const redeemVoucher = (amount, issuer) => {
        setCurrentVoucher(parseInt(amount)*100, issuer);
        navigate({ to: 'redeem' });
    }

    const renderVoucher = () => {
        return (
            <Layer
                animation='fadeIn'
                full
                onClickOutside={closeVoucher}
                onEsc={closeVoucher}
                responsive={false}
                target={ref.current}
            >
                <Outlet />
            </Layer>
        )
    }

    return(
        <Box fill gap='small' ref={ref}>
            <TitleBar
                title='My Vouchers'
            />

            { Object.keys(vouchers).length === 0 ?
                <Box align='center' fill gap='small' justify='center'>
                    <Text size='medium' textAlign='center'>No credits earned yet...</Text>
                    <Text size='medium' textAlign='center'>Try adding some wishes to your wishlist</Text>
                </Box>
            :
                <Box fill gap='xsmall' overflow={{vertical: 'auto'}}>
                    { Object.entries(vouchers).map(([key, value]) => (
                        <VoucherCard 
                            key={key}
                            info={{ alias: key }}
                            amount={parseInt(value)*100}
                            onEdit={() => redeemVoucher(value, key)}
                            onShow={() => redeemVoucher(value, key)}
                        />
                    ))}
                </Box>
            }

            <MatchRoute to='redeem'>
                { renderVoucher() }
            </MatchRoute>
        </Box>
    )
}
