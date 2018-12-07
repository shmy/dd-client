import DdLoaderr from "@/components/dd-loaderr";
import DdNoResult from "@/components/dd-no-result";
import scrollTo from "@/plugins/scrollTo";
import scrollReveal from "scrollreveal";
export default {
  data: () => ({
    loading: false,
    loaderr: false,
    noResult: false,
  }),
  components: {
    DdLoaderr,
    DdNoResult,
  },
  methods: {
    scrollToTop() {
      const container = document.querySelector('.container');
      if (container) {
        scrollTo(container, 0, 500);
      }
    },
    scrollReveal() {
      this.$nextTick(() => {
        scrollReveal().reveal(".video-item", {
          container: document.querySelector(".container"),
          reset: true,
          scale: 0.7,
          opacity: .7,
          mobile: false
        });
      });
    }
  },
}