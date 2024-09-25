import { useContext } from 'react';
import NotAuthenticated from './not-authenticated';
import { AuthContext } from '../contexts/auth.context';

export default function GuardedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <NotAuthenticated />;
  }
  return children;
}
