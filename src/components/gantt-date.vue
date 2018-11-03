<style lang="scss" scoped>
</style>

<template>
    <div :style="{ width : width + 'px'}" :class="{ flash : flash }">
        <flat-pickr @on-change="onUpdate" :placeholder="placeholder" :value="value" :config="config"></flat-pickr>
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
		},

		/**
		 * String to define the minimum date
		 * @default ''
		 * @type {String}
		 */
		minDate: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			edit: false,
			flash: false,
			config: {
				altInputClass: 'cell',
				altInput: true,
				altFormat: 'd M',
				dateFormat: 'Y-m-d H:i',
				minDate: ''
			}
		}
	},
	methods: {
		onUpdate(selectedDates, dateStr, instance) {
			this.$emit('input', dateStr)
			this.$emit('update')
		}
	},
	watch: {
		minDate: function() {
			this.config.minDate = this.minDate
		},

		value: function() {
			this.flash = true
			setTimeout(() => {
				this.flash = false
			}, 5000)
		}
	}
}
</script>