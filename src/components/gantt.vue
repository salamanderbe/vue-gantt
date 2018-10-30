<style lang="scss" scoped>
$font-size: 14px;
$spacing: 15px;

// Gantt chart
.gantt-chart {
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	font-size: $font-size;

	// Header section
	// Gantt header
	.gantt-header {
		height: 40px;
		border-bottom: 1px solid #f4f4f4;

		// Gantt table section
		.gantt-table {
			height: 100%;

			.table-cell {
				line-height: 40px;
				padding: 0 15px;
			}
		}

		// Gantt chart section
		.gantt-graph {
			content: '';
		}
	}

	// Content section
	// Gantt content
	.gantt-content {
		display: flex;

		// Gantt table section
		.gantt-table {
			flex: none;

			.table-row {
				display: flex;
				height: 25px;
				line-height: 25px;
				width: 100%;

				.table-cell {
                    height: 100%;
                    flex: none;
                    transition: background .1s;
					&:hover {
						background: #f4f4f4;
					}
				}
			}
		}

		// Gantt chart section
		.gantt-graph {
			background: #f4f4f4;
			width: 100%;
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
}
</style>

<template>
    <!-- Gant Chart -->
    <div class="gantt-chart">

        <!-- Gant Header -->
        <div class="gantt-header">

            <!-- Gantt table section -->
            <div class="gantt-table" :style="{ width: table_width + 'px' }">
                <div class="table-cell" :style="{ width: field.width + 'px' }" v-for="(field, slug) in fields" :key="slug">{{ field.label }}</div>
            </div>

            <!-- Gantt graph section -->
            <div class="gantt-graph">

            </div>

        </div>

        <!-- Gant content -->
        <div class="gantt-content">

            <!-- Gantt table section -->
            <div class="gantt-table" :style="{ width: table_width + 'px' }">

                <!-- Gantt table row -->
                <div class="table-row" v-for="(item, key) in items" :key="key">
                    <component v-if="fields.hasOwnProperty(field)" class="table-cell" :width="fields[field].width" :is="fields[field].component" v-model="item[field]" v-for="field in Object.keys(item)"></component>
                </div>

            </div>

            <!-- Gantt graph section -->
            <div class="gantt-graph">

            </div>

        </div>

    </div>
</template>

<script>

import GanttText from './gantt-text'
import GanttDate from './gantt-date'

export default {
	name: 'Gantt',
	components: { GanttText, GanttDate },
	props: {
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
						width: 300
					},
					start_date: {
						label: 'Start date',
						component: 'gantt-date',
						width: 95
					},
					end_date: {
						label: 'End date',
						component: 'gantt-date',
						width: 95
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
		}
	},
	data() {
		return {
			table_width: 0
		}
	},
	mounted() {
		// Calculate the table width
		Object.keys(this.fields).forEach(field_key => {
			this.table_width += this.fields[field_key].width
		})
	}
}
</script>