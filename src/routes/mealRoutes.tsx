import { PageMain, PageLogin, PageFail, PageSignup, PageMypage, PageDetail, PageList } from "pages";
interface Route {
  path: string;
  component: React.FC;
}

const mealRoutes: Route[] = [
  //라우트를 여기에 정의할 수 있습니다.
  { path: "/", component: PageMain },
  { path: "/login", component: PageLogin },
  { path: "/fail", component: PageFail },
  { path: "/signup", component: PageSignup },
  { path: "/mypage", component: PageMypage },
  { path: "/detail", component: PageDetail },
  { path: "/list", component: PageList },
];

export default mealRoutes;
