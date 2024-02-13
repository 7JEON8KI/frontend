import React from "react";
import logo from "assets/images/logo.png";

const TopNav: React.FC = () => {
  return (
    <div className="mt-16 inline-flex h-[8.125rem] w-full items-center justify-start pl-[0.09375rem] pr-[1.3125rem]">
      <div className="mx-auto inline-flex flex-col items-center justify-center gap-[2.8125rem]">
        <div className="inline-flex items-start justify-center gap-[3.5rem]">
          <img src={logo} />
          <div className="relative h-[3.4375rem] w-[44rem]">
            <div className="absolute left-0 top-0 h-[3.4375rem] w-[44rem] rounded-[0.625rem] border border-black bg-white" />
            <div className="relative h-[1.5625rem] w-[1.5625rem]" />
            <input
              className="absolute left-[3.875rem] top-[0.9375rem] h-[1.604rem] w-[16.278rem] font-['Inter'] text-sm font-normal leading-[1.3125rem] text-zinc-600"
              placeholder="지금 먹고싶은 재료를 검색하세요!"
            />
          </div>
          <div className="flex h-10 w-[9.5rem] items-center justify-start gap-8">
            <div className="relative h-6 w-6" />
            <div className="relative h-6 w-6">
              <div className="absolute left-[0.40625rem] top-[1.0625rem] h-[0.0625rem] w-[0.0625rem] rounded-full border-2 border-blue-950" />
              <div className="absolute left-[1rem] top-[1.0625rem] h-[0.0625rem] w-[0.0625rem] rounded-full border-2 border-blue-950" />
            </div>
            <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40x40" />
          </div>
        </div>
        <div className="inline-flex h-[1.875rem] w-[45.3125rem] items-center justify-start gap-10">
          {["전체상품", "밀킷 추천", "오븐", "테마별", "베스트", "할인 중", "마이페이지"].map((el, idx) => {
            return idx == 0 ? (
              <div key={idx} className="flex items-center justify-start gap-2">
                <div className="relative h-[1.4375rem] w-[1.4375rem]" />
                <div className="font-['Inter'] text-xl font-bold leading-[1.875rem] text-neutral-700 hover:text-orange-500">
                  {el}
                </div>
              </div>
            ) : (
              <div
                key={idx}
                className="font-['Inter'] text-xl font-bold leading-[1.875rem] text-neutral-700 hover:text-orange-500"
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
