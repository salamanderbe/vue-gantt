<style lang="scss">
// Base
$font-size: 14px;
$spacing: 15px;
$cellHeight: 28px;
$markerHeight: 16px;

// Colors
$markerColor: #f4435a;
$textColor: #464957;
$parentItemColor: #1d313a;
$childItemColor: $textColor;

// Fonts
$parentItemFontSize: 13px;
$childItemFontSize: 12px;

/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function lighten($color, $percentage) {
	@return mix(white, $color, $percentage);
}

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function darken($color, $percentage) {
	@return mix(black, $color, $percentage);
}

/*
| ------------------
| GANTT TOBAR
| -------------------
| Contains information about the gantt chart such as
| the title and the date fields that are shown
*/
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

/*
| ------------------
| GANTT CHART
| -------------------
| Contains the styling of the actual gantt chart
| Gant charts will consist of a header a body and a footer
*/
.gantt-chart {
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	font-size: $font-size;
	position: relative;
	color: $textColor;

	/*
    | ------------------
    | GANTT HEADER
    | -------------------
    | Contains the styling of the generated
    | header fields of the Gantt chart
    */
	.gantt-header {
		display: flex;
		height: 40px;
		border-bottom: 1px solid #f4f4f4;

		// Gantt table section
		.table-section {
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: $font-size;
			width: 50%;
			background: #fff;
			z-index: 0;

		}

		// Gantt chart section
		.graph-section {
			height: 100%;
			display: flex;

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
			&.hidden-date {
				content: '';
			}
		}
	}

	/*
    | ------------------
    | GANTT BODY
    | -------------------
    | Contains the styling of the generated
    | body of the Gantt chart.
    | This will be devided in rows and each row can have cells.
    */
	.gantt-body {
		display: flex;
		flex-wrap: wrap;
		position: relative;

		.gantt-row {
			display: flex;

			.table-section {
				display: flex;
				height: $cellHeight;
				line-height: $cellHeight;
				width: 100%;

				.toggle {
					display: flex;
					cursor: pointer;
					&:hover {
						background: #f4f4f4;
					}
					.open,
					.close {
						border-left: 1px solid $textColor;
						border-bottom: 1px solid $textColor;
						width: 5px;
						height: 5px;
						margin: auto;
					}
					.open {
						transform: rotate(-45deg);
					}
					.close {
						transform: rotate(135deg);
					}
				}

				.table-group {
					display: flex;
				}

				.table-cell {
					&:hover {
						background: #f4f4f4;
					}
				}
			}

			.graph-section {
				background: #f4f4f4;
				overflow: hidden;
				.graph-row {
					display: flex;
					position: relative;
					height: 100%;
				}
			}

			&.parent {
				.table-cell {
					input {
						font-size: $parentItemFontSize;
						color: $parentItemColor;
						font-weight: 700;
					}
				}
			}

			&.child {
				.table-group {
					display: flex;
					position: relative;
					&:before {
						content: '';
						height: $cellHeight / 2;
						position: absolute;
						width: 1px;
						background: rgba($childItemColor, 0.3);
						left: 12px;
						top: $cellHeight / 4;
					}
				}
			}

			.table-cell {
				height: 100%;
				flex: none;
				transition: background 0.3s;
				display: flex;
				&.weekend {
					background: #e8e8e8;
				}
				&.toggler {
					width: 20px;
				}
				&.disabled {
					pointer-events: none;
					background: #f4f4f4;
				}
				&.flash {
					background: rgba($markerColor, 0.1);
				}
				input {
					font-size: $childItemFontSize;
					color: $childItemColor;
					&.cell.number {
						padding-right: 0;
					}
				}
			}

			.marker {
				width: 100%;
				cursor: pointer;
				position: absolute;

				&.parent {
					height: $markerHeight / 3;
					margin-top: ($cellHeight - ($markerHeight / 3)) / 1.5;
					background: darken($markerColor, 40%);
					border-radius: 15px;
					&:after,
					&:before {
						transform-origin: bottom;
						position: absolute;
						content: '';
						bottom: 0;
					}
					&:after {
						left: -2px;
						transform: rotate(-50deg);
						border-color: transparent transparent darken($markerColor, 40%) transparent;
						border-style: solid;
						border-width: 0px 5px 5px 5px;
						height: 0px;
						width: 0px;
					}
					&:before {
						right: -2px;
						transform: rotate(50deg);
						border-color: transparent transparent darken($markerColor, 40%) transparent;
						border-style: solid;
						border-width: 0px 5px 5px 5px;
						height: 0px;
						width: 0px;
					}
				}
				&:not(.parent) {
					height: $markerHeight;
					background: $markerColor;
					border-radius: 15px;
					margin-top: ($cellHeight - $markerHeight) / 2;
					.marker-progress {
						background: lighten($markerColor, 20%);
					}

					&:hover {
						background: lighten($markerColor, 10%);
					}
				}

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
					border-radius: 15px 0 0 15px;
					position: absolute;
					left: 0;
					top: 0;

					&.completed {
						border-radius: 15px;
					}
				}

				&.selected {
					pointer-events: none;
				}
			}
		}

        /*
        | ------------------
        | GANTT GRAPH PANEL
        | -------------------
        | Contains the graph content
        | This is a scrollable panel of all charts
        */
        .gantt-graph-panel{
            background: #f4f4f4;
            position: relative;
            .gantt-row{
                height: $cellHeight;
            }
        }
	}

	.gantt-graph,
	.graph-row {
		justify-content: flex-end;
		.table-cell {
			flex: none;
		}
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
                <div class="table-section" :style="{ width: widths.table + 'px' }">
                    <div class="table-cell" :class="{ sortable : !!field.sort }" :style="{ width: field.width + 'px' }" v-for="(field, slug) in localFields" :key="slug" @click="sortBy = slug">{{ field.label }}</div>
                </div>

                <!-- Gantt graph section -->
                <div class="graph-section" :style="{ width: widths.graph + 'px' }">
                    <div class="table-cell" :class="{ 'hidden-date' : !date.shown }" :style="{ width: widths.cell + 'px' }" v-for="(date, key) in dates" :key="key">
												<span class="day">{{ $filters.moment(date.date, 'D')  }}</span>
                        <span class="month">{{ $filters.moment(date.date, 'MMM') }}</span>
                    </div>
                </div>

            </div>

            <!-- Gant body -->
            <div class="gantt-body">

								<div v-for="(item, key) in localSortedItems" :key="item.id">
									<!-- Gantt table row -->
									<div class="gantt-row" :class="{ parent: item.isParent, child: item.isChild }" v-if="!item.isChild || (item.isChild && openItems.includes(item.parentId))" :key="key">
											
											<!-- Table section: start -->
											<div class="table-section" :key="item.id" :style="{ width: widths.table + 'px'}">

													<template v-if="localFields.toggle">
															<div v-if="item.isParent" class="toggle" :style="{ width: localFields.toggle.width + 'px' }" @click="openItems.includes(item.id) ? openItems.splice(openItems.indexOf(item.id), 1) : openItems.push(item.id)">
																	<span :class=" { open: openItems.includes(item.id), close: !openItems.includes(item.id) }"></span>
															</div>
															<div v-else :style="{ width: localFields.toggle.width + 'px' }"></div>
													</template>

													<div class="table-group" >
															<template v-for="(field, slug) in Object.keys(item)" >
																	<div v-if="localFields.hasOwnProperty(field)" v-bind:key="field">
																			<gantt-user v-if="localFields[field].component === 'gantt-user'" class="table-cell" v-model="item[field]" :style="{ 'padding-left': (field === longest_cell.slug && item.isChild) ? indent + 'px' : ''  }" :key="slug" :width="localFields[field].width" :user="user" :editable="!item.isParent"></gantt-user>
																			<gantt-text v-if="localFields[field].component === 'gantt-text'" class="table-cell" v-model="item[field]" :style="{ 'padding-left': (field === longest_cell.slug && item.isChild) ? indent + 'px' : ''  }" :key="slug" :width="localFields[field].width" @update="cellUpdated(localFields[field].callback, item)"></gantt-text>
																			<gantt-date v-if="localFields[field].component === 'gantt-date'" class="table-cell" v-model="item[field]" :style="{ 'padding-left': (field === longest_cell.slug && item.isChild) ? indent + 'px' : ''  }" :key="slug" :width="localFields[field].width" :minDate="item[localFields[field].minDate]" @update="cellUpdated(localFields[field].callback, item)" :editable="!item.isParent"></gantt-date>
																			<gantt-number v-if="localFields[field].component === 'gantt-number'" class="table-cell" v-model="item[field]" :style="{ 'padding-left': (field === longest_cell.slug && item.isChild) ? indent + 'px' : ''  }" :key="slug" :width="localFields[field].width" :min="localFields[field].min" :max="localFields[field].max" :suffix="localFields[field].suffix" @update="cellUpdated(localFields[field].callback, item)" :editable="!item.isParent"></gantt-number>
																	</div>
															</template>
													</div>

											</div>
											<!-- Table section: end -->

											<!-- Graph section:start -->
											<div class="graph-section" :style="{ width: widths.graph + 'px' }">
													<gantt-graph :item="item" :dates="dates" :cell_width="widths.cell" :user="user" :open="!item.isParent || openItems.includes(item.id)" @date-updated="dateUpdated" @open="openItems.push(item.id)"></gantt-graph>
											</div>
											<!-- Graph section:end -->

									</div>
                </div>

            </div>

            <!-- Gantt body: start -->
            <div v-if="false" class="gantt-body" style="margin-top: 50px;">
                <div class="gantt-table" :style="{ width: widths.table + 'px' }"></div>
                <div class="gantt-graph-panel" :style="{ width: widths.graph + 'px' }">
                    <div class="gantt-row" v-for="(item, key) in localSortedItems" :key="key">
                        <div class="marker" :class="{ parent : item.isParent }" :style="{ width: (widths.cell * item.duration) + 'px', left: computedOffset(item) }"></div>
                    </div>
                </div>
            </div>
            <!-- Gantt body: end -->

        </div>
    </div>
</template>

<script>
import GanttText from './gantt-text'
import GanttDate from './gantt-date'
import GanttNumber from './gantt-number'
import GanttUser from './gantt-user'
import GanttMessage from './gantt-message'
import GanttGraph from './gantt-graph'
import moment from 'moment'

export default {
	name: 'GanttComponent',
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
						width: 70,
						placeholder: 'Start',
						sort: 'date'
					},
					end_date: {
						label: 'End',
						component: 'gantt-date',
						width: 70,
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
		 * String to indicate the key of nested items
		 * @default '2'
		 * @type {String}
		 */
		levelKey: {
			type: String,
			default: 'items'
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
				return moment()
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
				return moment()
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
			widths: {
				gantt: 0,
				table: 0,
				graphh: 0,
				cell: 0
			},
			indent: 20,
			longest_cell: { width: 0, slug: '' },
			dateFormat: 'YYYY-MM-DD HH:mm',
			localFirstDate: '',
			localItems: this.compileItems(this.items),
			localFields: this.fields,
			localStartDate: this.startDate,
			localEndDate: this.endDate,
			localDateLimit: this.dateLimit,
			requiredFields: ['start_date', 'end_date', 'duration'],
			sortBy: false,
			message: {
				show: false,
				type: '',
				text: ''
			},
			openItems: []
		}
	},
	mounted() {
		let self = this

		this.localFields = { toggle: { label: '', width: 20 }, ...this.fields }

		// Calculate the table by
		// sumizing the individual columns
		let fields = []
		Object.keys(this.localFields).forEach(field_key => {
			let field_width = this.localFields[field_key].width
			this.widths.table += field_width
			fields.push(field_key)

			// Add mandatory calbacks
			if (field_key === 'start_date') this.localFields[field_key].callback = 'startdateUpdated'
			if (field_key === 'end_date') this.localFields[field_key].callback = 'enddateUpdated'
			if (field_key === 'end_date') this.localFields[field_key].minDate = 'start_date'
			if (field_key === 'duration') this.localFields[field_key].callback = 'durationUpdated'

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

		// Init draggable markers
		this.$nextTick().then(() => {
			self.initDragable()
		})
	},
	methods: {
		/*
        | Compile the list of items
        | This will flatten the multidimentional array
        | to a more feasable array.
        */
		compileItems(items) {
			console.log('compile local items')
			let result = []
			let earliest_date = new Date()
			// Loop over all the given items
			items.forEach(item => {
				// Check if the item has a key
				// that indicitats if it has children
				// eslint-disable-next-line
				let has_level = item.hasOwnProperty(this.levelKey)
				earliest_date = new Date(item.start_date) < new Date(earliest_date) ? item.start_date : earliest_date

				// If we have children
				// Mark the item as a parent item
				if (has_level && item[this.levelKey].length > 0) {
					item.isParent = true
					let k = result.push(item)
					let children = item[this.levelKey].forEach(child => {
						child.isChild = true
						child.isParent = false
						child.parentId = item.id
						result.push(child)
					})
					delete result[k][this.levelKey]
				} else {
					item.isParent = false
					result.push(item)
				}
			})

			window.localFirstDate = earliest_date

			return result
		},

		/*
        | Calculates the odifferent widths
        | chart, cell, gantt
        */
		calculateWidths() {
			this.widths.gantt = this.$refs.gantt.offsetWidth
			this.widths.graph = this.widths.gantt - this.widths.table
			if (this.dateLimit !== 'auto') this.widths.cell = this.widths.graph / this.localDateLimit
			else this.calculateOptimalDateLimit()
		},

		/*
        | Calculates the optional date limit
        */
		calculateOptimalDateLimit() {
			this.localDateLimit = Math.floor(this.widths.graph / 50)
			this.widths.cell = this.widths.graph / this.localDateLimit
		},

		/*
        | Set the start date 1 day earlier
        */
		prev() {
			this.localStartDate = moment(this.localStartDate)
				.subtract(1, 'd')
				.format(this.dateFormat)
		},

		/*
        | Set the start date 1 day in the future
        */
		next() {
			this.localStartDate = moment(this.localStartDate)
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

			cell.end_date = moment(cell.start_date, this.dateFormat)
				.add(cell.duration, 'd')
				.format(this.dateFormat)

			if (cell.isChild && !cell.recursive) {
				// Get the parent item of the child
				let parent_item = this.localItems.find(item => item.id === parseInt(cell.parentId))
				// Get all the parents children
				let children = this.localItems.filter(item => item.parentId === parseInt(cell.parentId))
				let start_date = children[0].start_date
				let end_date = children[0].end_date

				// Calculate first and last date
				children.forEach(child => {
					start_date = new Date(child.start_date) < new Date(start_date) ? child.start_date : start_date
					end_date = new Date(child.end_date) > new Date(end_date) ? child.end_date : end_date
				})
				let duration = moment(end_date, this.dateFormat).diff(moment(start_date, this.dateFormat), 'd')

				// Ignore the default callback
				// We want to set the properties bottom up
				// not top down
				if (!parent_item.ignoreCallback) parent_item.ignoreCallback = {}
				parent_item.ignoreCallback.start_date = true
				parent_item.ignoreCallback.end_date = true
				parent_item.ignoreCallback.duration = true

				// Set the properties
				parent_item.start_date = start_date
				parent_item.end_date = end_date
				parent_item.duration = duration
			}
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

			let date_diff = moment(cell.end_date, this.dateFormat).diff(moment(cell.start_date, this.dateFormat), 'd')
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
			console.log('-- callback: duration updated')

			let end_date = moment(cell.start_date, this.dateFormat).add(cell.duration - 1, 'd')
			cell.end_date = end_date.format(this.dateFormat)

			if (cell.isChild) {
				console.log('child is updated')
				// Get the parent item of the child
				let parent_item = this.localItems.find(item => item.id === parseInt(cell.parentId))
				// Get all the parents children
				let children = this.localItems.filter(item => item.parentId === parseInt(cell.parentId))
				let start_date = cell.start_date
				let end_date = cell.end_date

				// Calculate first and last date
				children.forEach(child => {
					start_date = new Date(child.start_date) < new Date(start_date) ? child.start_date : start_date
					end_date = new Date(child.end_date) > new Date(end_date) ? child.end_date : end_date
				})
				let duration = moment(end_date, this.dateFormat).diff(moment(start_date, this.dateFormat), 'd') + 1

				if (!parent_item.ignoreCallback) parent_item.ignoreCallback = {}
				parent_item.ignoreCallback.end_date = true

				// Set the properties
				parent_item.duration = duration
				parent_item.end_date = end_date
			}

			cell.ignoreCallback.end_date = true
		},

		/*
        | Handle when a new chart date has updated
        */
		dateUpdated(itemId, newDate) {
			let item = this.localItems.find(item => item.id === parseInt(itemId))
			item.start_date = newDate
		},

		/*
        | Handle when a marker is dragged
        */
		initDragable() {
			let graph = document.querySelector('.graph-section')
			let cell_limit = this.dates.length

			// Handle mouse up event on
			// a marker element
			document.documentElement.onmouseup = e => {
				e.preventDefault()
				if (!window.markers || window.markers.length === 0) return false

				window.markers.forEach(marker => {
					let drop_date = this.dates[marker.lastCell - 1].date
					let row_id = marker.dataset.rowId
					let item = this.localItems.find(item => item.id === parseInt(row_id))
					item.recursive = marker.recursive

					marker.classList.remove('selected')
					if (item) item.start_date = drop_date
				})
				window.markers = []
			}

			// Handle mouse move event on
			// a marker element
			let match_cell = 0
			let chart_offset = graph.offsetLeft
			document.documentElement.onmousemove = e => {
				e.preventDefault()
				if (!window.markers || window.markers.length === 0) return false

				window.markers.forEach(marker => {
					let l = +window.getComputedStyle(marker)['left'].slice(0, -2) || 0

					for (let i = 1; i < cell_limit + 1; i++) {
						if (Math.floor((i * this.widths.cell) / (e.clientX + marker.offset - chart_offset)) !== 0) {
							match_cell = i
							break
						}
					}

					if (marker.lastCell !== match_cell) {
						marker.style.left = (match_cell - 1) * this.widths.cell + 'px'
						marker.lastCell = match_cell
					}
				})
			}
        },
        
        computedOffset(item){

            let offset = moment(this.localStartDate, this.dateFormat).diff(moment(item.start_date, this.dateFormat), 'd')
            let width = (offset * this.widths.cell)

            return width - (width * 2) + 'px'
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
				dates.push({
					shown: true,
					date: moment(this.localStartDate, this.dateFormat)
						.add(index, 'days')
						.format(this.dateFormat)
				})
			}

			return dates
		},

		/*
        | Generate a list of sorted
        | items to show in teh gantt chart
        */
		localSortedItems() {
			let items = this.localItems

			if (this.sortBy) {
				let self = this
				let sort_type = this.localFields[this.sortBy].sort
				if (sort_type === 'date') {
					items.sort(function(a, b) {
						return new Date(a[self.sortBy]) - new Date(b[self.sortBy])
					})
				}
			}

			// eslint-disable-next-line
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
			this.localEndDate = this.dates[this.dates.length - 1].date
		}
	}
}
</script>
