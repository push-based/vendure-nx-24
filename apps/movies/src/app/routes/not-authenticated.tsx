import { Link } from 'react-router-dom';

export default function NotAuthenticated() {
  return (
    <>
      <div>Not authenticated</div>
      <Link to="/">Go home</Link>
    </>
  );
}
