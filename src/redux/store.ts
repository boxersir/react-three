/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 19:56:57
 * @Description: file content
 */
// 引入api，creatStore用于创建store对象
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import allReducers from './reducers/index'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const persistedState = localStorage.getItem('counterState') 
  ? JSON.parse(localStorage.getItem('counterState')||'')
    : 0;
console.log(persistedState, 'persistedState');

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
if (persistedState) {
    store.dispatch({type:'count/shares',data:persistedState.count})   
  }
store.subscribe(() => {
    const state = store.getState();
    console.log(state,'当前state');
    
  localStorage.setItem('counterState', JSON.stringify(state));
});
 
export default store
