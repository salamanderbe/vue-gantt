<style lang="scss" scoped>
</style>

<template>
    <div :style="{ width : width + 'px'}">
        <input type="text" :value="value" @input="onUpdate($event.target.value)" v-on:blur="edit = false" ref="input" class="cell" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
	props: {
		/**
		 * String value of the cell
		 * @type {String}
		 */
		value: {
			type: String,
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
			default: 300
		},

		/**
		 * String to define the placeholder of the input
		 * @default ''
		 * @type {String}
		 */
		placeholder: {
			type: String,
			default: 'Add a new task...'
		}
	},
	methods: {
		onUpdate(value) {
			this.$emit('input', value)
		}
	}
}
</script>