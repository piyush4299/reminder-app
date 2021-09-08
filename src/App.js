import './App.css';
import React, { Suspense } from 'react';

const LazyHeader = React.lazy(() => import('./components/headerComponent/Header'));
const LazyAddTodo = React.lazy(() => import('./components/addTodoComponent/AddTodo'));
const LazyTodoList = React.lazy(() => import('./components/todoListComponent/TodoList'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading.......</div>}>
        <section>
          <LazyHeader />
          <LazyAddTodo />
          <LazyTodoList />
        </section>
      </Suspense>
    </div>
  );
}

export default App;
