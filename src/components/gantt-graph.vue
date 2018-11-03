<style>
</style>

<template>
    <div ref="graph" class="gantt-graph" :style="{ width: graph_width + 'px' }">

        <template v-for="(item, item_key) in items">
            <div ref="rows" class="table-row" style="position: relative;">
                <div ref="cells" class="table-cell" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
                    <div ref="marker" class="marker" @mousedown.left="handleMouseDown" :data-cell-id="key + 1" :data-row-id="item.id" :style="{ width: (cell_width * item.duration) + 'px' }" v-if="compareDate(date, item.start_date, item)">
                        <div v-if="user && item.user" class="marker-user">
                            <img :src="item.user[user.image]">
                        </div>
                        <div v-if="item.progress" class="marker-progress" :class="{ completed : item.progress > 96 }" :style="{ width: + item.progress + '%'}"></div>
                    </div>
                </div>
            </div>

            <!--             <template v-for="(item, key) in item.items">
                <div ref="rows" class="table-row" style="position: relative;">
                    <div ref="cells" class="table-cell" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
                        <div ref="marker" class="marker" @mousedown.left="handleMouseDown" :data-row-id="item.id" :style="{ width: (cell_width * item.duration) + 'px' }" v-if="compareDate(date, item.start_date, item)">
                            <div v-if="item.progress" class="marker-progress" :class="{ completed : item.progress > 96 }" :style="{ width: + item.progress + '%'}"></div>
                        </div>
                    </div>
                </div>
            </template> -->

        </template>
    </div>
</template>

<script>
export default {
	props: {
		/**
		 * Array to define the row
		 * @default []
		 * @type {Array}
		 */
		items: {
			type: Array,
			default: () => {
				return []
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
		},

		/**
		 * Number that defines the graph width
		 * @default 0
		 * @type {Number}
		 */
		graph_width: {
			type: Number,
			default: 0
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
	mounted() {
		let self = this
		this.$nextTick().then(() => {
			self.initDragable()
		})
	},
	methods: {
		/*
        | Compare 2 given dates 
        */
		compareDate(date, match_date) {
			return this.$moment(date).format('Y-M-D') === this.$moment(match_date).format('Y-M-D')
		},

		/*
        | Handle when a marker has been clicked
        */
		handleMouseDown(e) {
			e.preventDefault()
			window.marker = e.target
			window.marker.lastCoords = { x: e.clientX }
			window.marker.lastCell = window.marker.dataset.cellId
			window.marker.classList.add('selected')
		},

		/*
        | Handle when a marker is dragged
        */
		initDragable() {
			if (!this.$refs.marker) return false

			let graph = this.$refs.graph
			let cell_limit = this.dates.length

			// Handle mouse up event on
			// a marker element
			document.documentElement.onmouseup = e => {
				e.preventDefault()
				if (!window.marker) return false

				let drop_date = this.dates[window.marker.lastCell - 1]
				let row_id = window.marker.dataset.rowId
				let item = this.items.find(item => item.id === parseInt(row_id))
				window.marker.classList.remove('selected')
				item.start_date = drop_date
				window.marker = null
			}

			// Handle mouse move event on
			// a marker element
			let match_cell = 0
			let chart_offset = graph.offsetLeft
			document.documentElement.onmousemove = e => {
				e.preventDefault()
				if (!window.marker) return false

				if (window.marker.lastCoords) {
					let deltaX = e.clientX - window.marker.lastCoords.x
					let l = +window.getComputedStyle(window.marker)['left'].slice(0, -2) || 0

					window.marker.lastCoords = { x: e.clientX }

					for (let i = 1; i < cell_limit + 1; i++) {
						if (Math.floor((i * this.cell_width) / (e.clientX - chart_offset)) !== 0) {
							match_cell = i
							break
						}
					}

					if (window.marker.lastCell !== match_cell) {
						window.marker.style.left = (match_cell - 1) * this.cell_width + 'px'
						window.marker.lastCell = match_cell
					}
				}
			}
		}
	}
}
</script>
