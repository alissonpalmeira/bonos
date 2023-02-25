import React, { useEffect, useState } from 'react';
import { AmountInputField } from 'components/atoms';
import { Box, Button, Form, Spinner, Text } from 'grommet';
import { Credit, TitleBar } from 'components/molecules';
import { Checkmark, LinkPrevious } from 'grommet-icons';
import { isEqual } from 'lodash';
import { useBonos } from 'services/business';
import { useNavigate } from 'react-location';

export const CreditRedeem = ({ ...rest }) => {
    const { currentCredit, resetCurrentCredit, redeemCredit } = useBonos();
    const [ value, setValue ] = useState({ ...currentCredit, amount: 0 });
    const [ balance, setBalance ] = useState(currentCredit.amount);
    const [ changed, setChanged ] = useState(false);
    const [ processing, setProcessing ] = useState(false);
    const navigate = useNavigate();

    // console.log(currentCredit.amount, value.amount*100, balance);

    useEffect(() => {
        setChanged(!isEqual(currentCredit, value));
        let _balance = parseInt(currentCredit.amount) - value.amount*100;
        setBalance(_balance < 0 ? 0 : _balance);
    }, [currentCredit, value]);

    const close = () => {
        resetCurrentCredit();
        navigate({ to: '..' });
    }

    const submit = async (value) => {
        if (processing) return;
        setProcessing(true);
        await redeemCredit(value.amount, value.issuer);
        close();
    }

    return (
        <Box fill {...rest}>
            <Form
                onChange={(newValue) => setValue(newValue)}
                onSubmit={({value}) => submit(value)}
                value={value}
            >
                <Box gap='small'>
                    <TitleBar
                        title='Redeem Credit'
                        icon={processing ? <Spinner /> : <LinkPrevious />}
                        onClick={close}
                    />

                    <Credit 
                        info={{ alias: currentCredit.issuer }}
                        amount={balance}
                    />

                    <AmountInputField
                        disabled={processing}
                        focusIndicator={false}
                        label={<Text size='small'>Amount</Text>}
                        name='amount'
                        plain
                        prefix='USD'
                        size='medium'
                    />

                    <Box fill='horizontal' flex={false} gap='xsmall'>
                        <Button
                            color='primary'
                            disabled={!changed || processing || !value.amount || value.amount*100 > parseInt(currentCredit.amount)}
                            fill='horizontal'
                            icon={<Checkmark size='medium'/>}
                            label='Confirm'
                            primary
                            size='small'
                            type='submit'
                        />
                    </Box>          
                </Box>
            </Form>
        </Box>
    )
}
