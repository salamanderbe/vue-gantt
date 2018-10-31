<style lang="scss" scoped>
</style>

<template>
    <div :style="{ width : width + 'px'}">
        <input type="number" :value="value" @input="onUpdate($event.target.value)" v-on:blur="edit = false" ref="input" class="cell" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
	props: {
		/**
		 * Number value of the cell
		 * @type {Number}
		 */
		value: {
			type: Number,
			required: false
		},

		/**
		 * Boolean to determine if the cell can be edited
		 * @type {Boolean}
		 */
		editable: {
			type: Boolean,
			default: true,
			required: false
		},

		/**
		 * Number to define the width
		 * @default {}
		 * @type {Number}
		 */
		width: {
			type: Number,
			default: 95
		},

		/**
		 * String to define the placeholder of the input
		 * @default '0'
		 * @type {String}
		 */
		placeholder: {
			type: String,
			default: '0'
		}
	},
	methods: {
		onUpdate(value) {
			this.$emit('input', value)
		}
	}
}
</script>