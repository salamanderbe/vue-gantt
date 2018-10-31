<style lang="scss" scoped>
$font-size: 14px;
$spacing: 15px;
$markerColor: #f4435a;
$cellHeight: 30px;
$markerHeight: 15px;

// Gantt tobar
.gantt-topbar {
	display: flex;

	.gantt-actions {
		margin: auto 0 auto auto;

		.flatpickr-input {
            padding: 6.5px;
            margin-left: 10px;
		}
	}
}
// Gantt chart
.gantt-chart {
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	font-size: $font-size;

	// Header section
	// Gantt header
	.gantt-header {
		display: flex;
		height: 40px;
		border-bottom: 1px solid #f4f4f4;

		// Gantt table section
		.gantt-table {
			height: 100%;
		}

		// Gantt chart section
		.gantt-graph {
			height: 100%;

			.table-cell {
				text-align: center;
			}
		}

		// Table cell
		.table-cell {
			line-height: 40px;
			padding: 0 15px;
		}
	}

	// Content section
	// Gantt content
	.gantt-content {
		display: flex;

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
		}

		.table-row {
			display: flex;
			height: $cellHeight;
			line-height: $cellHeight;
			width: 100%;

			.table-cell {
				height: 100%;
				flex: none;

				.marker {
					height: $markerHeight;
					width: 100%;
					background: $markerColor;
					border-radius: 15px;
					margin-top: ($cellHeight - $markerHeight) / 2;
					cursor: pointer;
					&:hover {
						background: rgba($markerColor, 0.8);
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
                <flat-pickr ref="input" v-model="localStartDate"></flat-pickr>
                <flat-pickr ref="input" v-model="localEndDate"></flat-pickr>
            </div>
        </div>

        <!-- Gant Chart -->
        <div class="gantt-chart" ref="gantt">

            <!-- Gant Header -->
            <div class="gantt-header">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">
                    <div class="table-cell" :style="{ width: field.width + 'px' }" v-for="(field, slug) in fields" :key="slug">{{ field.label }}</div>
                </div>

                <!-- Gantt graph section -->
                <div class="gantt-graph" :style="{ width: graph_width + 'px' }">
                    <div class="table-cell" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
                        {{ date | moment('D MMM') }}
                    </div>
                </div>

            </div>

            <!-- Gant content -->
            <div class="gantt-content">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">

                    <!-- Gantt table row -->
                    <template v-for="(item, key) in items">
                        <div class="table-row" :key="key">
                            <component v-if="fields.hasOwnProperty(field)" class="table-cell" :width="fields[field].width" :is="fields[field].component" v-model="item[field]" v-for="(field, slug) in Object.keys(item)" :key="slug"></component>
                        </div>
                    </template>

                </div>

                <!-- Gantt graph section -->
                <div class="gantt-graph" :style="{ width: graph_width + 'px' }">

                    <!-- Gantt marker row -->
                    <template v-for="(item, key) in items">
                        <div class="table-row" :key="key">
                            <div class="table-cell" :style="{ width: cell_width + 'px' }" v-for="(date, key) in dates" :key="key">
                                <div class="marker" v-if="compareDate(date, item.start_date)"></div>
                            </div>
                        </div>
                    </template>

                </div>

            </div>

            <!-- Gant content -->
            <!-- intended for adding new rows -->
            <div v-if="canEdit" class="gantt-content new">

                <!-- Gantt table section -->
                <div class="gantt-table" :style="{ width: table_width + 'px' }">

                    <!-- Gantt table row -->
                    <div class="table-row">
                        <component class="table-cell" :width="field.width" :placeholder="field.placeholder" :is="field.component" v-for="(field, slug) in fields" :key="slug"></component>
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

export default {
	name: 'Gantt',
	components: { GanttText, GanttDate },
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
					summary: {
						label: 'Summary',
						component: 'gantt-text',
						width: 300,
						placeholder: 'Add a new task...'
					},
					start_date: {
						label: 'Start date',
						component: 'gantt-date',
						width: 95,
						placeholder: 'Start'
					},
					end_date: {
						label: 'End date',
						component: 'gantt-date',
						width: 95,
						placeholder: 'End'
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
		 * Number to indicate the amount of dates shown in the chart
		 * @default '12'
		 * @type {Number}
		 */
		dateLimit: {
			type: Number,
			default: 12
		},

		/**
		 * String to define the start date of the Gantt chart
		 * @default 'today'
		 * @type {String}
		 */
		startDate: {
			type: String,
			default: () => {
				return Vue.moment().format('YYYY-MM-DD HH:mm:ss')
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
					.add(7, 'd')
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
		}
	},
	data() {
		return {
			gantt_width: 0,
			table_width: 0,
			graph_width: 0,
			cell_width: 0,
			dateFormat: 'YYYY-MM-DD HH:mm:ss',
			localStartDate: this.startDate,
			localEndDate: this.endDate
		}
	},
	mounted() {
		console.log('Mount triggered')
		// Calculate the table by
		// sumizing the individual columns
		Object.keys(this.fields).forEach(field_key => {
			this.table_width += this.fields[field_key].width
		})

		this.gantt_width = this.$refs.gantt.offsetWidth
		this.graph_width = this.gantt_width - this.table_width
		this.cell_width = this.graph_width / this.dateLimit
	},
	updated() {
		console.log('update triggered')
	},
	methods: {
		compareDate(date, match_date) {
			return this.$moment(date).format('Y-M-D') === this.$moment(match_date).format('Y-M-D')
		}
	},
	computed: {
		/*
        | Generate a list of dates seperated by
        | Day, based on the dateLimit
        */
		dates() {
			console.log('dates updated')
			let dates = []
			for (let index = 0; index < this.dateLimit; index++) {
				dates.push(
					this.$moment(this.localStartDate, this.dateFormat)
						.add(index, 'days')
						.format(this.dateFormat)
				)
			}

			return dates
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