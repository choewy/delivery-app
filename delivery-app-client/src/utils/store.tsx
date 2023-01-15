import {
  atom,
  RecoilState,
  Resetter,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

export class Store<T> {
  private readonly store: RecoilState<T>;

  constructor(private readonly key: string, private readonly init: T) {
    this.store = atom({
      key: this.key,
      default: this.init,
    });
  }

  initValue() {
    return this.init;
  }

  useState(): [T, SetterOrUpdater<T>] {
    return useRecoilState(this.store);
  }

  useValue(): T {
    return useRecoilValue(this.store);
  }

  useSetState(): SetterOrUpdater<T> {
    return useSetRecoilState(this.store);
  }

  useResetState(): Resetter {
    return useResetRecoilState(this.store);
  }
}
