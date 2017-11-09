import helpers from '../../../utils/helpers';
import CryptoHelpers from '../../../utils/CryptoHelpers';

class decryptMessageCtrl {
    // Set services as constructor parameter
    constructor($location, Alert, Wallet, Transactions, NetworkRequests, $filter) {
        'ngInject';

        // Declaring services
        this._location = $location;
        this._Alert = Alert;
        this._Wallet = Wallet;
        this._Transactions = Transactions;
        this._NetworkRequests = NetworkRequests;
        this._filter = $filter;

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
        this.formData.from = '';
        this.formData.message = '';

        this.common = {
            "password": "",
            "privateKey": "",
        };

        this.output = {
            "decryptedMessage": "",
        };
    }

    decrypt() {
        if (!CryptoHelpers.passwordToPrivatekeyClear(this.common, this._Wallet.currentAccount, this._Wallet.algo, true)) {
            this._Alert.invalidPassword();
            return;
        } else if (!CryptoHelpers.checkAddress(this.common.privateKey, this._Wallet.network, this._Wallet.currentAccount.address)) {
            this._Alert.invalidPassword();
            return;
        }

        this._NetworkRequests.getAccountData(helpers.getHostname(this._Wallet.node), this.formData.from).then((data) => {
            let publicKey = data.account.publicKey;
            let decrypted = this._filter('fmtHexMessage')({
                "type": 1,
                "payload": CryptoHelpers.decode(this.common.privateKey, publicKey, this.formData.message),
            });

            this.output.decryptedMessage = decrypted;
        }, (err) => {
            this._Alert.getAccountDataError(err.data.message);
            return;
        });
    }
}

export default decryptMessageCtrl;
