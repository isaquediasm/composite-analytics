import Composite from '../src/composite';
import { expect } from 'chai';

describe('Analytics Client', () => {
  const CompositeClient = Composite.init({ appKey: '12312321321312321' });

  it('should be exposed in the global scope', () => {
    expect(CompositeClient).to.be.a('object');
  });
});
