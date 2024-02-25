import {
  PageMain,
  PageLogin,
  PageFail,
  PageSignup,
  PageMypage,
  PageDetail,
  PageList,
  PageTheme,
  PageBest,
  PageDiscount,
} from "pages/mealkeat";
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
  { path: "/theme", component: PageTheme },
  { path: "/best", component: PageBest },
  { path: "/discount", component: PageDiscount },
];

export default mealRoutes;
