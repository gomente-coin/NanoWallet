import helpers from '../../../utils/helpers';
import CryptoHelpers from '../../../utils/CryptoHelpers';

class encryptMessageCtrl {
    // Set services as constructor parameter
    constructor($location, Alert, Wallet, Transactions, NetworkRequests) {
        'ngInject';

        // Declaring services
        this._location = $location;
        this._Alert = Alert;
        this._Wallet = Wallet;
        this._Transactions = Transactions;
        this._NetworkRequests = NetworkRequests;

        // If no wallet show alert and redirect to home
        if (!this._Wallet.current) {
            this._Alert.noWalletLoaded();
            this._location.path('/');
            return;
        }

        /**
         * Default simple transfer properties
         */
        this.formData = {}
        this.formData.to = '';
        this.formData.message = '';

        this.common = {
            "password": "",
            "privateKey": "",
        };

        this.output = {
            "encryptedMessage": "",
        };
    }

    encrypt() {
        if (!CryptoHelpers.passwordToPrivatekeyClear(this.common, this._Wallet.currentAccount, this._Wallet.algo, true)) {
            this._Alert.invalidPassword();
            return;
        } else if (!CryptoHelpers.checkAddress(this.common.privateKey, this._Wallet.network, this._Wallet.currentAccount.address)) {
            this._Alert.invalidPassword();
            return;
        }

        this._NetworkRequests.getAccountData(helpers.getHostname(this._Wallet.node), this.formData.to).then((data) => {
            let publicKey = data.account.publicKey;
            let encrypted = CryptoHelpers.encode(this.common.privateKey, publicKey, this.formData.message);

            this.output.encryptedMessage = encrypted;
        }, (err) => {
            this._Alert.getAccountDataError(err.data.message);
            return;
        });
    }
}

export default encryptMessageCtrl;
