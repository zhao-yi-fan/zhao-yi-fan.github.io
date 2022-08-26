import React, { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';

export const ProjectListScreent = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client('projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers);
  });
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
