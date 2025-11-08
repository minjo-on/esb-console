// 폼에서 입력받는 필드에 대한 유효성 검증 시 사용할 정규식
var ipAddress = /^([1-9]{0,1}[0-9]|1[013-9][0-9]|12[0-9]|2[01][0-9]|22[0-3])([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/,
	portAdress = /^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
	stringCheck = /^[a-zA-Z0-9][-_a-zA-Z0-9]{0,30}$/,
	blankCheck = /\S/,
	email = /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
	url = /(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;

// 폼에서 유효성 검증 시 유효하지 않을 경우 사용자에게 표시할 메시지
var	msgEmailText = '유효한 이메일 값을 입력해야 합니다. 예) test@example.com',
	msgUrlText = '유효한 웹 url 주소를 입력해야 합니다. 예) https://test.co.kr',
	msgStringCheckText = '알파벳과 특수문자(\'-\',\'_\')를 조합하여 만드세요.',
	msgipAddressText = 'IP 주소는 127.x.x.x를 제외한 0.0.0.0 - 223.255.255.254 사이의 값으로 정해야 합니다.',
	msgPortAddressText = '포트 값은 0 - 65535 사이로 입력해야 합니다.',
	msgBlankCheckText = '공백을 확인해 주세요.';

var vtest = Ext.define('Ext.form.field.VTypes', (function(){
    
    // 유효성 검증 내용 정의
    return {
        singleton: true,
        alternateClassName: 'Ext.form.VTypes',

        'ipAddress' : function(v){
            return ipAddress.test(v);
        },
        'ipAddressText' : msgipAddressText,
        'ipAddressMask' : /[.0-9]/,
        
        'portAdress' : function(v){
            return portAdress.test(v);
        },
        'portAdressText' : msgPortAddressText,
        'portAdressMask' : /[0-9]/,
        
        'stringCheck' : function(v){
            return stringCheck.test(v);
        },
        'stringCheckText' : msgStringCheckText,
        	
        'blankCheck' : function(v, field){
        	return blankCheck.test(field.getValue());
        },
        'blankCheckText' : msgBlankCheckText,
        	
        'email' : function(v){
            return email.test(v);
        },
        
        /**
         * @property {String} emailText
         * The error text to display when the email validation function returns false.
         * Defaults to: 'This field should be an e-mail address in the format "user@example.com"'
         */
        'emailText' : msgEmailText,
        /**
         * @property {RegExp} emailMask
         * The keystroke filter mask to be applied on email input. See the {@link #email} method for information about
         * more complex email validation. Defaults to: /[a-z0-9_\.\-@]/i
         */
        'emailMask' : /[a-z0-9_\.\-@\+]/i,

        /**
         * The function used to validate URLs
         * @param {String} value The URL
         * @return {Boolean} true if the RegExp test passed, and false if not.
         */
        'url' : function(v){
            return url.test(v);
        },
        /**
         * @property {String} urlText
         * The error text to display when the url validation function returns false.
         * Defaults to: 'This field should be a URL in the format "http:/'+'/www.example.com"'
         */
        'urlText' : msgUrlText,

        /**
         * The function used to validate alpha values
         * @param {String} value The value
         * @return {Boolean} true if the RegExp test passed, and false if not.
         */
    };
}));