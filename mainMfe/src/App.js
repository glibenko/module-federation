import React from 'react';
import Header from './Header';
const ChildMfe = React.lazy(() => import('childmfe/childmfe'));

const App = () => (
  <React.StrictMode>
    <div>
      <Header name="mainApp" />
      <div>something in main app</div>
      <React.Suspense fallback="Loading Button">
        <ChildMfe />
      </React.Suspense>
    </div>
  </React.StrictMode>
);

export default App;