import { combineReducers } from 'redux';
import ListPageReducer from './ListPageReducer'
import DetailPageReducer from './DetailPageReducer'

const rootReducers = combineReducers({ListPageReducer, DetailPageReducer})
export default rootReducers;
