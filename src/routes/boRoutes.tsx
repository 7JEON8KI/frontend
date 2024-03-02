import PageAdminBanner from "pages/bo/admin/PageAdminBanner";
import PageAdminEvent from "pages/bo/admin/PageAdminEvent";
import PageAdminMain from "pages/bo/admin/PageAdminMain";
import PageAdminManager from "pages/bo/admin/PageAdminManager";
import PageAdminManagerPermit from "pages/bo/admin/PageAdminManagerPermit";
import PageAdminMember from "pages/bo/admin/PageAdminMember";
import PageAdminProduct from "pages/bo/admin/PageAdminProduct";
import PageManagerMain from "pages/bo/manager/PageManagerMain";

interface Route {
  path: string;
  component: React.FC;
}

const boRoutes: Route[] = [
  { path: "/admin", component: PageAdminMain },
  { path: "/admin/product", component: PageAdminProduct },
  { path: "/admin/event", component: PageAdminEvent },
  { path: "/admin/banner", component: PageAdminBanner },
  { path: "/admin/member", component: PageAdminMember },
  { path: "/admin/manager", component: PageAdminManager },
  { path: "/admin/manager/permit", component: PageAdminManagerPermit },
  { path: "/manager", component: PageManagerMain },
];

export default boRoutes;
