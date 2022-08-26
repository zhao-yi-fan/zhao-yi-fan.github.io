import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { useHttp } from 'utils/http';
import { User } from 'screens/project-list/search-panel';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();
  useMount(() => {
    run(client('users'));
  });
  return result;
};
