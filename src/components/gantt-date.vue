<style lang="scss" scoped>

</style>

<template>
    <div v-on:click="editCell" :style="{ width : width + 'px'}">
        <flat-pickr  ref="input" v-model="value" :config="config"></flat-pickr>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
	components: { flatPickr },
	props: {
		/**
		 * String value of the cell
		 * @type {String}
		 */
		value: {
			type: String,
			required: true
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
		}
	},
	data() {
		return {
			edit: false,
			config: {
                altInputClass: 'cell',
				altInput: true,
				altFormat: 'D m',
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