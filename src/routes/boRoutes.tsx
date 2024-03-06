import BoError from "components/bo/commons/BoError";
import PageAdminBanner from "pages/bo/admin/PageAdminBanner";
import PageAdminEvent from "pages/bo/admin/PageAdminEvent";
import PageAdminMain from "pages/bo/admin/PageAdminMain";
import PageAdminManager from "pages/bo/admin/PageAdminManager";
import PageAdminMember from "pages/bo/admin/PageAdminMember";
import PageAdminProduct from "pages/bo/admin/PageAdminProduct";
import PageManagerMain from "pages/bo/manager/PageManagerMain";
import PageManagerOrder from "pages/bo/manager/PageManagerOrder";
import PageManagerProduct from "pages/bo/manager/PageManagerProduct";
import PageManagerProductInsert from "pages/bo/manager/PageManagerProductInsert";

interface Route {
  path: string;
  component: React.FC;
}

const boRoutes: Route[] = [
  { path: "/error", component: BoError },
  { path: "/admin", component: PageAdminMain },
  { path: "/admin/product", component: PageAdminProduct },
  { path: "/admin/event", component: PageAdminEvent },
  { path: "/admin/banner", component: PageAdminBanner },
  { path: "/admin/member", component: PageAdminMember },
  { path: "/admin/manager", component: PageAdminManager },
  { path: "/manager", component: PageManagerMain },
  { path: "/manager/product", component: PageManagerProduct },
  { path: "/manager/order", component: PageManagerOrder },
  { path: "/manager/product/insert", component: PageManagerProductInsert },
];

export default boRoutes;
