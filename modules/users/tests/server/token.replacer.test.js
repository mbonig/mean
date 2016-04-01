'use strict';
var should = require('should');
var tokenReplacer = require('../../server/services/token.replacer');


describe('tokenReplacer', function () {
    describe('replaces', function () {
        it('username correctly', function () {
            tokenReplacer.process('this is your username, %username%', {username: 'somename'}).should.be.equal('this is your username, somename');
        });
        it('firstname/lastname correctly', function () {
            tokenReplacer.process('welcome to screening-room, %firstname% %lastname%', {
                firstname: 'firstname',
                lastname: 'lastname'
            }).should.be.equal('welcome to screening-room, firstname lastname');

        });
        it('email correctly', function () {
            tokenReplacer.process('welcome to screening-room, %email%', {email: 'email'}).should.be.equal('welcome to screening-room, email');

        });
        it('password correctly', function () {
            tokenReplacer.process('here is your password, gross, %password%', {password: 'password'}).should.be.equal('here is your password, gross, password');

        });
    });
});
