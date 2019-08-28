import { observable } from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	rootStore;
	@observable todoBeingEdited = null;
	@observable todoFilter = ALL_TODOS;

	constructor(rootStore) {
		this.rootStore = rootStore;
	}
}