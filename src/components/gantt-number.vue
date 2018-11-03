<style lang="scss" scoped>
.cell.number {
	padding-right: 0;
}
</style>

<template>
    <div :style="{ width : width + 'px'}">
        <input type="number" :min="min" :max="max" :value="value" @input="onUpdate($event.target.value)" v-on:blur="edit = false" ref="input" class="cell number" :placeholder="placeholder">
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
		},

		/**
		 * Number to define the minimum value of the number
		 * @default '0'
		 * @type {Number}
		 */
		min: {
			type: Number,
			default: 1
		},

		/**
		 * Number to define the maximum value of the number
		 * @default '100'
		 * @type {Number}
		 */
		max: {
			type: Number,
			default: 100
		},

		/**
		 * String to define a suffix for the input
		 * @default '100'
		 * @type {String}
		 */
		suffix: {
			type: String,
			default: ''
		}
	},
	methods: {
		onUpdate(value) {
			this.$emit('input', parseInt(value))
			this.$emit('update')
		}
	}
}
</script>