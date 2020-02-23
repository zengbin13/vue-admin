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
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.25em;
    fill: currentColor;
    color: rgb(255, 255, 255);
    overflow: hidden;
    padding-right: 0.5em;
  }
</style>
