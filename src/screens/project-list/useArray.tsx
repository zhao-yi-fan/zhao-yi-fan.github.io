import React from "react";
import { useArray, useMount } from "utils";

export function TsReactTest() {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 25 },
  ];
  const { value, add, clear, removeIndex } = useArray(persons);

  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add johon</button>
      <button onClick={() => clear()}>clear</button>
      <button onClick={() => removeIndex(0)}>0</button>
      {value.map((person, index) => {
        return (
          <div style={{ marginBottom: "30px" }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
}
