import BaseStore from 'fluxible/addons/BaseStore';
import RouteStore from './RouteStore';

class ApplicationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.pageTitle = '';
  }
  handleRouteChange(currentRoute) {
    this.dispatcher.waitFor(RouteStore, () => {
      console.log('app store')
    });
  }
  getPageTitle() {
    return this.pageTitle;
  }
  dehydrate() {
    return {
      pageTitle: this.pageTitle
    };
  }
  rehydrate(state) {
    this.pageTitle = state.pageTitle;
  }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
  'UPDATE_ROUTE': 'handleRouteChange'
}

export default ApplicationStore;
