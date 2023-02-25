import React, { useEffect, useState } from 'react';
import { AmountInputField } from 'components/atoms';
import { Box, Button, Form, FormField, Spinner, Text, TextInput } from 'grommet';
import { Checkmark, LinkPrevious } from 'grommet-icons';
import { isEqual } from 'lodash';
import { useBonos } from 'services/business';
import { useNavigate } from 'react-location';

export const WishUpsert = ({ ...rest }) => {
    const { currentWish, resetCurrentWish, upsertWish } = useBonos();
    const [ value, setValue ] = useState(currentWish);
    const [ changed, setChanged ] = useState(false);
    const [ processing, setProcessing ] = useState(false);
    const navigate = useNavigate();

    // console.log(value);

    useEffect(() => {
        setChanged(!isEqual(currentWish, value));
    }, [currentWish, value]);

    const close = () => {
        resetCurrentWish();
        navigate({ to: '..' });
    }

    const submit = async (value) => {
        if (processing) return;
        setProcessing(true);
        await upsertWish(value.amount, value.issuer);
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
                    <Box align='center' direction='row' fill='horizontal' flex={false} gap='medium' justify='between'>
                        <Box fill='horizontal'>
                            <Text size='large' weight='bold'>
                                {currentWish?.issuer ? 'Edit' : 'Add'}&nbsp;wish
                            </Text>
                        </Box>

                        <Button
                            icon={processing ? <Spinner /> : <LinkPrevious />}
                            onClick={close}
                            plain
                        />
                    </Box>

                    <Box>
                        <FormField
                            label='Issuer Address'
                            name='issuer'
                            // validate={{
                            //     regexp: /^.{0,40}$/,
                            //     message: 'error message',
                            //     status: 'error'
                            // }}
                        >
                            <TextInput disabled={processing} name='issuer' placeholder='0x0...' size='medium' />
                        </FormField>

                        <AmountInputField
                            disabled={processing}
                            focusIndicator={false}
                            label={<Text size='small'>Amount</Text>}
                            name='amount'
                            plain
                            prefix='USD'
                            size='medium'
                        />
                    </Box>

                    <Box fill='horizontal' flex={false} gap='xsmall'>
                        <Button
                            color='primary'
                            disabled={!changed || processing}
                            fill='horizontal'
                            icon={processing ? undefined : <Checkmark size='medium'/>}
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
