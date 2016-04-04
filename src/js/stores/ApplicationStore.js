import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    // this.dispatcher = dispatcher
    this.pageTitle = 'Initial title'
  }
  setTitle(title) {
    this.pageTitle = title
    this.emitChange()
  }
  getPageTitle() {
    return this.pageTitle;
  }
  dehydrate() {
    console.log('dehydrate')
    return {
      pageTitle: this.pageTitle
    }
  }
  rehydrate(state) {
    this.pageTitle = state.pageTitle
  }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
  'SET_TITLE': 'setTitle'
}

export default ApplicationStore;
