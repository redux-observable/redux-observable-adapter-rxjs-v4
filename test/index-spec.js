/* globals describe it */
import 'babel-polyfill';
import { expect } from 'chai';
import { spy } from 'sinon';
import RxV5 from 'rxjs';
import RxV4 from 'rx';
import adapter, { ActionsObservableV4 } from '../';

describe('adapter', () => {
  it('should convert input to v4', () => {
    const v5 = RxV5.Observable.of(1, 2, 3);
    const v4 = adapter.input(v5);

    const next = spy();
    v4.toArray().subscribe(next);

    expect(v4).to.be.an.instanceof(RxV4.Observable);
    expect(v4.flatMapLatest).to.be.a('function');
    expect(next.calledOnce).to.be.true;
    expect(next.args[0]).to.deep.equal([[1, 2, 3]]);
  });

  it('should convert output to v5', () => {
    const v4 = RxV4.Observable.of(1, 2, 3);
    const v5 = adapter.output(v4);

    const next = spy();
    v5.toArray().subscribe(next);

    expect(v5).to.be.an.instanceof(RxV5.Observable);
    expect(v5.flatMapLatest).to.be.undefined;
    expect(next.calledOnce).to.be.true;
    expect(next.args[0]).to.deep.equal([[1, 2, 3]]);
  });
});

describe('ActionsObservableV4', () => {
  it('should support ofType operator', () => {
    const input$ = new RxV5.Observable.of({ type: 'A' }, { type: 'B' }, { type: 'A' });
    const action$ = new ActionsObservableV4(input$);

    const next = spy();
    action$.ofType('A').subscribe(next);

    expect(action$).to.be.an.instanceof(RxV4.ObservableBase);
    expect(next.calledTwice).to.be.true;
    expect(next.args).to.deep.equal([
      [{ type: 'A' }],
      [{ type: 'A' }]
    ]);
  });
});
