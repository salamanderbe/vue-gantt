<template>
    <div id="app">
        <gantt :title="title" :fields="fields" :items="items" />
    </div>
</template>

<script>
import Gantt from './components/gantt.vue'

const demo1Items = require('./items-demo-1.json')
const demo2Items = require('./items-demo-2.json')

export default {
	name: 'app',
	components: {
		Gantt
	},
	data() {
		return {
			title: '<p><strong>Salamander</strong> Gantt chart</p>',
			fields: {
				summary: {
					label: 'Summary',
					component: 'gantt-text',
					width: 300,
					placeholder: 'Add a new task...'
				},
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
				},
				progress: {
					label: '%',
					component: 'gantt-number',
					width: 50,
					placeholder: '0',
					min: 0,
					max: 100,
					suffix: '%'
				}
			},
			items: demo1Items
		}
	}
}
</script>
