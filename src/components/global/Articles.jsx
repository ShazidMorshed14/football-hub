import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

function Atricles() {
  const { ref, inView } = useInView();
  const [randomValue, setRandomValue] = useState("some");

  const fetchTodos = async ({ pageParam, randomValue }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&randomValue=${randomValue}`
    );
    return res.json();
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos", randomValue],
    queryFn: ({ pageParam = 1 }) => fetchTodos({ pageParam, randomValue }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  //console.log(data);

  const content = data?.pages.map((todos) =>
    todos.map((todo, index) => {
      if (todos.length === index + 1) {
        return <TodoCard innerRef={ref} key={todo.id} todo={todo} />;
      }
      return <TodoCard key={todo.id} todo={todo} />;
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      //console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="app">
      {content}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </div>
  );
}

export default Atricles;
