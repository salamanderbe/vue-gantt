<template>
    <div ref="rows" class="graph-row" style="position: relative;">
        <div ref="cells" class="table-cell" :class="{ weekend: isWeekend(date.date), 'hidden-date' : !date.shown }" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
            <div ref="marker" class="marker" v-if="compareDate(date.date, item.start_date, item)" :data-cell-id="key + 1" :data-row-id="item.id" :data-parent-id="item.parentId" :class="{ parent : item.isParent }" :style="{ width: (cell_width * item.duration) + 'px' }" @mousedown.left="handleMouseDown">

                <div v-if="user && item.user && !item.isParent" class="marker-user">
                    <img :src="item.user[user.image]">
                </div>

                <div v-if="item.progress" class="marker-progress" :class="{ completed : item.progress > 96 }" :style="{ width: + item.progress + '%'}"></div>

            </div>

        </div>
    </div>
</template>

<script>
import moment from 'moment'

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
		},

		/**
		 * Boolean defines if the task is opened
		 * @default true
		 * @type {Boolean}
		 */
		open: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		/*
        | Compare 2 given dates 
        */
		compareDate(date, match_date) {
			return moment(date).format('Y-M-D') === moment(match_date).format('Y-M-D')
		},

		/*
        | Compare 2 given dates 
        */
		isWeekend(date) {
            let day = new Date(date).getDay()
			return day === 6 || day === 0
		},

		/*
        | Handle when a marker has been clicked
        */
		handleMouseDown(e) {
			e.preventDefault()
			if (!this.open) {
				let self = this
				this.$emit('open')
				this.$nextTick().then(() => {
					self.handleMouseDown(e)
				})
			}

			window.markers = []

			// Create a marker object
			// And add it to our marker list
			let target = e.target
			let offset = target.offsetLeft
			let marker = this.createMarker(target, e, offset)
			marker.recursive = false
			window.markers.push(marker)

			// Get all assicated marker childs
			// And add them to the marker list
			let elements = document.querySelectorAll('[data-parent-id="' + this.item.id + '"]')
			elements.forEach(el => {
				marker = this.createMarker(el, e, offset)
				window.markers.push(marker)
			})
		},

		/*
        | Create a marker element,
        | and add it's current x position
        */
		createMarker(el, e, offset) {
			let marker = el
			marker.lastCell = marker.dataset.cellId
			marker.parentId = marker.dataset.parentId
			marker.offset = marker.offsetLeft - offset
			marker.recursive = true
			marker.classList.add('selected')

			return marker
		}
	}
}
</script>
