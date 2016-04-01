'use strict';
var should = require('should');
var tester = require('../../server/services/password.tester');

describe('Password tester', function(){
    describe('Passes', function(){
        it('Passes when 7 characters, no cap, no number', function(){
            tester.test('asdfasd').errors.length.should.be.equal(0);
        });
        
    });
    describe('Fails', function(){
        it('Fails when less than 7 characters', function(){
            var results = tester.test('asdfas');
            results.errors.length.should.be.equal(1);
            results.errors[0].should.be.equal('The password must be at least 7 characters long.');
        });


        it('Fails when blank', function(){
            var results = tester.test('');
            results.errors.length.should.be.equal(1);
            results.errors[0].should.be.equal('The password must be at least 7 characters long.');
        });

    });
});
