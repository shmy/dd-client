import DdLoaderr from "@/components/dd-loaderr";
import DdNoResult from "@/components/dd-no-result";
import scrollTo from "@/plugins/scrollTo";
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
  },
}