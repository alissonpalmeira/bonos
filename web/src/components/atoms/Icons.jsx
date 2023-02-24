import { Blank } from 'grommet-icons';
import { ReactComponent as FavoriteEmpty } from 'assets/images/favorite-empty.svg';
import { ReactComponent as FavoriteFilled } from 'assets/images/favorite-filled.svg';
import { ReactComponent as Giftcard } from 'assets/images/giftcard.svg';
import { ReactComponent as Profile } from 'assets/images/profile.svg';

export const FavoriteEmptyIcon = props => (
    <Blank {...props}>
        <FavoriteEmpty />
    </Blank>
);

export const FavoriteFilledIcon = props => (
    <Blank {...props}>
        <FavoriteFilled />
    </Blank>
);

export const GiftcardIcon = props => (
    <Blank {...props}>
        <Giftcard />
    </Blank>
);

export const ProfileIcon = props => (
    <Blank {...props}>
        <Profile />
    </Blank>
);
