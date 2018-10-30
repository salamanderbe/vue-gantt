<style lang="scss" scoped>

</style>

<template>
    <div v-on:click="editCell" :style="{ width : width + 'px'}">
        <input :class="{ editable : edit }" type="text" :value="value" @input="onUpdate($event.target.value)" v-on:blur="edit = false" ref="input" class="cell">
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
			edit: false
		}
	},
	methods: {
		onUpdate() {
			this.$emit('input', value)
		},
		editCell() {
			if (this.editable) {
				this.edit = true
				this.$nextTick(() => this.$refs.input.focus())
			}
		}
	}
}
</script>