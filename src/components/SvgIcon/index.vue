<template>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
import { ref, reactive, computed, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
      default: "false"
    },
    className: {
      type: String
    }
  },
  setup(props, { root }) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="css" scoped>
</style>
