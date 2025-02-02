import LoadingPage from 'components/LoadingPage';
import { Redirect, RedirectProps } from 'expo-router';
import { responseIsOk } from 'helpers/request';
import useApp from 'hooks/useApp';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';

interface Props {
  children: React.ReactNode;
  redirect: RedirectProps['href'];
  validateOpen: boolean;
}

export default function ValidateSession({
  children,
  redirect,
  validateOpen
}: Props): React.JSX.Element {
  const { user, onChangeUser } = useApp();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    setLoading(true);
    const userService = new UserService();
    userService.setAutoRedirect(false);
    const response = await userService.getUser();
    if (!responseIsOk(response.success, response.data)) {
      onChangeUser(null);
      setLoading(false);
      return;
    }
    onChangeUser(response.data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  if (!loading && validateOpen && user === null) {
    return <Redirect href={redirect} />;
  }

  if (!loading && !validateOpen && user !== null) {
    return <Redirect href={redirect} />;
  }

  return <LoadingPage loading={loading}>{children}</LoadingPage>;
}
