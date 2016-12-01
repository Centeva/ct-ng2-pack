/* tslint:disable:no-unused-variable */

import {
  async, inject
} from '@angular/core/testing';
import { IsEmpty } from './isEmpty.pipe';

describe('Pipe: isEmpty', () => {
  it('create an instance', () => {
    let pipe = new IsEmpty();
    expect(pipe).toBeTruthy();
  });
});
