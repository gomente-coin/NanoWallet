function encryptMessageConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.encryptMessage', {
            url: '/secret-messages/encrypt',
            controller: 'encryptMessageCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'modules/secretMessages/encrypt/encryptMessage.html',
            title: 'Encrypt message'
        });

};

export default encryptMessageConfig;
