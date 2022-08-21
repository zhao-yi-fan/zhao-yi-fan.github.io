import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreent = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
