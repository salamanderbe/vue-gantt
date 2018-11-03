<style lang="scss" scoped>
.gantt-message-overlay {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
	display: flex;
    cursor: pointer;
    z-index: 1;

	.gantt-message-message {
		width: 300px;
		height: auto;
		background: #fff;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		margin: auto;
		padding: 15px;
		color: #464957;
		.title {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 5px;
		}
		.description {
			font-size: 13px;
		}
	}
}
</style>

<template>
    <div class="gantt-message-overlay" @click="close">
        <div class="gantt-message-message" @click.stop>
            <div class="title">{{ title }}</div>
            <div class="description">{{ description }}</div>
        </div>
    </div>
</template>


<script>
export default {
	props: {
		/**
		 * String value of the message
		 * @type {String}
		 */
		message: {
			type: String,
			required: false
		},

		/**
		 * String value of the message type
		 * @type {String}
		 */
		type: {
			type: String,
			required: false
		}
	},
	methods: {
		close() {
			this.$emit('close')
		}
	},
	computed: {
		title() {
			if (this.type === 'missing_required_fields') return 'Missing required fields'
		},
		description() {
			if (this.type === 'missing_required_fields') return 'The start_date, end_date and duration field are required and should bre provided als props of the gantt component'
		}
	}
}
</script>
