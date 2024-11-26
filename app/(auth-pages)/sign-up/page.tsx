import { Metadata } from 'next';
import SignInupViewPage from '../sign-up/_components/sigin-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return <SignInupViewPage />;
}
