<style lang="scss" scoped>
.cell-image {
	border-radius: 50%;
	margin: auto;
}
</style>

<template>
    <div v-if="user" :style="{ width : width + 'px'}">
        <img class="cell-image" :style="{ width: width / 2 + 'px', height: width / 2 + 'px' }" :src="modelValue[user.image]">
    </div>
</template>

<script>
export default {
	props: {
		/**
		 * Object value of the cell
		 * @type {Object}
		 */
		modelValue: {
			type: Object,
			required: false,
			default: () => {
				return {}
			}
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
			default: 40
        },
        
		/**
		 * Object to reflect the user object
		 * Or boolean to indicate no user object
		 * @default 'true | {}'
		 * @type {Boolean, Object}
		 */
		user: {
			type: [Boolean, Object],
			default: () => {
				return {
					id: 'id',
					image: 'src'
				}
			}
		}
	},
	methods: {
		onUpdate(value) {
			this.$emit('input', value)
			this.$emit('update')
		}
	}
}
</script>
