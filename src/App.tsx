import React from 'react';
import DefaultLayout from './components/DefaultLayout';
import NewsLayout from './components/NewsLayout';

export default function App() {
  return <div>{false ? <DefaultLayout /> : <NewsLayout />}</div>;
}
