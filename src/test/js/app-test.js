import {expect} from 'chai';
import test from '../../main/js/app';

describe('it works', function() {
  it('it does', function() {
    expect(true).to.be.true;
  });

  it('app coverage', function() {
    expect(test()).to.equal('test');
  });
});