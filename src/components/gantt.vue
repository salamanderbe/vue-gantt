<style lang="scss">
$font-size: 14px;
$spacing: 15px;
$markerColor: #f4435a;
$textColor: #464957;
$cellHeight: 30px;
$markerHeight: 18px;

// Gantt tobar
.gantt-topbar {
	display: flex;
	color: $textColor;

	.gantt-actions {
		display: flex;
		margin: auto 0 auto auto;

		.flatpickr-input {
			padding: 6.5px;
			margin-left: 10px;
			width: 100px;
			text-align: center;
			border: 1px solid #efefef;
		}
		.prev,
		.next {
			width: $cellHeight;
			display: flex;
			background: #fff;
			font-size: 12px;
			line-height: $cellHeight;
			border: 1px solid #efefef;
			margin-left: 10px;
			cursor: pointer;
			transition: background 0.1s;
			&:hover {
				background: #f4f4f4;
			}
			svg {
				margin: auto;
			}
		}
	}
}
// Gantt chart
.gantt-chart {
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	font-size: $font-size;
	position: relative;
	color: $textColor;

	// Header section
	// Gantt header
	.gantt-header {
		display: flex;
		height: 40px;
		border-bottom: 1px solid #f4f4f4;

		// Gantt table section
		.gantt-table {
			height: 100%;

			.table-cell {
				&.sortable {
					cursor: pointer;
					&:hover {
						font-weight: 600;
					}
				}
			}
		}

		// Gantt chart section
		.gantt-graph {
			height: 100%;

			.table-cell {
				text-align: center;
				padding: 0;
				.day {
					font-size: 12px;
					margin-right: 5px;
				}
				.month {
					font-size: 10px;
				}
			}
		}

		// Table cell
		.table-cell {
			line-height: 40px;
			padding: 0 10px;
			user-select: none;
		}
	}

	// Content section
	// Gantt content
	.gantt-content {
		display: flex;
		position: relative;

		// Gantt table section
		.gantt-table {
			flex: none;

			.table-cell {
				transition: background 0.1s;
				&:hover {
					background: #f4f4f4;
				}
			}
		}

		// Gantt chart section
		.gantt-graph {
			background: #f4f4f4;
			width: 100%;
			flex-wrap: wrap;
			overflow: hidden;
		}

		.table-row {
			display: flex;
			height: $cellHeight;
			line-height: $cellHeight;
			width: 100%;

			.table-cell {
				height: 100%;
				flex: none;
				transition: background 0.3s;
				display: flex;
				&.flash {
					background: rgba($markerColor, 0.1);
				}

				.marker {
					height: $markerHeight;
					width: 100%;
					background: $markerColor;
					border-radius: 15px;
					margin-top: ($cellHeight - $markerHeight) / 2;
					cursor: pointer;
					position: absolute;

					.marker-user,
					.marker-progress {
						pointer-events: none;
					}

					.marker-user {
						position: absolute;
						left: 1px;
						top: 1px;
						width: $markerHeight - 2px;
						height: $markerHeight - 2px;
						z-index: 1;
						display: flex;
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.marker-progress {
						height: 100%;
						display: block;
						background: rgb(255, 124, 141);
						border-radius: 15px 0 0 15px;
						position: absolute;
						left: 0;
						top: 0;

						&.completed {
							border-radius: 15px;
						}
					}

					&:hover {
						background: rgba($markerColor, 0.8);
					}

					&.selected {
						pointer-events: none;
					}
				}
			}
		}
	}

	// Header & Content section
	// Gantt table section
	.gantt-table {
		display: flex;
		flex-wrap: wrap;
		font-size: $font-size;
		width: 50%;
	}
	.gantt-graph {
		display: flex;
	}
}
</style>

<template>
    <div>

        <!-- Gant Topbar -->
        <div class="gantt-topbar">
            <div class="gantt-title" v-html="title"></div>
            <div class="gantt-actions">
                <div class="prev" @click="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </div>
                <flat-pickr ref="input" v-model="localStartDate"></flat-pickr>
                <flat-pickr ref="input" v-model="localEndDate"></flat-pickr>
                <div class="next" @click="next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Gant Chart -->
        <div class="gantt-chart" ref="gantt">

            <!-- Gant Message -->
            <gantt-message v-if="message.show" :type="message.type" :message="message.text" @close="message.show = false"></gantt-message>

            <!-- Gant Header -->
            <div class="gantt-header">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">
                    <div class="table-cell" :class="{ sortable : !!field.sort }" :style="{ width: field.width + 'px' }" v-for="(field, slug) in fields" :key="slug" @click="sortBy = slug">{{ field.label }}</div>
                </div>

                <!-- Gantt graph section -->
                <div class="gantt-graph" :style="{ width: graph_width + 'px' }">
                    <div class="table-cell" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
                        <span class="day">{{ date | moment('D') }}</span>
                        <span class="month">{{ date | moment('MMM') }}</span>
                    </div>
                </div>

            </div>

            <!-- Gant content -->
            <div class="gantt-content">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">

                    <!-- Gantt table row -->
                    <template v-for="(item, key) in localItems">
                        <div class="table-row" :key="item.id">
                            <template v-if="fields.hasOwnProperty(field)" v-for="(field, slug) in Object.keys(item)">
                                <gantt-user v-if="fields[field].component === 'gantt-user'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" :user="user"></gantt-user>
                                <gantt-text v-if="fields[field].component === 'gantt-text'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" @update="cellUpdated(fields[field].callback, item)"></gantt-text>
                                <gantt-date v-if="fields[field].component === 'gantt-date'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" :minDate="item[fields[field].minDate]" @update="cellUpdated(fields[field].callback, item)"></gantt-date>
                                <gantt-number v-if="fields[field].component === 'gantt-number'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" :min="fields[field].min" :max="fields[field].max" :suffix="fields[field].suffix" @update="cellUpdated(fields[field].callback, item)"></gantt-number>
                            </template>
                        </div>
                        <!--                         <template v-for="i in levels - 1">
                            <template v-for="(item, key) in item.items">
                                <div class="table-row" :style="{ 'padding-left' : i * 15 + 'px' }" :key="item.id">
                                    <template v-if="fields.hasOwnProperty(field)" v-for="(field, slug) in Object.keys(item)">
                                        <gantt-user v-if="fields[field].component === 'gantt-user'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width"></gantt-user>
                                        <gantt-text v-if="fields[field].component === 'gantt-text'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width - i * 15" @update="cellUpdated(fields[field].callback, item)"></gantt-text>
                                        <gantt-date v-if="fields[field].component === 'gantt-date'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" :minDate="item[fields[field].minDate]" @update="cellUpdated(fields[field].callback, item)"></gantt-date>
                                        <gantt-number v-if="fields[field].component === 'gantt-number'" class="table-cell" v-model="item[field]" :key="slug" :width="fields[field].width" :min="fields[field].min" :max="fields[field].max" :suffix="fields[field].suffix" @update="cellUpdated(fields[field].callback, item)"></gantt-number>
                                    </template>
                                </div>
                            </template>
                        </template> -->
                    </template>

                </div>

                <!-- Gantt graph section -->
                <gantt-graph :items="localItems" :dates="dates" :cell_width="cell_width" :graph_width="graph_width" :user="user" @date-updated="dateUpdated"></gantt-graph>

            </div>

            <!-- Gant content -->
            <!-- intended for adding new rows -->
            <div v-if="canEdit" class="gantt-content new">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">

                    <!-- Gantt table row -->
                    <div class="table-row">
                        <component class="table-cell" :width="field.width" :placeholder="field.placeholder" :user="user" :is="field.component" v-for="(field, slug) in fields" :key="slug"></component>
                    </div>

                </div>

                <!-- Gantt graph section -->
                <div class="gantt-graph" :style="{ width: graph_width + 'px' }">

                    <!-- Gantt table row -->
                    <div class="table-row">

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import Vue from 'vue'

import GanttText from './gantt-text'
import GanttDate from './gantt-date'
import GanttNumber from './gantt-number'
import GanttUser from './gantt-user'
import GanttMessage from './gantt-message'
import GanttGraph from './gantt-graph'

export default {
	name: 'Gantt',
	components: { GanttText, GanttDate, GanttNumber, GanttUser, GanttMessage, GanttGraph },
	props: {
		/**
		 * String that shows the gantt title
		 * @default ''
		 * @type {String}
		 */
		title: {
			type: String,
			default: ''
		},

		/**
		 * Array that lists all items of the gantt chart
		 * @default '[]'
		 * @type {Array}
		 */
		items: {
			type: Array,
			default: () => {
				return []
			}
		},

		/**
		 * Object that lists all header fields of the gantt chart
		 * @default '{}'
		 * @type {Object}
		 */
		fields: {
			type: Object,
			default: () => {
				return {
					start_date: {
						label: 'Start',
						component: 'gantt-date',
						width: 75,
						placeholder: 'Start',
						sort: 'date'
					},
					end_date: {
						label: 'End',
						component: 'gantt-date',
						width: 75,
						placeholder: 'End',
						sort: 'date'
					},
					duration: {
						label: 'Days',
						component: 'gantt-number',
						width: 50,
						placeholder: '0'
					}
				}
			}
		},

		/**
		 * Number to indicate the nesting levels of a task
		 * @default '2'
		 * @type {Number}
		 */
		levels: {
			type: Number,
			default: 2
		},

		/**
		 * String, Number to indicate the amount of dates shown in the chart
		 * @default '12'
		 * @type {String, Number}
		 */
		dateLimit: {
			type: [String, Number],
			default: 'auto'
		},

		/**
		 * String to define the start date of the Gantt chart
		 * @default 'today'
		 * @type {String}
		 */
		startDate: {
			type: String,
			default: () => {
				return Vue.moment()
					.subtract(2, 'd')
					.format('YYYY-MM-DD HH:mm:ss')
			}
		},

		/**
		 * String to define the start date of the Gantt chart
		 * @default 'today'
		 * @type {String}
		 */
		endDate: {
			type: String,
			default: () => {
				return Vue.moment()
					.add(5, 'd')
					.format('YYYY-MM-DD HH:mm:ss')
			}
		},

		/**
		 * Boolean to define if new rows can be added
		 * @default 'true'
		 * @type {Boolean}
		 */
		canEdit: {
			type: Boolean,
			default: true
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
	data() {
		return {
			gantt_width: 0,
			table_width: 0,
			graph_width: 0,
			cell_width: 0,
			longest_cell: { width: 0, slug: '' },
			dateFormat: 'YYYY-MM-DD HH:mm',
			localStartDate: this.startDate,
			localEndDate: this.endDate,
			localDateLimit: this.dateLimit,
			requiredFields: ['start_date', 'end_date', 'duration'],
			sortBy: false,
			message: {
				show: false,
				type: '',
				text: ''
			}
		}
	},
	mounted() {
		let self = this

		// Calculate the table by
		// sumizing the individual columns
		let fields = []
		Object.keys(this.fields).forEach(field_key => {
			let field_width = this.fields[field_key].width
			this.table_width += field_width
			fields.push(field_key)

			// Add mandatory calbacks
			if (field_key === 'start_date') this.fields[field_key].callback = 'startdateUpdated'
			if (field_key === 'end_date') this.fields[field_key].callback = 'enddateUpdated'
			if (field_key === 'end_date') this.fields[field_key].minDate = 'start_date'
			if (field_key === 'duration') this.fields[field_key].callback = 'durationUpdated'

			// Find longest table cell
			if (this.longest_cell.width < field_width) this.longest_cell = { width: field_width, slug: field_key }
		})

		// Check if all the required fields are provided
		// provided in the gantt props
		let valid_fields = this.requiredFields.every(field => fields.includes(field))
		if (!valid_fields) this.handleInvalidFields()

		// Set all the specific Gantt widths
		// Gantt, Graphs, Cells
		this.calculateWidths()
		window.onresize = function(event) {
			self.calculateWidths()
		}
	},
	methods: {
		/*
        | Calculates the odifferent widths
        | chart, cell, gantt
        */
		calculateWidths() {
			this.gantt_width = this.$refs.gantt.offsetWidth
			this.graph_width = this.gantt_width - this.table_width
			if (this.dateLimit !== 'auto') this.cell_width = this.graph_width / this.localDateLimit
			else this.calculateOptimalDateLimit()
		},

		/*
        | Calculates the optional date limit
        */
		calculateOptimalDateLimit() {
			let max_width = 50
			this.localDateLimit = Math.floor(this.graph_width / max_width)
			this.cell_width = this.graph_width / this.localDateLimit
		},

		/*
        | Set the start date 1 day earlier
        */
		prev() {
			this.localStartDate = this.$moment(this.localStartDate)
				.subtract(1, 'd')
				.format(this.dateFormat)
		},

		/*
        | Set the start date 1 day in the future
        */
		next() {
			this.localStartDate = this.$moment(this.localStartDate)
				.add(1, 'd')
				.format(this.dateFormat)
		},

		/*
        | Handle function when not all
        | required fields are provided
        */
		handleInvalidFields() {
			this.message.show = true
			this.message.type = 'missing_required_fields'
			this.message.text = ''
		},

		/*
        | Handle function when a
        | cell has been updated
        */
		cellUpdated(callback, cell) {
			if (callback) this[callback](cell)

			this.$emit('update', cell)
		},

		/*
        | start_date updated callback
        | When updating the start_date also update end date based on duration
        */
		startdateUpdated(cell) {
			if (!cell.ignoreCallback) cell.ignoreCallback = {}
			if (cell.ignoreCallback.start_date) {
				cell.ignoreCallback.start_date = false
				return
			}

			cell.end_date = this.$moment(cell.start_date, this.dateFormat)
				.add(cell.duration, 'd')
				.format(this.dateFormat)
		},

		/*
        | end_date updated callback
        */
		enddateUpdated(cell) {
			if (!cell.ignoreCallback) cell.ignoreCallback = {}
			if (cell.ignoreCallback.end_date) {
				cell.ignoreCallback.end_date = false
				return
			}

			let date_diff = this.$moment(cell.end_date, this.dateFormat).diff(this.$moment(cell.start_date, this.dateFormat), 'd')
			if (date_diff > 0) cell.duration = date_diff

			cell.ignoreCallback.duration = true
		},

		/*
        | duration updated callback
        */
		durationUpdated(cell) {
			if (!cell.ignoreCallback) cell.ignoreCallback = {}
			if (cell.ignoreCallback.duration) {
				cell.ignoreCallback.duration = false
				return
			}

			let end_date = this.$moment(cell.start_date, this.dateFormat).add(cell.duration - 1, 'd')
			cell.end_date = end_date.format(this.dateFormat)

			cell.ignoreCallback.end_date = true
		},

		/*
        | Handel when a new chart date has updated
        */
		dateUpdated(itemId, newDate) {
			let item = this.items.find(item => item.id === parseInt(itemId))
			item.start_date = newDate
		}
	},
	computed: {
		/*
        | Generate a list of dates seperated by
        | Day, based on the dateLimit
        */
		dates() {
			let dates = []
			for (let index = 0; index < this.localDateLimit; index++) {
				dates.push(
					this.$moment(this.localStartDate, this.dateFormat)
						.add(index, 'days')
						.format(this.dateFormat)
				)
			}

			return dates
		},

		/*
        | Generate a list of sorter 
        | items to show in teh gantt chart
        */
		localItems() {
			let items = this.items

			if (this.sortBy) {
				let self = this
				let sort_type = this.fields[this.sortBy].sort
				if (sort_type === 'date') {
					items.sort(function(a, b) {
						return new Date(a[self.sortBy]) - new Date(b[self.sortBy])
					})
				}
			}

			this.sortBy = false

			return items
		}
	},
	watch: {
		/*
        | Get the end_date based on the 
        | generated dates array.
        */
		dates: function() {
			this.localEndDate = this.dates[this.dates.length - 1]
		}
	}
}
</script>