interface ScrollToTopProps {
  smooth?: boolean;
}

const scrollToTop = ({ smooth }: ScrollToTopProps) => {
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
};

export default scrollToTop;
