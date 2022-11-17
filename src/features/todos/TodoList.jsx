import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../api/todosApi';

import { useState } from 'react';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery(['todos'], getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('todos');
    },
  });
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('todos');
    },
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('todos');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">Add</button>
    </form>
  );

  const btnDeleteStyle = {
    fontSize: 12,
    width: '80px',
    marginLeft: '10px',
    padding: '4px',
    marginBottom: '10px',
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() =>
            updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
          }
        />
        <label htmlFor={todo.id}>{todo.title}</label>
        <button
          style={btnDeleteStyle}
          onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
        >
          Delete
        </button>
      </article>
    ));
  }

  return (
    <div>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </div>
  );
};

export default TodoList;
