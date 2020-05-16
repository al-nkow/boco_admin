import LoginStore from './components/LoginPage/store';
import UsersStore from './components/UsersPage/store';
import ShopsStore from './components/ShopsPage/store';
import ImportStore from './components/ImportPage/store';
import ProductsStore from './components/ProductsPage/store';
import PositionsStore from './components/PositionsPage/store';
import CategoriesStore from './components/CategoriesPage/store';
import CurrentUserStore from './components/CurrentUser/store';
import WholesaleStore from './components/Wholesale/store';

export default {
  LoginStore: LoginStore.create({}),
  UsersStore: UsersStore.create({}),
  ShopsStore: ShopsStore.create({}),
  ImportStore: ImportStore.create({}),
  ProductsStore: ProductsStore.create({}),
  PositionsStore: PositionsStore.create({}),
  CategoriesStore: CategoriesStore.create({}),
  CurrentUserStore: CurrentUserStore.create({}),
  WholesaleStore: WholesaleStore.create({}),
};
