type PublicUserData = {
    firstName: string;
    lastName: string | null;
    image?: string;
};

type User = {
    address: Address;
    email: string;
    phone: string;
    location?: Address;
    connectedAccounts: ConnectedAccounts;
    description?: string;
} & PublicUserData;

type SocialAccount = 'google' | 'facebook';
type ConnectedAccounts = Record<SocialAccount, boolean>;
