<template>
    <div id="app">
        <gantt :title="title" :fields="fields" :items="items"  />
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
			items: [
                { id: 1, user: { id: 1, src: './default-1.png' }, summary: 'This is a task.', start_date: '2018-11-02 00:00', end_date: '2018-11-03 00:00', duration: 2, progress: 50, 
                    items: [
						{ id: 9, user: { id: 1, src: './default-1.png' }, summary: 'This is a subtask.', start_date: '2018-11-02 00:00', end_date: '2018-11-02 00:00', duration: 1, progress: 100 },
						{ id: 10, user: { id: 1, src: './default-1.png' }, summary: 'A subtask falls under a parent task.', start_date: '2018-11-03 00:00', end_date: '2018-11-03 00:00', duration: 1, progress: 0 }
					]
				},
				{ id: 2, user: { id: 1, src: './default-1.png' }, summary: 'This is a task with a longer description.', start_date: '2018-11-03 00:00', end_date: '2018-11-04 00:00', duration: 2, progress: 20 },
				{ id: 3, user: { id: 1, src: './default-1.png' }, summary: 'You should first complete the first task.', start_date: '2018-11-04 00:00', end_date: '2018-11-12 00:00', duration: 8, progress: 10 },
				{ id: 4, user: { id: 2, src: './default-2.png' }, summary: 'And then, you should complete the second task.', start_date: '2018-11-07 00:00', end_date: '2018-11-10 00:00', duration: 3, progress: 0 },
				{ id: 5, user: { id: 2, src: './default-2.png' }, summary: 'Do not start with the last task.', start_date: '2018-11-09 00:00', end_date: '2018-11-15 00:00', duration: 7, progress: 0 },
				{ id: 6, user: { id: 1, src: './default-1.png' }, summary: 'It will make your project manager mad.', start_date: '2018-11-15 00:00', end_date: '2018-11-17 00:00', duration: 3, progress: 0 },
				{ id: 7, user: { id: 3, src: './default-3.png' }, summary: 'Very very... mad.', start_date: '2018-11-17 00:00', end_date: '2018-11-19 00:00', duration: 3, progress: 0 },
				{ id: 8, user: { id: 1, src: './default-1.png' }, summary: 'Do not make your project manager mad.', start_date: '2018-11-19 00:00', end_date: '2018-11-21 00:00', duration: 3, progress: 0 }
			]
		}
	}
}
</script>
