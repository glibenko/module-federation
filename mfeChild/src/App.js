import React from 'react';
const Header = React.lazy(() => import('mainmfe/header'));

const App = () => (
    <div>
      {/* <Header name="mainApp" /> */}
      <React.Suspense fallback="Loading Button">
        <Header name="child header" />
      </React.Suspense>
      <div>something in child mfe app</div>
    </div>
 
);

export default React.memo(App);