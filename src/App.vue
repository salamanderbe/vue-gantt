<template>
    <div id="app">
        <gantt :title="title" :items="items" />
    </div>
</template>

<script>
import Gantt from './components/gantt.vue'

export default {
	name: 'app',
	components: {
		Gantt
	},
	data() {
		return {
			title: '<p><strong>Salamander</strong> Gantt chart</p>',
			items: [
				{ id: 1, summary: 'This is a task.', start_date: '2018-11-02 00:00', end_date: '2018-11-03 00:00', duration: 1 },
				{ id: 2, summary: 'This is a task with a longer description.', start_date: '2018-11-03 00:00', end_date: '2018-11-04 00:00', duration: 1 },
				{ id: 3, summary: 'You should first complete the first task.', start_date: '2018-11-04 00:00', end_date: '2018-01-11 00:00', duration: 7 },
				{ id: 4, summary: 'And then, you should complete the second task.', start_date: '2018-11-07 00:00', end_date: '2018-11-09 00:00', duration: 9 },
				{ id: 5, summary: 'Do not start with the last task.', start_date: '2018-11-09 00:00', end_date: '2018-11-15 00:00', duration: 6 },
				{ id: 6, summary: 'It will make your project manager mad.', start_date: '2018-11-15 00:00', end_date: '2018-11-17 00:00', duration: 2 },
				{ id: 7, summary: 'Very very very... mad.', start_date: '2018-11-17 00:00', end_date: '2018-11-19 00:00', duration: 2 },
				{ id: 8, summary: 'But you only code once ;).', start_date: '2018-11-19 00:00', end_date: '2018-11-21 00:00', duration: 2 }
			]
		}
	}
}
</script>
