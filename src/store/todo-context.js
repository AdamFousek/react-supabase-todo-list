import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

const getUser = () => {
  const user = supabase.auth.user();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return user;
}

export const TodoContext = React.createContext({
  todos: [],
  selectedTodo: {},
  addTodo: (todoData) => { },
  removeTodo: (id) => { },
  fetchTodo: () => { },
  toggleTodo: (id) => { },
  fetchTodoById: (id) => { }
})

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState();
  const [selectedTodo, setSelectedTodo] = useState();

  const addTodoHandler = async (todoData) => {
    if (todoData.task.trim().length === 0) {
      throw new Error('Task must not be empty!');
    }

    if (todoData.dueDate.trim().length === 0) {
      throw new Error('Due date must not be empty!');
    }

    const insertedTodo = {
      is_complete: false,
      task: todoData.task,
      due_date: new Date(todoData.dueDate),
      user_id: todoData.userId,
      inserted_at: new Date()
    };

    const { error } = await supabase
      .from('todos')
      .insert([insertedTodo], {
        returning: 'minimal', // Don't return the value after inserting
      });

    if (error) {
      throw error;
    }

    await fetchTodoHandler();
  }

  const removeTodoHandler = async (id) => {
    const user = getUser();
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('user_id', user.id)
      .eq('id', id);

    if (error) {
      throw error;
    }

    await fetchTodoHandler();
  }

  const fetchTodoHandler = async () => {
    const user = getUser();
    let { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true });

    if (error) {
      throw error;
    }

    setTodos(todos);
  }

  const toggleTodoHandler = async (id, is_complete) => {
    const user = getUser();
    const { error } = await supabase
      .from('todos')
      .update({ is_complete }, {
        returning: 'minimal', // Don't return the value after update
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    await fetchTodoHandler();
  }

  const fetchTodoByIdHandler = async (id) => {
    const user = getUser();
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()
    if (error) {
      throw error;
    }

    setSelectedTodo(data);
  }

  const contextValue = {
    todos: todos,
    selectedTodo: selectedTodo,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    fetchTodo: fetchTodoHandler,
    toggleTodo: toggleTodoHandler,
    fetchTodoById: fetchTodoByIdHandler
  };
  return <TodoContext.Provider value={contextValue}>
    {props.children}
  </TodoContext.Provider>
}

export default TodoContextProvider;