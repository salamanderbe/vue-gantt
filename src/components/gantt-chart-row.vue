<style>
</style>

<template>
    <div ref="rows" class="table-row" :data-row-id="item.id">
        <div ref="cells" class="table-cell" :data-item-start="date" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
            <div class="marker" :style="{ width: (cell_width * item.duration) + 'px' }" v-if="compareDate(date, item.start_date, item)"></div>
        </div>
    </div>
</template>

<script>
import dragula from 'dragula'

export default {
	props: {
		/**
		 * Object to define the row
		 * @default {}
		 * @type {Object}
		 */
		item: {
			type: Object,
			default: () => {
				return {}
			}
		},

		/**
		 * String to define the cell dates
		 * @default []
		 * @type {Object}
		 */
		dates: {
			type: Array,
			default: () => {
				return []
			}
		},

		/**
		 * Number that defines the cell width
		 * @default 0
		 * @type {Number}
		 */
		cell_width: {
			type: Number,
			default: 0
		}
	},
	mounted() {
		// Initialize Dragula
		dragula(this.$refs.cells, {
			direction: 'horizontal',
			accepts: function(el, target, source) {
				return source.parentElement.dataset.rowId === target.parentElement.dataset.rowId
			}
		})
			// Event to trigger when a cell is starting to move
			// This event will ensure that the gant items can be moved
			// over the x-axis as fluently as possible
			.on('drag', el => {
				el.classList.add('selected')
			})

			// Event to trigger when a cell has ended to move
			// This event will ensure the cell is set to it's initial
			// State and update the gantt chart data
			.on('dragend', el => {
				el.classList.remove('selected')
			})

			// Event to trigger when a cell has been dropped
			// Emit a new event to inform the gant chart
			.on('drop', (el, target) => {
				let target_parent = target.parentElement

				this.$emit('date-updated', target_parent.dataset.rowId, target.dataset.itemStart)
			})
	},
	methods: {
		/*
        | Compare 2 given dates 
        */
		compareDate(date, match_date, item) {
			let check = this.$moment(date).format('Y-M-D') === this.$moment(match_date).format('Y-M-D')
			if (item.id === 2) {
				console.log(item)
				console.log(check)
			}
			return this.$moment(date).format('Y-M-D') === this.$moment(match_date).format('Y-M-D')
		}
	}
}
</script>
