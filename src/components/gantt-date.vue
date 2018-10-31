<style lang="scss" scoped>
</style>

<template>
    <div v-on:click="editCell" :style="{ width : width + 'px'}">
        <flat-pickr ref="input" :placeholder="placeholder" v-model="value" :config="config"></flat-pickr>
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
			default: '01 Jan'
		}
	},
	data() {
		return {
			edit: false,
			config: {
				altInputClass: 'cell',
				altInput: true,
				altFormat: 'd M',
				dateFormat: 'Y-m-d'
			}
		}
	},
	methods: {
		onUpdate() {
			this.$emit('input', value)
		},
		editCell() {
			if (this.editable) {
				this.edit = true
				//this.$nextTick(() => this.$refs.input.focus())
			}
		}
	}
}
</script>