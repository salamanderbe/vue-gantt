<template>
    <div :style="{ width : width + 'px'}">
        <input ref="input" class="cell" type="text" :value="modelValue" :placeholder="placeholder" @update:modelValue="$event">
    </div>
</template>

<script>
export default {
	props: {
		/**
		 * String value of the cell
		 * @type {String}
		 */
		modelValue: {
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
	}
}
</script>
