import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import spies from 'chai-spies';

import Component from './index';

chai.use(spies);

describe('_Component_', () => {
  it('children', () => {
    const elem = shallow(<Component><span>My button</span></Component>);
    expect(elem.contains(<span>My button</span>)).to.equal(true);
  });
});
