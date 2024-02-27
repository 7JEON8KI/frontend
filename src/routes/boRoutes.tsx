import PageAdminMain from "pages/bo/admin/PageAdminMain";
import PageManagerMain from "pages/bo/manager/PageManagerMain";

interface Route {
  path: string;
  component: React.FC;
}

const boRoutes: Route[] = [
  { path: "/admin", component: PageAdminMain },
  { path: "/manager", component: PageManagerMain },
];

export default boRoutes;
