import angular from 'angular';

// Create the module where our functionality can attach to
let encryptMessageModule = angular.module('app.encryptMessage', []);

// Include our UI-Router config settings
import encryptMessageConfig from './encrypt/encryptMessage.config';
encryptMessageModule.config(encryptMessageConfig);

// Controllers
import encryptMessageCtrl from './encrypt/encryptMessage.controller';
encryptMessageModule.controller('encryptMessageCtrl', encryptMessageCtrl);

// Create the module where our functionality can attach to
let decryptMessageModule = angular.module('app.decryptMessage', []);

// Include our UI-Router config settings
import decryptMessageConfig from './decrypt/decryptMessage.config';
decryptMessageModule.config(decryptMessageConfig);

// Controllers
import decryptMessageCtrl from './decrypt/decryptMessage.controller';
decryptMessageModule.controller('decryptMessageCtrl', decryptMessageCtrl);

export default encryptMessageModule;
