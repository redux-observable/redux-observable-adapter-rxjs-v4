import { toV4, toV5 } from 'rxjs-compatibility';
import RxV4 from 'rx';

export class ActionsObservableV4 extends RxV4.ObservableBase {
  constructor(source) {
    super();
    this.source = toV4(source, RxV4.Observable);
  }

  subscribeCore(observer) {
    return this.source.subscribe(observer);
  }

  ofType(...keys) {
    return this.filter(action => {
      const type = action.type;
      const len = keys.length;

      if (len === 1) {
        return type === keys[0];
      } else {
        for (let i = 0; i < len; i++) {
          if (keys[i] === type) {
            return true;
          }
        }
      }
      return false;
    });
  }
}

export default {
  input: input$ => new ActionsObservableV4(input$),
  output: toV5
};
