import PageMain from "pages/PageMain";

interface Route {
  path: string;
  component: React.FC;
}

const mealRoutes: Route[] = [
  //라우트를 여기에 정의할 수 있습니다.
  { path: "/", component: PageMain },
];

export default mealRoutes;
