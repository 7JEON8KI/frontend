/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "components/commons/Footer";
import TopNav from "components/commons/TopNav";
import React from "react";

const PageMain: React.FC = () => {
  const products = [
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다~~~~~~~~~~~~........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다~~~~~~~~~~~~........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
    {
      imageUrl: "https://via.placeholder.com/400x400",
      title: "[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다~~~~~~~~~~~~........",
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    },
  ];

  return (
    <div className="size-full">
      <TopNav overlapGroupClassName="" divClassName="" />
      {/* <div className="m-auto w-[1200px] text-left font-['Inter'] text-[2.5rem] font-bold leading-[3rem] text-neutral-700">
        Best Meal
      </div>
      <div className="m-auto grid size-fit grid-cols-3 items-center justify-center gap-[0.3125rem]">
        {products.map((product, index) => (
          <div key={index} className="inline-flex items-center justify-start gap-[0.5rem]">
            <div className="inline-flex h-[40.625rem] w-[25rem] flex-col items-start justify-center">
              <img className="h-[25rem] w-[25rem]" src={product.imageUrl} alt="" />
              <div className="inline-flex h-[15.625rem] w-[25rem] flex-col items-start justify-start gap-0.5 bg-white px-1 py-4">
                <div className="h-[3.625rem] self-stretch truncate font-['Inter'] text-[1.625rem] font-semibold leading-[1.875rem] text-black">
                  {product.title}
                </div>
                <div className="h-[0.75rem] self-stretch truncate font-['Inter'] text-base font-medium leading-normal text-black">
                  {product.description}
                </div>
                <div className="inline-flex items-center justify-center gap-[4.5rem]">
                  <div className="inline-flex items-end justify-start gap-[0.15625rem] self-stretch">
                    <div className="font-['Inter'] text-[1.25rem] font-semibold leading-[0.5625rem] text-orange-500">
                      {product.discount}
                    </div>
                    <div className="flex items-start justify-start">
                      <div className="text-right font-['Inter'] text-[1.25rem] font-semibold leading-[0.5625rem] text-black">
                        {product.price}
                      </div>
                    </div>
                    <div className="font-['Inter'] text-[1.25rem] font-semibold leading-[1.875rem] text-stone-300 line-through">
                      {product.originalPrice}
                    </div>
                  </div>
                  <div className="relative h-[3.125rem] w-[3.125rem]">
                    <div className="absolute left-0 top-0 h-[3.125rem] w-[3.125rem] border border-zinc-300" />
                    <img
                      className="absolute left-0 top-0 h-[3.125rem] w-[3.125rem]"
                      src="https://via.placeholder.com/50x50"
                      alt=""
                    />
                  </div>
                </div>
                {product.soldOut && (
                  <div className="absolute left-[4.875rem] top-[38.3125rem] font-['Inter'] text-[1.125rem] font-bold leading-snug text-yellow-700">
                    일시 품절
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-auto w-[1200px] text-left font-['Inter'] text-[2.5rem] font-bold leading-[3rem] text-neutral-700">
        저녁엔 이거 어때요?
      </div>*/}
      <Footer />
    </div>
  );
};

export default PageMain;
