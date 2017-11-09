function decryptMessageConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.decryptMessage', {
            url: '/secret-messages/decrypt',
            controller: 'decryptMessageCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'modules/secretMessages/decrypt/decryptMessage.html',
            title: 'Decrypt message'
        });

};

export default decryptMessageConfig;
