import { FC } from 'react';
import { Screens } from '@/screens';
import { RecoilRoot } from 'recoil';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Screens />
    </RecoilRoot>
  );
};

export default App;
