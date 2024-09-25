import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../layout/navbar';

export function Root() {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: '10px' }}>
        <Outlet />
      </div>
    </>
  );
}
