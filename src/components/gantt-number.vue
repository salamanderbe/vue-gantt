<template>
    <div :style="{ width : width + 'px'}" :class="{ disabled: !editable }">
        <input ref="input" class="cell number" type="text" :value="localValue + suffix" :placeholder="placeholder" v-on:keydown="isNumber($event)" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown">
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
		 * @default ''
		 * @type {String}
		 */
		suffix: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			localValue: this.value
		}
	},
	methods: {
		onUpdate() {
			this.$emit('input', parseInt(this.localValue))
			this.$emit('update')
		},
		keyUp() {
			if (this.localValue < this.max) {
				this.localValue++
				this.onUpdate()
			}
		},
		keyDown() {
			if (this.localValue > this.min) {
				this.localValue--
				this.onUpdate()
			}
		},
		isNumber(evt) {
			evt = evt ? evt : window.event
			var charCode = evt.which ? evt.which : evt.keyCode

			if ((charCode > 95 && charCode < 106) || (charCode > 47 && charCode < 58) || charCode === 8) {
				let potential_value = 0
				if (charCode === 8) {
					evt.preventDefault()
					potential_value = this.localValue
						.toString()
						.replace(this.suffix, '')
						.slice(0, -1)
					if (parseInt(potential_value) >= this.min && parseInt(potential_value) <= this.max) {
						this.localValue = potential_value
						this.onUpdate()
					} else this.localValue = this.min
				} else {
					let potential_value = parseInt(this.localValue.toString().replace(this.suffix, '') + evt.key)
					if (potential_value > this.min && potential_value <= this.max) {
						this.localValue = potential_value
						this.onUpdate()
					} else evt.preventDefault()
				}
			} else {
				evt.preventDefault()
			}
		}
	}
}
</script>